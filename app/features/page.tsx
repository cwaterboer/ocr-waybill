import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, PenTool, Cloud, Lock, Smartphone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mb-8 text-center text-4xl font-bold">Our Features</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Discover the powerful features that make OCR Waybill the leading solution for automated document processing.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={FileText}
              title="AI-Powered OCR"
              description="Our advanced AI algorithms extract data from waybills with industry-leading accuracy, saving you time and reducing errors."
            />
            <FeatureCard
              icon={CheckCircle}
              title="Automated Form Filling"
              description="Say goodbye to manual data entry. Our system automatically populates digital forms with extracted information."
            />
            <FeatureCard
              icon={PenTool}
              title="E-Signature Support"
              description="Streamline your workflow with built-in electronic signature capabilities for legally binding documents."
            />
            <FeatureCard
              icon={Cloud}
              title="Cloud Storage"
              description="Access your documents from anywhere, anytime. Our secure cloud storage ensures your data is always available."
            />
            <FeatureCard
              icon={Lock}
              title="Enterprise-Grade Security"
              description="Rest easy knowing your sensitive information is protected by state-of-the-art encryption and security measures."
            />
            <FeatureCard
              icon={Smartphone}
              title="Cross-Platform Compatibility"
              description="Use OCR Waybill on any device with our web app and mobile applications for iOS and Android."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

