"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function FAQPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <h1 className="heading-display text-3xl">Frequently Asked Questions (FAQ)</h1>

        <Reveal>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Do you ship internationally?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Currently, we do <strong>not</strong> provide international shipping. Our services are available only within India.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.05}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">What products do you offer?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              We currently offer <strong>T-shirts</strong>, <strong>oversized T-shirts</strong>, and <strong>hoodies</strong>.  
              All our products are made with premium-quality fabrics and automotive-inspired designs.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.1}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Do you provide customized designs?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Yes! We specialize in <strong>customized automotive-themed apparel</strong>.  
              You can choose from our available designs or request your own custom design.  
              We even provide professional designers to help bring your ideas to life.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.15}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">What sizes do you offer?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              We offer a range of sizes — <strong>S, M, L, XL, XXL</strong>.  
              Refer to our Size Guide before placing an order to ensure the perfect fit.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.2}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Can I request other types of customization?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Yes, we allow various customization options — from design changes to fit and color preferences.  
              Feel free to contact us for special requests.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.25}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Can I bargain or request discounts on T-shirts?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              No, bargaining is not allowed.  
              We focus on providing <strong>high-quality products at fair prices</strong> that reflect the craftsmanship and material quality.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.3}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">Do you accept returns?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Yes, returns are available for defective or incorrect items.  
              Please review our <strong>Return Policy</strong> for complete details.
            </div>
          </details>
        </Reveal>

        <Reveal delay={0.35}>
          <details className="rounded-lg border p-4">
            <summary className="font-medium">What makes your brand special?</summary>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              We’re a brand built for <strong>automotive enthusiasts</strong> who love expressing their passion through fashion.  
              Every design we create reflects the spirit of cars, speed, and style — combining creativity with comfort.
            </div>
          </details>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}



