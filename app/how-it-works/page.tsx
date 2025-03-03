import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Download } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Image from "next/image"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mb-8 text-center text-4xl font-bold">How It Works</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Learn how OCR Waybill transforms your document processing workflow in just a few simple steps.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              icon={Upload}
              title="1. Upload Your Document"
              description="Simply drag and drop your waybills or use our mobile app to snap a photo."
            />
            <StepCard
              icon={FileText}
              title="2. AI Extracts Data"
              description="Our advanced OCR technology scans and extracts relevant information automatically."
            />
            <StepCard
              icon={Download}
              title="3. Download & Automate"
              description="Retrieve your processed data or integrate it directly into your existing systems."
            />
          </div>
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold">See It in Action</h2>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-card shadow-lg">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="OCR Waybill Demo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <Button variant="outline" size="lg" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function StepCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  )
}

