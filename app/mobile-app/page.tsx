import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Bell, Lock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import Image from "next/image"

export default function MobileAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-6 text-4xl font-bold">OCR Waybill Mobile App</h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Process waybills on the go with our powerful mobile application. Available for iOS and Android devices.
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
        </section>
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={Zap}
                title="Instant Scanning"
                description="Quickly scan waybills using your device's camera for immediate processing."
              />
              <FeatureCard
                icon={Globe}
                title="Offline Mode"
                description="Work without an internet connection and sync data when you're back online."
              />
              <FeatureCard
                icon={Bell}
                title="Push Notifications"
                description="Stay updated with real-time alerts on your document processing status."
              />
              <FeatureCard
                icon={Lock}
                title="Secure Access"
                description="Protect your data with biometric authentication and encryption."
              />
            </div>
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

