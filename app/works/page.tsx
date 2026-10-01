import type { Metadata } from "next";
import WorksPage from "@/components/WorksPage";

export const metadata: Metadata = {
  title: "Works — Deepika S",
  description: "A collection of Deepika S's AI, machine learning, data, web, and e-commerce work.",
};

export default function Page() {
  return <WorksPage />;
}
