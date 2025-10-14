"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [notificationType, setNotificationType] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const showNotification = (msg: string, type: string) => {
    setNotification(msg);
    setNotificationType(type);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSend = async () => {
    if (!email || !message) {
      showNotification("Please fill in both fields!", "error");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual EmailJS implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification("Message sent successfully!", "success");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      showNotification("Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium`} style={{ background: notificationType === 'success' ? 'var(--accent)' : 'rgba(220,38,38,0.9)' }}>
          {notification}
        </div>
      )}

      {/* Theme toggle is provided in the Navbar - remove duplicate here */}

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <div 
            className={`space-y-6 md:space-y-8 order-2 md:order-1 ${
              isVisible ? 'animate-fadeInRight' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--accent)' }}>
                Let&apos;s Connect
              </h1>
              <p className="text-base md:text-lg" style={{ color: 'var(--muted)' }}>
                Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/918590521956"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-all px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 animate-pulse-ring"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                <MessageCircle className="w-4 h-4" /> <span className="text-white">WhatsApp</span>
              </a>
              <a
                href="mailto:abhinandc293@gmail.com"
                className="inline-flex items-center gap-2 transition-all px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105"
                style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--muted)' }}
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all"
                  placeholder="you@example.com"
                  style={{ background: 'var(--muted)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.04)' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg px-4 py-3 focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                  style={{ background: 'var(--muted)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.04)' }}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                {loading ? "Sending..." : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          <div 
            className={`order-1 md:order-2 space-y-6 ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/contactimg.png"
                alt="Contact us"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }} />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Follow us on social media
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full text-white hover:scale-110 transition-transform shadow-lg animate-float"
                  style={{ animationDelay: '0s', background: 'var(--muted)', color: 'var(--text)' }}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full text-white hover:scale-110 transition-transform shadow-lg animate-float"
                  style={{ animationDelay: '0.5s', background: 'var(--muted)', color: 'var(--text)' }}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full text-white hover:scale-110 transition-transform shadow-lg animate-float"
                  style={{ animationDelay: '1s', background: 'var(--muted)', color: 'var(--text)' }}
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/918590521956"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full text-white hover:scale-110 transition-transform shadow-lg animate-float animate-pulse-ring"
                  style={{ animationDelay: '1.5s', background: 'var(--muted)', color: 'var(--text)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}