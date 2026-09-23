import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ComingSoonBanner } from "@/shared/components/ui/coming-soon-banner";
import { AccountLoginForm } from "./account-login-form";

export const metadata: Metadata = {
  title: "Login / Sign Up",
  description: "Sign in or create an RRA account with Google or your Gmail address.",
};

export default function AccountLoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Account"
        title="Login / Sign Up"
        description="Sign in with Google, or use your email to get a one-time code — no password needed."
      />
      <PageContent>
        <div className="mx-auto max-w-md">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <ComingSoonBanner feature="Account login" />
              <Suspense>
                <AccountLoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </>
  );
}
