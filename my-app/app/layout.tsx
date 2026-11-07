import "./globals.css";
import type { Metadata } from "next";
import Pwa from "@/components/Pwa";

export const metadata: Metadata = { title: "RideShare AAB" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="sq"><body><Pwa />{children}</body></html>;
}
