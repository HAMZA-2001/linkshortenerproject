import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignUpButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  Globe,
  MousePointerClick,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Link2,
    title: "Instant URL Shortening",
    description:
      "Transform long, unwieldy URLs into clean, shareable short links in one click. Perfect for social media, emails, and more.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track how many times each link is clicked. Gain insights into your audience and the performance of your shared links.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "All your links are tied to your account. Only you can manage and delete your links — no one else can interfere.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds. Built on a modern, serverless infrastructure that scales automatically.",
  },
  {
    icon: Globe,
    title: "Custom Short Codes",
    description:
      "Choose memorable, branded short codes for your links instead of random characters — make them yours.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Copy",
    description:
      "Copy your shortened URL to the clipboard instantly. Share it anywhere without missing a beat.",
  },
];

const steps = [
  {
    step: "1",
    title: "Sign Up for Free",
    description: "Create your account in seconds using your email or social login. No credit card required.",
  },
  {
    step: "2",
    title: "Paste Your Long URL",
    description: "Enter any long URL into the dashboard and click \"Shorten\". We'll generate a compact link instantly.",
  },
  {
    step: "3",
    title: "Share & Track",
    description: "Copy your short link and share it anywhere. Watch click analytics roll in from your dashboard.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center md:py-36">
        <div className="mx-auto max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Link2 className="size-3.5" />
            Simple · Fast · Reliable
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Shorten Links.{" "}
            <span className="text-primary/80">Amplify Reach.</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-8 text-muted-foreground">
            Turn long, messy URLs into clean, shareable short links. Track
            every click, manage all your links, and grow your audience — all
            in one place.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started for Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              A powerful set of features to manage and share your links
              effortlessly.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Up and running in under a minute.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join and start shortening links for free today. No setup required.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg">Create Your Free Account</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button size="lg" asChild>
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Link2 className="size-4" />
            Link Shortener
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Link Shortener. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
