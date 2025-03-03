import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Truck, ShoppingBag, Ship, Warehouse } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Image from "next/image"

export default function UseCasesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mb-8 text-center text-4xl font-bold">Use Cases</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Discover how OCR Waybill can transform operations across various industries.
          </p>
          <Tabs defaultValue="logistics" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="freight">Freight & Transportation</TabsTrigger>
              <TabsTrigger value="warehouse">Warehouse Management</TabsTrigger>
            </TabsList>
            <TabsContent value="logistics">
              <UseCaseContent
                title="Logistics Companies"
                description="Streamline your logistics operations with automated waybill processing and tracking."
                benefits={[
                  "Reduce processing time by up to 80%",
                  "Minimize data entry errors",
                  "Improve customer satisfaction with faster processing",
                ]}
                image="/placeholder.svg?height=400&width=600"
                icon={Truck}
              />
            </TabsContent>
            <TabsContent value="ecommerce">
              <UseCaseContent
                title="E-commerce Businesses"
                description="Optimize your order processing and returns management with our OCR solution."
                benefits={[
                  "Accelerate order fulfillment",
                  "Simplify returns processing",
                  "Enhance inventory management",
                ]}
                image="/placeholder.svg?height=400&width=600"
                icon={ShoppingBag}
              />
            </TabsContent>
            <TabsContent value="freight">
              <UseCaseContent
                title="Freight & Transportation"
                description="Digitize and streamline your freight documentation and tracking processes."
                benefits={[
                  "Automate bills of lading processing",
                  "Streamline customs documentation",
                  "Improve shipment tracking accuracy",
                ]}
                image="/placeholder.svg?height=400&width=600"
                icon={Ship}
              />
            </TabsContent>
            <TabsContent value="warehouse">
              <UseCaseContent
                title="Warehouse Management"
                description="Enhance your warehouse operations with digital record-keeping and inventory management."
                benefits={[
                  "Automate receiving processes",
                  "Real-time inventory updates",
                  "Simplify audit trails and compliance",
                ]}
                image="/placeholder.svg?height=400&width=600"
                icon={Warehouse}
              />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function UseCaseContent({ title, description, benefits, image, icon: Icon }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <Icon className="h-6 w-6 text-primary" />
          {title}
        </h2>
        <p className="mb-6 text-muted-foreground">{description}</p>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <Button className="mt-6">Learn More</Button>
      </div>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={`${title} use case`} fill className="object-cover" />
      </div>
    </div>
  )
}

