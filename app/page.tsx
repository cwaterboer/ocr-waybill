import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Cloud, FileText, Lock, Smartphone, Upload, Truck, Users } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-32 pb-24 text-center md:pt-40 md:pb-32">
          <div className="animate-fade-in">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Automate Your Waybill Processing with AI-Powered OCR!
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl text-muted-foreground md:text-2xl">
              Extract data, fill forms, and digitize logistics workflows effortlessly.
            </p>
            <Button size="lg" className="h-12 px-8 text-lg" asChild>
              <Link href="/auth">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-4xl overflow-hidden rounded-lg border bg-card shadow-lg">
            <div className="relative aspect-video w-full">
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
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="OCR Waybill Processing Demo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Overview Section - New */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Say Goodbye to Paper Waybills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  What We Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Instantly generate, sign, and share waybills online. Our AI-powered OCR technology extracts data from
                  existing documents and converts them into digital format.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Who It's For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Perfect for solo couriers, small logistics teams, e-commerce businesses, and warehouse managers
                  looking to streamline their document processing.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Why Choose Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Reduce errors, save time, and cut costs with our easy-to-use platform. No more lost paperwork or
                  manual data entry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section id="how-it-works" className="container mx-auto max-w-6xl px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">1. Input Your Data</h3>
            <p className="text-muted-foreground">
              Upload existing waybills or create new ones with our simple form. Our AI extracts all relevant information
              automatically.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                className="h-8 w-8"
              >
                <path d="M12 2a8 8 0 0 1 8 8v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a8 8 0 0 1 8-8z" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">2. Sign & Verify</h3>
            <p className="text-muted-foreground">
              Collect digital signatures from drivers and recipients directly on your device. All signatures are legally
              binding.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                className="h-8 w-8"
              >
                <path d="M12 15V3" />
                <path d="m8 7 4-4 4 4" />
                <path d="M20 21H4" />
                <path d="M15 21v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">3. Download & Share</h3>
            <p className="text-muted-foreground">
              Generate professional PDF waybills instantly. Share them via email or integrate with your existing
              systems.
            </p>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-lg border bg-card shadow-lg">
          <div className="relative aspect-video w-full">
            <Image src="/placeholder.svg?height=720&width=1280" alt="How It Works Demo" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="container mx-auto max-w-6xl px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Powerful Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                AI-Powered OCR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Extracts data from waybills in seconds with industry-leading accuracy.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Automated Form Filling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Converts scanned data into structured digital fields automatically.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                  className="h-5 w-5 text-primary"
                >
                  <path d="M12 22v-5" />
                  <path d="M9 8V2" />
                  <path d="M15 8V2" />
                  <path d="M12 8v8" />
                  <path d="M19 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                E-Signature Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sign documents digitally with legally binding electronic signatures.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Cross-Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Web app + mobile apps for both Android and iOS devices.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Secure & Scalable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Enterprise-grade security and cloud storage integration.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Cloud Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Seamlessly store and access your documents from anywhere.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-muted/50 py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Industry Solutions</h2>

          <Tabs defaultValue="logistics" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="freight">Freight & Transportation</TabsTrigger>
              <TabsTrigger value="warehouse">Warehouse Management</TabsTrigger>
            </TabsList>

            <TabsContent value="logistics" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Logistics Companies</h3>
                  <p className="mb-4 text-muted-foreground">
                    Automate waybill processing and tracking to streamline operations and reduce manual data entry.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Reduce processing time by up to 80%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Minimize data entry errors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Improve customer satisfaction</span>
                    </li>
                  </ul>
                  <Button className="mt-6">Learn More</Button>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Logistics use case"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ecommerce" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">E-commerce Businesses</h3>
                  <p className="mb-4 text-muted-foreground">
                    Streamline order processing and returns with automated document handling.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Faster order fulfillment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Simplified returns processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Better inventory management</span>
                    </li>
                  </ul>
                  <Button className="mt-6">Learn More</Button>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="E-commerce use case"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="freight" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Freight & Transportation</h3>
                  <p className="mb-4 text-muted-foreground">
                    Reduce paperwork and errors in freight documentation and tracking.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Digitize bills of lading</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Streamline customs documentation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Improve tracking accuracy</span>
                    </li>
                  </ul>
                  <Button className="mt-6">Learn More</Button>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Freight use case"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="warehouse" className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Warehouse Management</h3>
                  <p className="mb-4 text-muted-foreground">
                    Digital record-keeping for shipments and inventory management.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Automated receiving processes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Real-time inventory updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Simplified audit trails</span>
                    </li>
                  </ul>
                  <Button className="mt-6">Learn More</Button>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Warehouse use case"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Mobile App Section */}
      <section id="mobile" className="bg-gradient-to-b from-background to-primary/5 py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Process Waybills On The Go</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our mobile app brings the power of AI-powered OCR to your smartphone. Scan, process, and manage waybills
                from anywhere, anytime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="h-14 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.5234 12.0371C17.5088 9.45234 19.7568 8.06445 19.8516 8.00391C18.6855 6.3457 16.9434 6.12891 16.3066 6.11719C14.8301 5.95898 13.4062 6.98438 12.6562 6.98438C11.8945 6.98438 10.7461 6.12891 9.50977 6.15234C7.91016 6.17578 6.42188 7.08984 5.60156 8.54297C3.91406 11.502 5.19141 15.8438 6.81445 18.3809C7.62891 19.6289 8.58984 21.0352 9.85547 20.9883C11.0859 20.9414 11.5664 20.1914 13.0547 20.1914C14.5312 20.1914 14.9766 20.9883 16.2598 20.9648C17.584 20.9414 18.4043 19.6992 19.1953 18.4395C20.1328 17.0098 20.5078 15.6035 20.5195 15.5449C20.4961 15.5332 17.5391 14.4316 17.5234 12.0371Z" />
                    <path d="M15.1172 4.51172C15.7891 3.67969 16.2344 2.53125 16.0898 1.36719C15.1055 1.41016 13.8691 2.01953 13.1738 2.83984C12.5488 3.56641 12.0098 4.75781 12.1777 5.87891C13.2793 5.96484 14.4219 5.33203 15.1172 4.51172Z" />
                  </svg>
                  App Store
                </Button>
                <Button variant="outline" className="h-14 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.60938 20.9062C3.60938 21.1641 3.82031 21.375 4.07812 21.375H7.03125C7.28906 21.375 7.5 21.1641 7.5 20.9062V3.09375C7.5 2.83594 7.28906 2.625 7.03125 2.625H4.07812C3.82031 2.625 3.60938 2.83594 3.60938 3.09375V20.9062ZM9.14062 12C9.14062 12.1992 9.30469 12.3633 9.50391 12.3633H12.4688C12.668 12.3633 12.832 12.1992 12.832 12V3.09375C12.832 2.83594 12.6211 2.625 12.3633 2.625H9.97266C9.71484 2.625 9.50391 2.83594 9.50391 3.09375V12ZM14.4727 16.5938C14.4727 16.7812 14.625 16.9336 14.8125 16.9336H17.7656C17.9531 16.9336 18.1055 16.7812 18.1055 16.5938V3.09375C18.1055 2.83594 17.8945 2.625 17.6367 2.625H15.2461C14.9883 2.625 14.7773 2.83594 14.7773 3.09375V16.5938H14.4727ZM20.3906 20.9062C20.3906 21.1641 20.6016 21.375 20.8594 21.375H20.9062C21.1641 21.375 21.375 21.1641 21.375 20.9062V3.09375C21.375 2.83594 21.1641 2.625 20.9062 2.625H20.8594C20.6016 2.625 20.3906 2.83594 20.3906 3.09375V20.9062Z" />
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="relative mx-auto h-[500px] w-[250px]">
              <div className="absolute -left-4 top-8 h-[450px] w-[250px] rounded-3xl border-8 border-foreground/10 bg-background shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=900&width=500"
                    alt="Mobile app screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute -right-4 top-16 h-[450px] w-[250px] rounded-3xl border-8 border-foreground/10 bg-background shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=900&width=500"
                    alt="Mobile app screenshot"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - New */}
      <section id="pricing" className="container mx-auto max-w-6xl px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">Simple, Transparent Pricing</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <p className="text-3xl font-bold">
                $29<span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">Perfect for solo couriers and small businesses.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 100 waybills/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Basic OCR functionality</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full">Get Started</Button>
            </div>
          </Card>

          <Card className="flex flex-col relative border-primary">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <p className="text-3xl font-bold">
                $79<span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">Ideal for growing logistics companies.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Up to 500 waybills/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced OCR with 99% accuracy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Priority email & chat support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>API access</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full">Get Started</Button>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <p className="text-3xl font-bold">
                $199<span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">For large logistics operations with complex needs.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Unlimited waybills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Premium OCR with custom training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>24/7 phone & priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Advanced API with webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom integrations</span>
                </li>
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="w-full">Contact Sales</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Automate Your Waybill Processing?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
            Join thousands of businesses that have transformed their logistics operations with our AI-powered OCR
            solution.
          </p>
          <Button size="lg" variant="secondary" className="h-12 px-8 text-lg" asChild>
            <Link href="/auth">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// This file only needs one default export

