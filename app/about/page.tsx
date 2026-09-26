import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Deepika S — AI / ML Engineer",
  description: "Learn about Deepika S, an AI/ML engineer, data scientist and creative developer building intelligent digital experiences.",
};

export default function Page() {
  return <AboutPage />;
}
