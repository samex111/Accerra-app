import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accerra",
  description: "A platfrom that understands student to think cleary and learn faster",
};
export default function RootLayout( { children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,500;1,600;1,700&family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-geist: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            --font-cormorant: 'Cormorant Garamond', Georgia, serif;
          }
          
          body {
            font-family: var(--font-geist);
          }
          
          .font-geist {
            font-family: var(--font-geist);
          }
          
          .font-cormorant-garamond {
            font-family: var(--font-cormorant);
          }
        `}</style>
      </head>
      <body className="font-geist antialiased bg-[#060810] text-white">
        {children}
      </body>
    </html>
  );
}