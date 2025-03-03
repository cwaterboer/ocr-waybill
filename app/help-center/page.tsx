import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, FileQuestion, MessageCircle, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"

export default function HelpCenterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mb-8 text-center text-4xl font-bold">Help Center</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Find the help you need to make the most of OCR Waybill.
          </p>
          <div className="mb-12">
            <form className="mx-auto flex max-w-md gap-2">
              <Input type="search" placeholder="Search for help..." className="flex-1" />
              <Button type="submit">Search</Button>
            </form>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <SupportCard
              icon={BookOpen}
              title="Documentation"
              description="Comprehensive guides on how to use OCR Waybill"
              link="#"
            />
            <SupportCard icon={FileQuestion} title="FAQs" description="Quick answers to common questions" link="#" />
            <SupportCard
              icon={MessageCircle}
              title="Community Forum"
              description="Connect with other users and share tips"
              link="#"
            />
            <SupportCard
              icon={Phone}
              title="Contact Support"
              description="Get in touch with our support team"
              link="#"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function SupportCard({ icon: Icon, title, description, link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <Button variant="link" className="p-0" asChild>
          <a href={link}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  )
}

