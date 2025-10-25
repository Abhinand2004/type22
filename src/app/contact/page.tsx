"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Sparkles,
  Zap,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Notification handler
  const showNotification = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Form submit
  const handleSend = async () => {
    if (!email || !message)
      return showNotification("Please fill in both fields!", "error");

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showNotification("Message sent successfully!", "success");
      setEmail("");
      setMessage("");
    } catch {
      showNotification("Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/", color: "text-pink-500" },
    { icon: Facebook, href: "https://facebook.com/", color: "text-blue-500" },
    { icon: Youtube, href: "https://youtube.com/", color: "text-red-500" },
    { icon: MessageCircle, href: "https://wa.me/918590521956", color: "text-green-500" },
  ];

  return (
    <motion.section
      id="contact"
      className="min-h-screen w-full bg-black text-white relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed w-72 h-72 rounded-full blur-3xl opacity-30"
        animate={{
          x: mousePos.x - 144,
          y: mousePos.y - 144,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl backdrop-blur-md border ${
            notification.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "bg-red-500/20 border-red-500/50 text-red-400"
          } font-medium shadow-lg`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <Sparkles className="w-5 h-5" />
            ) : (
              <Zap className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl w-full px-4 lg:px-8 py-12 gap-10">
        {/* Left: Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false }}
            className="text-3xl lg:text-4xl font-bold tracking-tight"
          >
            <span className="block text-white">Let&apos;s Create</span>
            <span className="block text-cyan-400">Something Amazing</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: false }}
            className="text-gray-400 text-base lg:text-lg max-w-md"
          >
            Transform your ideas into reality. Drop us a message and let&apos;s start
            building the future together.
          </motion.p>

          <div className="space-y-4">
            <motion.input
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: false }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full rounded-xl bg-white/5 backdrop-blur-md px-5 py-3 text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-400/50"
            />
            <motion.textarea
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: false }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full rounded-xl bg-white/5 backdrop-blur-md px-5 py-3 h-32 text-white placeholder-gray-500 focus:outline-none border border-white/10 focus:border-cyan-400/50 resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={loading}
              className="w-full py-3 font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-transform disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Image + Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full lg:w-1/2 flex flex-col items-center space-y-8"
        >
          <motion.img
            src="/images/premium.png"
            alt="Contact"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            viewport={{ once: false }}
            className="w-72 lg:w-[36rem] object-contain drop-shadow-[0_25px_60px_rgba(0,200,255,0.4)]"
            onError={(e) => (e.target.style.display = "none")}
          />

          <motion.div
            className="flex gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 },
              },
            }}
          >
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-white ${s.color}`}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 120 },
                    },
                  }}
                  whileHover={{ scale: 1.4, rotate: 12 }}
                  animate={{
                    x: [0, 4, 0, -3, 0],
                    y: [0, -12, 0, 8, 0],
                    rotate: [0, 8, 0, -6, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.1 + i * 0.15,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  style={{ willChange: "transform" }}
                >
                  <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
