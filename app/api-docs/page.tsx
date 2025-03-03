import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { VersionSwitcher } from "@/components/version-switcher"
import { SearchForm } from "@/components/search-form"
import { Copy } from "lucide-react"

export default function ApiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-32">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-[250px_1fr]">
            <div className="hidden md:block">
              <div className="sticky top-24 space-y-6">
                <SearchForm />
                <div className="space-y-2">
                  <h4 className="font-medium">API Version</h4>
                  <VersionSwitcher versions={["1.0", "0.9", "0.8"]} defaultVersion="1.0" />
                </div>
                <nav className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider">Getting Started</h4>
                    <ul className="space-y-1">
                      <li>
                        <a href="#introduction" className="text-sm text-primary hover:underline">
                          Introduction
                        </a>
                      </li>
                      <li>
                        <a href="#authentication" className="text-sm text-muted-foreground hover:text-foreground">
                          Authentication
                        </a>
                      </li>
                      <li>
                        <a href="#errors" className="text-sm text-muted-foreground hover:text-foreground">
                          Errors
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider">Resources</h4>
                    <ul className="space-y-1">
                      <li>
                        <a href="#waybills" className="text-sm text-muted-foreground hover:text-foreground">
                          Waybills
                        </a>
                      </li>
                      <li>
                        <a href="#ocr" className="text-sm text-muted-foreground hover:text-foreground">
                          OCR Processing
                        </a>
                      </li>
                      <li>
                        <a href="#users" className="text-sm text-muted-foreground hover:text-foreground">
                          Users
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider">Webhooks</h4>
                    <ul className="space-y-1">
                      <li>
                        <a href="#webhook-setup" className="text-sm text-muted-foreground hover:text-foreground">
                          Setup
                        </a>
                      </li>
                      <li>
                        <a href="#webhook-events" className="text-sm text-muted-foreground hover:text-foreground">
                          Events
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="min-w-0">
              <div className="mb-12">
                <h1 className="mb-4 text-4xl font-bold" id="introduction">
                  OCR Waybill API Documentation
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome to the OCR Waybill API. This documentation will help you integrate our OCR processing
                  capabilities into your applications.
                </p>
              </div>

              <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Base URL</h2>
                <div className="relative rounded-md bg-muted p-4">
                  <code className="text-sm">https://api.ocrwaybill.com/v1</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </section>

              <section className="mb-12" id="authentication">
                <h2 className="mb-4 text-2xl font-bold">Authentication</h2>
                <p className="mb-4">
                  The OCR Waybill API uses API keys to authenticate requests. You can view and manage your API keys in
                  the dashboard.
                </p>
                <p className="mb-4">
                  Authentication to the API is performed via HTTP Bearer Auth. Provide your API key as the bearer token
                  value.
                </p>
                <div className="relative rounded-md bg-muted p-4">
                  <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </section>

              <section className="mb-12" id="errors">
                <h2 className="mb-4 text-2xl font-bold">Errors</h2>
                <p className="mb-4">
                  The OCR Waybill API uses conventional HTTP response codes to indicate the success or failure of an API
                  request.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left font-medium">Code</th>
                        <th className="py-2 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">200 - OK</td>
                        <td className="py-2">Everything worked as expected.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">400 - Bad Request</td>
                        <td className="py-2">
                          The request was unacceptable, often due to missing a required parameter.
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">401 - Unauthorized</td>
                        <td className="py-2">No valid API key provided.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">404 - Not Found</td>
                        <td className="py-2">The requested resource doesn't exist.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">429 - Too Many Requests</td>
                        <td className="py-2">Too many requests hit the API too quickly.</td>
                      </tr>
                      <tr>
                        <td className="py-2">500 - Server Error</td>
                        <td className="py-2">Something went wrong on our end.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12" id="waybills">
                <h2 className="mb-4 text-2xl font-bold">Waybills</h2>
                <p className="mb-4">The Waybills API allows you to create, read, update, and delete waybill records.</p>

                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="list">List Waybills</TabsTrigger>
                    <TabsTrigger value="create">Create Waybill</TabsTrigger>
                    <TabsTrigger value="get">Get Waybill</TabsTrigger>
                    <TabsTrigger value="update">Update Waybill</TabsTrigger>
                  </TabsList>
                  <TabsContent value="list">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                          GET
                        </span>
                        <code className="text-sm">/waybills</code>
                      </div>
                      <p>Returns a list of waybills.</p>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm">
                          {`curl -X GET "https://api.ocrwaybill.com/v1/waybills" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="create">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">POST</span>
                        <code className="text-sm">/waybills</code>
                      </div>
                      <p>Creates a new waybill.</p>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm">
                          {`curl -X POST "https://api.ocrwaybill.com/v1/waybills" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tracking_number": "WB12345678",
    "sender": {
      "name": "John Doe",
      "address": "123 Main St, San Francisco, CA"
    },
    "recipient": {
      "name": "Jane Smith",
      "address": "456 Market St, San Francisco, CA"
    },
    "items": [
      {
        "description": "Package",
        "quantity": 1,
        "weight": 2.5
      }
    ]
  }'`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="get">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                          GET
                        </span>
                        <code className="text-sm">/waybills/:id</code>
                      </div>
                      <p>Retrieves a waybill by ID.</p>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm">
                          {`curl -X GET "https://api.ocrwaybill.com/v1/waybills/wb_123456789" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="update">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-500 px-2 py-1 text-xs font-bold text-white">PUT</span>
                        <code className="text-sm">/waybills/:id</code>
                      </div>
                      <p>Updates an existing waybill.</p>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm">
                          {`curl -X PUT "https://api.ocrwaybill.com/v1/waybills/wb_123456789" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "status": "delivered",
    "delivery_date": "2023-06-15T14:30:00Z"
  }'`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>

              <section className="mb-12" id="ocr">
                <h2 className="mb-4 text-2xl font-bold">OCR Processing</h2>
                <p className="mb-4">The OCR API allows you to extract data from waybill images and documents.</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">POST</span>
                    <code className="text-sm">/ocr/process</code>
                  </div>
                  <p>Processes an image or PDF and extracts waybill data.</p>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm">
                      {`curl -X POST "https://api.ocrwaybill.com/v1/ocr/process" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@waybill.pdf" \\
  -F "options={\\\"language\\\":\\\"en\\\",\\\"extract_signatures\\\":true}"`}
                    </pre>
                  </div>
                </div>
              </section>

              <div className="mt-16 rounded-lg border bg-muted p-6">
                <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
                <p className="mb-4">Can't find what you're looking for? Our support team is here to help.</p>
                <Button asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

