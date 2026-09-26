import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepika S — AI / ML Engineer | Data Scientist | Developer",
  description: "Portfolio of Deepika S — AI/ML engineer, data scientist and web developer building intelligent systems and digital experiences.",
  openGraph: {
    title: "Deepika S — AI / ML Engineer",
    description: "Building intelligence from model to interface.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
