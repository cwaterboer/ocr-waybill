"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Loader2, Upload, Plus, Trash2, Edit, Save } from "lucide-react"
import Image from "next/image"
import { BoundaryBoxEditor } from "@/components/BoundaryBoxEditor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"

// Define the form schema
const templateFormSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  file: z.instanceof(File).optional(),
})

type TemplateFormValues = z.infer<typeof templateFormSchema>

interface TemplateField {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
}

interface Template {
  id: string
  name: string
  backgroundUrl: string
  fields: TemplateField[]
  createdAt: string
}

export default function TemplatesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [boundaryBoxes, setBoundaryBoxes] = useState<Array<{ x: number; y: number; width: number; height: number }>>([])
  const [fieldNames, setFieldNames] = useState<Record<number, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Initialize form
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: "",
    },
  })

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates")
        const data = await response.json()

        if (response.ok) {
          setTemplates(data.templates || [])
        } else {
          throw new Error(data.error || "Failed to fetch templates")
        }
      } catch (error) {
        console.error("Error fetching templates:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch templates",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [toast])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create a preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      form.setValue("file", file)
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
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleRemoveFile = () => {
    setPreviewUrl(null)
    form.setValue("file", undefined)
    setBoundaryBoxes([])
    setFieldNames({})

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleBoundaryBoxesChange = (boxes: Array<{ x: number; y: number; width: number; height: number }>) => {
    setBoundaryBoxes(boxes)

    // Initialize field names for new boxes
    const newFieldNames = { ...fieldNames }
    boxes.forEach((_, index) => {
      if (!newFieldNames[index]) {
        newFieldNames[index] = `Field ${index + 1}`
      }
    })
    setFieldNames(newFieldNames)
  }

  const handleFieldNameChange = (index: number, name: string) => {
    setFieldNames({
      ...fieldNames,
      [index]: name,
    })
  }

  const handleSubmit = async (values: TemplateFormValues) => {
    if (!previewUrl || !values.file) {
      toast({
        title: "Missing Background",
        description: "Please upload a background image for your template.",
        variant: "destructive",
      })
      return
    }

    if (boundaryBoxes.length === 0) {
      toast({
        title: "No Fields Defined",
        description: "Please define at least one field on your template.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // First, upload the background image
      const imageFormData = new FormData()
      imageFormData.append("file", values.file)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      })

      const uploadResult = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || "Failed to upload background image")
      }

      // Create fields from boundary boxes
      const fields = boundaryBoxes.map((box, index) => ({
        id: `field-${index}`,
        name: fieldNames[index] || `Field ${index + 1}`,
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      }))

      // Create template
      const templateData = {
        name: values.name,
        backgroundUrl: uploadResult.url,
        fields,
      }

      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create template")
      }

      toast({
        title: "Template Created",
        description: `Template "${values.name}" has been created successfully.`,
      })

      // Reset form
      form.reset()
      setPreviewUrl(null)
      setBoundaryBoxes([])
      setFieldNames({})

      // Refresh templates
      setTemplates([...templates, result.data])
    } catch (error) {
      console.error("Error creating template:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create template",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || "Failed to delete template")
      }

      // Remove template from state
      setTemplates(templates.filter((template) => template.id !== templateId))

      toast({
        title: "Template Deleted",
        description: "The template has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete template",
        variant: "destructive",
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Waybill Templates</h2>

        <Tabs defaultValue="templates">
          <TabsList className="mb-6">
            <TabsTrigger value="templates">My Templates</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first template to get started</p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-lg border-b">
                      <Image
                        src={template.backgroundUrl || "/placeholder.svg"}
                        alt={template.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>
                        {template.fields.length} field{template.fields.length !== 1 ? "s" : ""} defined
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="create">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Template</CardTitle>
                    <CardDescription>Upload a waybill background and define field positions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter template name" {...field} />
                          </FormControl>
                          <FormDescription>Give your template a descriptive name</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Background Image</FormLabel>
                      {!previewUrl ? (
                        <div
                          className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                        >
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-medium mb-2">Drag and drop your waybill template</h3>
                          <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                          <Button type="button" variant="outline">
                            Select File
                          </Button>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <BoundaryBoxEditor
                            imageUrl={previewUrl}
                            onBoundaryBoxesChange={handleBoundaryBoxesChange}
                            initialBoundaryBoxes={boundaryBoxes}
                          />

                          <div className="flex justify-end">
                            <Button type="button" variant="outline" size="sm" onClick={handleRemoveFile}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Background
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {boundaryBoxes.length > 0 && (
                      <div className="space-y-2">
                        <FormLabel>Field Mapping</FormLabel>
                        <div className="border rounded-lg p-4 space-y-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            Name each field to identify what data it should contain
                          </p>

                          {boundaryBoxes.map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <Input
                                value={fieldNames[index] || `Field ${index + 1}`}
                                onChange={(e) => handleFieldNameChange(index, e.target.value)}
                                placeholder={`Field ${index + 1} name`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isSubmitting} className="ml-auto">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Template
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

