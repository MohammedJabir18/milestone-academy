import { Suspense } from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { LenisProvider } from "@/providers/LenisProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </LenisProvider>
  );
}
