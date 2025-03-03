"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Loader2, Upload, Camera, Trash2, Check } from "lucide-react"
import Image from "next/image"
import { BoundaryBoxEditor } from "@/components/BoundaryBoxEditor"
import { useRouter } from "next/navigation"

// Define the form schema
const scanFormSchema = z.object({
  file: z.instanceof(File).optional(),
})

type ScanFormValues = z.infer<typeof scanFormSchema>

export default function ScanWaybillPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showBoundaryEditor, setShowBoundaryEditor] = useState(false)
  const [boundaryBoxes, setBoundaryBoxes] = useState<Array<{ x: number; y: number; width: number; height: number }>>([])
  const [extractedData, setExtractedData] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Initialize form
  const form = useForm<ScanFormValues>({
    resolver: zodResolver(scanFormSchema),
    defaultValues: {},
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create a preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      form.setValue("file", file)
      setExtractedData(null)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      // Create a preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      form.setValue("file", file)
      setExtractedData(null)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleRemoveFile = () => {
    setPreviewUrl(null)
    form.setValue("file", undefined)
    setExtractedData(null)
    setShowBoundaryEditor(false)
    setBoundaryBoxes([])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDefineBoundaries = () => {
    setShowBoundaryEditor(true)
  }

  const handleBoundaryBoxesChange = (boxes: Array<{ x: number; y: number; width: number; height: number }>) => {
    setBoundaryBoxes(boxes)
  }

  const handleProcessImage = async () => {
    const file = form.getValues().file

    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a waybill image to scan.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      if (boundaryBoxes.length > 0) {
        formData.append("boundaryBoxes", JSON.stringify(boundaryBoxes))
      }

      const response = await fetch("/api/ocr/process", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to process image")
      }

      setExtractedData(result.data)

      toast({
        title: "Image Processed",
        description: "The waybill image has been successfully processed.",
      })
    } catch (error) {
      console.error("Error processing image:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreateWaybill = () => {
    if (extractedData) {
      // Navigate to create waybill page with extracted data
      router.push(
        `/dashboard?waybillNumber=${extractedData.waybillNumber || ""}&numberOfPieces=${extractedData.numberOfPieces || ""}&actualWeight=${extractedData.actualWeight || ""}&dimensions=${extractedData.dimensions || ""}`,
      )
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Scan Waybill</h2>

        <Form {...form}>
          <form className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Waybill Image</CardTitle>
                <CardDescription>Upload an image of your waybill to extract information</CardDescription>
              </CardHeader>
              <CardContent>
                {!previewUrl ? (
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Drag and drop your waybill image</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                    <Button type="button" variant="outline">
                      Select File
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {showBoundaryEditor ? (
                      <BoundaryBoxEditor
                        imageUrl={previewUrl}
                        onBoundaryBoxesChange={handleBoundaryBoxesChange}
                        initialBoundaryBoxes={boundaryBoxes}
                      />
                    ) : (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                          src={previewUrl || "/placeholder.svg"}
                          alt="Waybill preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={handleRemoveFile}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>

                      <Button type="button" variant="outline" size="sm" onClick={handleDefineBoundaries}>
                        <Camera className="h-4 w-4 mr-2" />
                        {showBoundaryEditor ? "Hide Boundary Editor" : "Define Boundaries"}
                      </Button>

                      <Button type="button" onClick={handleProcessImage} disabled={isProcessing} className="ml-auto">
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Process Image</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {extractedData && (
              <Card>
                <CardHeader>
                  <CardTitle>Extracted Information</CardTitle>
                  <CardDescription>Information extracted from the waybill image</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Waybill Number</h4>
                        <p className="text-sm">{extractedData.waybillNumber || "Not detected"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Number of Pieces</h4>
                        <p className="text-sm">{extractedData.numberOfPieces || "Not detected"}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Actual Weight</h4>
                        <p className="text-sm">{extractedData.actualWeight || "Not detected"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Dimensions</h4>
                        <p className="text-sm">{extractedData.dimensions || "Not detected"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Raw Text</h4>
                    <pre className="mt-1 whitespace-pre-wrap text-xs p-2 bg-muted rounded-md max-h-40 overflow-auto">
                      {extractedData.rawText || "No text detected"}
                    </pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" onClick={handleCreateWaybill} className="ml-auto">
                    <Check className="mr-2 h-4 w-4" />
                    Create Waybill with Data
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </ProtectedRoute>
  )
}

