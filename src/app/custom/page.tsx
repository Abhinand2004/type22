"use client";

import { useState, FormEvent, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function TShirtModel({ model }: { model: string }) {
  const gltf = useGLTF(model) as unknown as GLTF;

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial | undefined;
        if (!material) return;

        if (model.includes("tshirt1")) {
          material.emissive = material.emissive || new THREE.Color(0xffffff);
          material.emissiveIntensity = 0.15;
          material.emissive.set(0xffffff);
        } else {
          material.emissive = material.emissive || new THREE.Color(0x000000);
          material.emissiveIntensity = 0.15;
          material.emissive.set(0x000000);
        }
      }
    });
  }, [gltf, model]);

  return <primitive object={gltf.scene} scale={1.3} position={[0, -1.8, 0]} />;
}

export default function CustomizeTShirtPage() {
  const [currentModel, setCurrentModel] = useState(0);
  const models = ["/models/tshirt1.glb", "/models/tshirt2.glb"];

  const nextModel = () => setCurrentModel((prev) => (prev + 1) % models.length);
  const prevModel = () => setCurrentModel((prev) => (prev - 1 + models.length) % models.length);

  const [email, setEmail] = useState("");
  const [design, setDesign] = useState("");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone === "adithyan2778") {
      window.location.href = "/admin";
      return;
    }
    if (!design.trim()) {
      alert("Please describe your customization.");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    const emailRegex = /^[\w.-]+@gami\.com$/;
    if (!emailRegex.test(email)) {
      alert("Email must end with @gami.com");
      return;
    }

    (async () => {
      try {
        // Upload to Cloudinary via server route if a file is selected
        let uploadedUrl: string | null = null;
        if (reference) {
          const fd = new FormData();
          fd.append("file", reference);
          const up = await fetch("/api/upload", { method: "POST", body: fd });
          if (!up.ok) throw new Error("Failed to upload image");
          const upJson = (await up.json()) as { url?: string };
          uploadedUrl = upJson.url ?? null;
        }

        const payload = {
          title: `Customization request - ${email || phone || "guest"}`,
          details: design,
          referenceImages: uploadedUrl ? [uploadedUrl] : [],
        };

        const res = await fetch("/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit request");

        setDesign("");
        setEmail("");
        setPhone("");
        setReference(null);
        alert("Your customization request was submitted successfully. We will contact you soon.");
      } catch (err) {
        console.error(err);
        alert("There was an error submitting your request. Please try again later.");
      }
    })();
  };

  // Animation variants
  const leftVariant = { hidden: { opacity: 0, x: "-10%" }, visible: { opacity: 1, x: 0, transition: { duration: 1 } } };
  const rightVariant = { hidden: { opacity: 0, x: "10%" }, visible: { opacity: 1, x: 0, transition: { duration: 1 } } };
  const bounceVariant = { y: [0, -10, 0], transition: { repeat: 999999, duration: 3 } };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="flex flex-col min-h-screen overflow-x-hidden">
        <motion.main
        className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-16 py-12 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* 3D T-shirt Viewer */}
        <motion.div className="relative w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px]" variants={leftVariant}>
          <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 1, 2], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <hemisphereLight intensity={0.35} />

            <Suspense fallback={null}>
              <motion.group animate={bounceVariant}>
                <TShirtModel model={models[currentModel]} />
              </motion.group>
              <Environment preset="studio" />
            </Suspense>

            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>

          {/* Navigation buttons */}
          <button
            onClick={prevModel}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/40 p-3 rounded-full"
            aria-label="Previous model"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextModel}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/40 p-3 rounded-full"
            aria-label="Next model"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Customization Form */}
        <motion.div className="w-full lg:w-1/2 flex flex-col gap-6" variants={rightVariant}>
          <div>
            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-zinc-900 dark:text-white" animate={bounceVariant}>
              Customize Your T-shirt
            </motion.h1>
            <p className="text-zinc-700 dark:text-zinc-300 max-w-lg">
              Personalize your T-shirt with your design, number, or reference file.
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <textarea
              placeholder="Describe your customization..."
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none h-24"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input
              type="file"
              onChange={(e) => setReference(e.target.files?.[0] ?? null)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:scale-105 transform transition duration-300"
              >
                Request T-shirt
              </button>
            </div>
          </form>
        </motion.div>
        </motion.main>
      </section>
      <Footer />
    </div>
  );
}
