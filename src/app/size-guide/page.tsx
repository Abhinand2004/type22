import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SizeGuidePage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <h1 className="heading-display text-3xl">Size Guide</h1>

        <p className="text-zinc-600 dark:text-zinc-400">
          Find your perfect fit. Use the measurements below as a general guide — 
          our T-shirts and hoodies are designed for comfort and style. 
          If you prefer a relaxed look, go one size up.
        </p>

        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Chest (inches)</th>
                <th className="px-4 py-3 font-semibold">Length (inches)</th>
                <th className="px-4 py-3 font-semibold">Shoulder (inches)</th>
                <th className="px-4 py-3 font-semibold">Sleeve (inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="px-4 py-3 font-medium">S</td>
                <td className="px-4 py-3">36–38</td>
                <td className="px-4 py-3">26</td>
                <td className="px-4 py-3">16.5</td>
                <td className="px-4 py-3">8</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">M</td>
                <td className="px-4 py-3">38–40</td>
                <td className="px-4 py-3">27</td>
                <td className="px-4 py-3">17.5</td>
                <td className="px-4 py-3">8.5</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">L</td>
                <td className="px-4 py-3">40–42</td>
                <td className="px-4 py-3">28</td>
                <td className="px-4 py-3">18.5</td>
                <td className="px-4 py-3">9</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XL</td>
                <td className="px-4 py-3">42–44</td>
                <td className="px-4 py-3">29</td>
                <td className="px-4 py-3">19.5</td>
                <td className="px-4 py-3">9.5</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XXL</td>
                <td className="px-4 py-3">44–46</td>
                <td className="px-4 py-3">30</td>
                <td className="px-4 py-3">20.5</td>
                <td className="px-4 py-3">10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
          <p>📏 <strong>Chest:</strong> Measure around the fullest part of your chest under your arms.</p>
          <p>📏 <strong>Length:</strong> Measure from the highest point on the shoulder to the hem.</p>
          <p>📏 <strong>Shoulder:</strong> Measure from shoulder tip to shoulder tip across your back.</p>
          <p>📏 <strong>Sleeve:</strong> Measure from shoulder seam to end of sleeve.</p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            💡 <strong>Note:</strong> All measurements are approximate and may vary slightly due to manual cutting and stitching.
            If you’re between sizes, we recommend choosing the larger size for a more comfortable fit.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}



