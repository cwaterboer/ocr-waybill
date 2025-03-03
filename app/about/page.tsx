import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 pt-32 pb-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">About OCR Waybill</h1>
                <p className="text-xl text-muted-foreground">
                  We're on a mission to revolutionize logistics document processing with cutting-edge AI technology.
                </p>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="OCR Waybill Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Story</h2>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-lg">
                OCR Waybill was founded in 2020 by a team of logistics professionals and AI engineers who experienced
                firsthand the inefficiencies of paper-based document processing in the logistics industry.
              </p>
              <p className="mb-6 text-lg">
                After years of dealing with lost waybills, data entry errors, and time-consuming manual processes, our
                founders decided to create a solution that would transform how logistics documents are handled.
              </p>
              <p className="mb-6 text-lg">
                Today, OCR Waybill serves thousands of customers worldwide, from solo couriers to large logistics
                enterprises, helping them save time, reduce errors, and improve their operations through our AI-powered
                OCR technology.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
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
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously push the boundaries of what's possible with AI and OCR technology.
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Security</h3>
                <p className="text-muted-foreground">
                  We prioritize the security and privacy of our customers' data above all else.
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
                    <path d="M17 6.1H3" />
                    <path d="M21 12.1H3" />
                    <path d="M15.1 18H3" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Simplicity</h3>
                <p className="text-muted-foreground">
                  We believe in creating intuitive, easy-to-use solutions that solve complex problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Leadership Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 mx-auto relative h-40 w-40 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=160&width=160" alt="CEO" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-primary">CEO & Co-Founder</p>
                <p className="mt-2 text-muted-foreground">
                  Former logistics executive with 15+ years of experience in the industry.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 mx-auto relative h-40 w-40 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=160&width=160" alt="CTO" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-primary">CTO & Co-Founder</p>
                <p className="mt-2 text-muted-foreground">
                  AI researcher with a background in computer vision and machine learning.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 mx-auto relative h-40 w-40 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=160&width=160" alt="COO" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-primary">COO</p>
                <p className="mt-2 text-muted-foreground">Operations expert who has scaled multiple SaaS companies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Join Our Journey</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Be part of the logistics revolution. Try OCR Waybill today and experience the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

