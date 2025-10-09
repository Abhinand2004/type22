"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export default function Featured() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const videos = [
    { src: "/tshirtvidios/vidio1.mp4", span: "col-span-2 row-span-2", title: "Premium Cotton Collection" },
    { src: "/tshirtvidios/vidio2.mp4", span: "col-span-1 row-span-1", title: "Minimalist Design" },
    { src: "/tshirtvidios/vidio10.mp4", span: "col-span-1 row-span-1", title: "Limited Edition" },
    { src: "/tshirtvidios/vidio3.mp4", span: "col-span-1 row-span-2", title: "Street Style Series" },
  
    { src: "/tshirtvidios/vidio5.mp4", span: "col-span-1 row-span-1", title: "Classic Fit" },
    { src: "/tshirtvidios/vidio6.mp4", span: "col-span-2 row-span-2", title: "Designer Collection" },
    { src: "/tshirtvidios/vidio7.mp4", span: "col-span-1 row-span-1", title: "Urban Essential" },
    { src: "/tshirtvidios/vidio8.mp4", span: "col-span-1 row-span-1", title: "Vintage Inspired" },
    { src: "/tshirtvidios/vidio9.mp4", span: "col-span-2 row-span-1", title: "Athletic Performance" },
  ];

  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-20 scroll-mt-24">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated selection of premium t-shirt designs
          </p>
        </motion.div>
      </div>

      {/* Masonry Grid with Varied Sizes */}
      <div
        className="
          grid 
          grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
          auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[250px] 
          gap-6
        "
      >
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden group ${video.span}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            style={{ borderRadius: "16px" }}
          >
            {/* Video Element */}
            <video
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Professional Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              {/* Title and Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                <h3 className="text-white font-semibold text-sm md:text-base mb-1 drop-shadow-lg">
                  {video.title}
                </h3>
                <p className="text-white/80 text-xs">
                  View Collection
                </p>
              </motion.div>

              {/* Number Badge */}
              <div className="absolute top-3 left-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.7 }}
                  viewport={{ once: false }}
                  animate={{ 
                    scale: hoveredIndex === index ? 1.1 : 1,
                    opacity: hoveredIndex === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/10 backdrop-blur-md border border-border/20 rounded-full w-9 h-9 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xs">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </motion.div>
              </div>

              {/* Play Icon */}
              <div className="absolute top-3 right-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: hoveredIndex === index ? 1 : 0,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/20 backdrop-blur-md border border-border/30 rounded-full w-9 h-9 flex items-center justify-center"
                >
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Border Accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 origin-left"
            ></motion.div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
          View All Collections
        </button>
      </motion.div>
    </section>
  );
}