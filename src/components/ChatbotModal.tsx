"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, X, Sparkles } from "lucide-react";
import Image from "next/image";

interface Product {
  _id?: string;
  title: string;
  price: number;
  description?: string;
  material?: string;
  sizes?: string[];
  colors?: string[];
  sizeChart?: string;
  discount?: number;
  images?: string[];
  image?: string; // fallback if API provides single image
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  products?: Product[];
}

interface Message {
  role: "user" | "bot";
  text?: string;
  type?: "text" | "product";
  product?: Product;
}

const ChatbotModal = ({ isOpen, onClose, apiKey, products = [] }: ChatbotModalProps) => {
  // Format products data for AI
  const productsInfo = products.length > 0 
    ? products.map(p => {
        const productDetails = [
          `- ${p.title}`,
          `  Price: ₹${p.price}`,
          p.discount ? `  Discount: ${p.discount}% OFF` : '',
          p.description ? `  Description: ${p.description}` : '',
          p.material ? `  Material: ${p.material}` : '',
          p.sizes?.length ? `  Sizes: ${p.sizes.join(', ')}` : '',
          p.colors?.length ? `  Colors: ${p.colors.join(', ')}` : '',
          p.sizeChart ? `  Size Chart: ${p.sizeChart}` : '',
        ].filter(Boolean).join('\n');
        return productDetails;
      }).join('\n\n')
    : 'No products currently available in the database.';

  const systemPrompt = `You are Dudu, a friendly AI assistant for Type22 - an automotive t-shirt brand. You're enthusiastic about cars and fashion!

IMPORTANT INFORMATION ABOUT TYPE22:
- Brand: Type22 is an automotive/car enthusiast t-shirt brand
- Founder: Adithyan C from Shornur, Palakkad, Kerala
- Specialty: Customized oversized t-shirts for car enthusiasts
- Products: Mainly t-shirts, also hoodies, and other custom products
- Unique Feature: Custom designs - customers can request customization
- Designer: Own in-house designer for custom prints
- Pricing: Starts from ₹499 (only mention if design is approved by customer)
- Sales Channels: Instagram (@type22.in) and WhatsApp (8590521956)
- Location: Based in Kerala, India

AVAILABLE PRODUCTS IN STORE:
${productsInfo}

YOUR PERSONALITY:
- Friendly, enthusiastic, and passionate about cars
- Keep responses short and conversational (2-4 sentences)
- Use casual language and occasional car/automotive references
- Always promote Instagram and WhatsApp for orders

RULES:
1. Only answer questions about: casual topics, Type22 brand, automotive culture, t-shirts, fashion, and OUR PRODUCTS
2. When asked about products, provide accurate details from the product list above
3. If asked about a specific product, share its price, sizes, colors, material, and description
4. For product inquiries and orders, encourage them to contact via Instagram (@type22.in) or WhatsApp (8590521956)
5. For custom designs, mention they can request anything car-related
6. If asked about topics outside your scope, politely redirect to Type22 topics
7. Keep responses under 75 words unless listing product details
8. Never make up product information - only use the data provided above
9. If asked about a product that doesn't exist in our list, say we don't have it currently but can create custom designs

Remember: You're here to help customers learn about Type22 products and guide them to order through Instagram or WhatsApp!`;

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      text: "Hey there! 👋 I'm Dudu, your Type22 AI assistant. Looking for some sick automotive tees? Ask me anything about our custom oversized t-shirts for car enthusiasts! 🚗💨" 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const userMsg: Message = { role: "user", text: userMessage, type: "text" };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {

      // Try to detect a mentioned product by title
      const findMatchedProduct = (q: string) => {
        const ql = q.toLowerCase();
        // Prefer exact includes matches; choose the longest matching title
        const matches = products
          .map((p) => ({
            product: p,
            score: p.title ? (ql.includes(p.title.toLowerCase()) ? p.title.length : 0) : 0,
          }))
          .filter((m) => m.score > 0)
          .sort((a, b) => b.score - a.score);
        if (matches.length) return matches[0].product;
        // Fallback: check any token of q of length >=3 is contained in title
        const tokens = ql.split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
        const fuzzy = products
          .map((p) => {
            const title = (p.title || "").toLowerCase();
            const hits = tokens.reduce((acc, t) => (title.includes(t) ? acc + 1 : acc), 0);
            return { product: p, score: hits };
          })
          .filter((m) => m.score > 0)
          .sort((a, b) => b.score - a.score);
        return fuzzy.length ? fuzzy[0].product : undefined;
      };

      const matchedProduct = findMatchedProduct(userMessage);

      const conversationHistory = newMessages
        .slice(-6)
        .map(msg => `${msg.role === "user" ? "User" : "Dudu"}: ${msg.text}`)
        .join("\n");

      const prompt = `${systemPrompt}\n\nConversation:\n${conversationHistory}\n\nRespond as Dudu (keep it short and friendly):`;

      const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 150,
            },
          }),
        }
      );

      const data = await response.json();
      const botMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Oops! Something went wrong. Try asking me about Type22's awesome tees! 🏎️";

      setTimeout(() => {
        const botMsg: Message = { role: "bot", text: botMessage, type: "text" };
        const withBot: Message[] = [...newMessages, botMsg];
        if (matchedProduct) {
          const productMsg: Message = { role: "bot", type: "product", product: matchedProduct };
          setMessages([...withBot, productMsg]);
        } else {
          setMessages(withBot);
        }
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { 
          role: "bot", 
          text: "⚠️ Connection issue! But hey, you can always reach us on Instagram @type22.in or WhatsApp at 8590521956! 🚗" 
        },
      ]);
      setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-3xl shadow-2xl w-full max-w-lg flex flex-col border border-blue-500/30 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-5 border-b border-blue-500/20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3 
                  }}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Dudu</h2>
                  <p className="text-xs text-blue-200">Type22 Assistant</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-32 h-32 bg-blue-500/20 rounded-full -top-10 -right-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-24 h-24 bg-blue-400/20 rounded-full -bottom-10 -left-10"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="p-4 h-[450px] overflow-y-auto space-y-4 bg-gradient-to-b from-black via-gray-900 to-black"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#3B82F6 #000000"
            }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50 flex-shrink-0"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                    >
                      <span className="text-lg">🚗</span>
                    </motion.div>
                  )}
                  {msg.type !== "product" ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-2xl shadow-lg max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-br-sm shadow-blue-500/30"
                          : "bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 text-white rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </motion.div>
                  ) : msg.type === "product" && msg.product ? (
                    <div className="max-w-[80%]">
                      <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
                        {(() => {
                          const imgSrc = msg.product?.images?.[0] || msg.product?.image;
                          return imgSrc ? (
                          <div className="w-full">
                            <Image
                              src={imgSrc}
                              alt={msg.product.title}
                              width={480}
                              height={480}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ) : null;
                        })()}
                        <div className="p-3">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="text-sm font-semibold truncate">{msg.product?.title}</h4>
                            <span className="text-blue-300 text-sm font-bold">₹{msg.product?.price}</span>
                          </div>
                          {msg.product?.description && (
                            <p className="text-xs text-blue-200/80 mt-1 line-clamp-2">{msg.product.description}</p>
                          )}
                          <div className="mt-3 flex items-center gap-2">
                            <a
                              href={`https://wa.me/918590521956?text=${encodeURIComponent(
                                `I'm interested in ${msg.product?.title} (Type22).`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 text-xs bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold"
                            >
                              Buy on WhatsApp
                            </a>
                            <a
                              href={`https://wa.me/918590521956?text=${encodeURIComponent(
                                `Can I customize ${msg.product?.title}?`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 text-xs bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg"
                            >
                              Ask Customization
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/20 flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <span className="text-lg">🚗</span>
                </div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 rounded-2xl rounded-bl-sm p-4 px-5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-blue-500/20 bg-gradient-to-b from-gray-900 to-black backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSend()}
                  className="w-full border-2 border-blue-500/40 rounded-2xl p-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-white placeholder-gray-400 transition-all"
                  placeholder="Ask about Type22 tees..."
                  disabled={loading}
                />
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-blue-400/60" />
                </motion.div>
              </div>
              <motion.button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-5 rounded-2xl hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SendHorizonal className="w-5 h-5" />
              </motion.button>
            </div>
            {/* Quick Actions */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {["Show Products", "Custom Design?", "Pricing?"].map((action) => (
                <motion.button
                  key={action}
                  onClick={() => setInput(action)}
                  className="px-3 py-1.5 text-xs bg-gray-800 border border-blue-500/40 text-blue-300 rounded-full hover:bg-gray-700 hover:border-blue-400 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotModal;