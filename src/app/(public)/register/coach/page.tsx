import type { Metadata } from "next";
import { Award } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CoachRegistrationForm } from "./coach-registration-form";

export const metadata: Metadata = {
  title: "Coach Registration",
  description:
    "Register as a certified racquetball coach with the Rajasthan Racquetball Association and access training programs.",
};

export default function CoachRegistrationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Registration"
        title="Coach Registration"
        description="Join RRA's network of certified coaches and contribute to racquetball development across Rajasthan."
      />
      <PageContent>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Coach Registration Form</CardTitle>
              </CardHeader>
              <CardContent>
                <CoachRegistrationForm />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Certification Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><strong className="text-primary">Level 1</strong> — Beginner coaching fundamentals</li>
                <li><strong className="text-primary">Level 2</strong> — Intermediate technique and tactics</li>
                <li><strong className="text-primary">Level 3</strong> — Advanced competitive coaching</li>
                <li><strong className="text-primary">International</strong> — IRF-recognised certification</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </>
  );
}
