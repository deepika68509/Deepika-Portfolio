import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog — Deepika S",
  description: "A quiet space for Deepika's notes on AI, machine learning, development, design, and what she is discovering along the way.",
};

export default function Page() {
  return <BlogPage />;
}
