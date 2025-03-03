import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32">
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Join Our Team</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're on a mission to revolutionize logistics document processing. Join us and help shape the future of
              the industry.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Why Work With Us</h2>
            <div className="grid gap-8 md:grid-cols-3">
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
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Competitive Compensation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We offer competitive salaries, equity options, and comprehensive benefits packages.</p>
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
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Continuous Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We invest in your growth with learning stipends, conferences, and mentorship opportunities.</p>
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
                      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                    Flexible Work
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We offer remote-friendly options, flexible hours, and a healthy work-life balance.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-bold">Open Positions</h2>
            <div className="grid gap-6">
              <JobCard
                title="Senior Frontend Developer"
                department="Engineering"
                location="Remote (US)"
                type="Full-time"
              />
              <JobCard
                title="Machine Learning Engineer"
                department="AI Research"
                location="San Francisco, CA"
                type="Full-time"
              />
              <JobCard title="Product Manager" department="Product" location="Remote (US)" type="Full-time" />
              <JobCard
                title="Customer Success Manager"
                department="Customer Success"
                location="New York, NY"
                type="Full-time"
              />
              <JobCard title="UX/UI Designer" department="Design" location="Remote (US)" type="Full-time" />
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="mb-4 text-2xl font-bold">Don't See a Perfect Fit?</h2>
            <p className="mb-8 text-muted-foreground">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
              mind for future opportunities.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function JobCard({ title, department, location, type }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              {department}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {type}
            </div>
          </div>
        </div>
        <div className="border-t md:border-l md:border-t-0 p-4 md:p-6 bg-muted/20">
          <Button>
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

