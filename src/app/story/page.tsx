"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Story from "@/components/Story";

export default function StoryPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Story />
      </main>
      <Footer />
    </div>
  );
}

// Story content is provided by the component at src/components/Story.tsx
