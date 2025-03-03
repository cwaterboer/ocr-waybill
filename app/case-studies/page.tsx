import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Image from "next/image"

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mb-8 text-center text-4xl font-bold">Case Studies</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Discover how businesses have transformed their operations with OCR Waybill.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CaseStudyCard
              title="Global Logistics Co."
              description="Reduced processing time by 75% and improved accuracy to 99.9%"
              image="/placeholder.svg?height=400&width=600"
            />
            <CaseStudyCard
              title="E-commerce Giant"
              description="Streamlined returns process, saving $2M annually"
              image="/placeholder.svg?height=400&width=600"
            />
            <CaseStudyCard
              title="Freight Forwarder Inc."
              description="Automated customs documentation, cutting processing time in half"
              image="/placeholder.svg?height=400&width=600"
            />
          </div>
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">More success stories coming soon!</p>
            <Button>
              Contact Sales for More Information
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function CaseStudyCard({ title, description, image }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <Button variant="link" className="mt-4 p-0">
          Read Full Case Study
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

