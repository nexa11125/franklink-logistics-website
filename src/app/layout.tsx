import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frank Link Logistics | Freight Forwarding & Customs Clearance, Mumbai",
  description:
    "Mumbai-based freight forwarding, customs clearance, air & sea freight, warehousing, and door-to-door cargo solutions. Licensed CHA with 15+ years of experience.",
  keywords: [
    "Frank Link Logistics",
    "frank link logistics",
    "freight forwarding Mumbai",
    "customs clearance Mumbai",
    "air freight India",
    "sea freight India",
    "warehousing Mumbai",
    "cargo solutions India",
    "CHA Mumbai",
    "logistics company Mumbai",
    "import export Mumbai",
    "door to door cargo",
  ],
  metadataBase: new URL("https://frank-link-logistics-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Frank Link Logistics | Freight Forwarding & Customs Clearance",
    description:
      "Mumbai-based freight forwarding, customs clearance, air & sea freight, warehousing, and door-to-door cargo solutions.",
    url: "https://frank-link-logistics-website.vercel.app",
    siteName: "Frank Link Logistics",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Link Logistics | Freight Forwarding & Customs Clearance",
    description:
      "Mumbai-based freight forwarding, customs clearance, air & sea freight, warehousing, and door-to-door cargo solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>FL</text></svg>",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}