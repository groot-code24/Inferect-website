import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WaitlistExperience } from "@/components/waitlist/waitlist-experience";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Join the Inferect waitlist as a startup owner, investor, or developer and get a tailored onboarding track.",
};

export default function WaitlistPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={null}>
          <WaitlistExperience />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
