import { type NextRequest, NextResponse } from "next/server"
import { processImageWithVision, processCroppedImage, extractWaybillFields, type BoundaryBox } from "@/lib/ocr-service"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const boundaryBoxesJson = formData.get("boundaryBoxes") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let extractedText: string | null
    let extractedData

    // If boundary boxes are provided, process each cropped region
    if (boundaryBoxesJson) {
      const boundaryBoxes = JSON.parse(boundaryBoxesJson) as BoundaryBox[]
      const results = []

      for (const box of boundaryBoxes) {
        const text = await processCroppedImage(buffer, box)
        if (text) {
          const data = extractWaybillFields(text)
          results.push(data)
        }
      }

      // Merge results from all boundary boxes
      extractedData = results.reduce(
        (merged, current) => {
          return {
            waybillNumber: merged.waybillNumber || current.waybillNumber,
            numberOfPieces: merged.numberOfPieces || current.numberOfPieces,
            actualWeight: merged.actualWeight || current.actualWeight,
            dimensions: merged.dimensions || current.dimensions,
            rawText: `${merged.rawText}\n${current.rawText}`,
          }
        },
        { waybillNumber: null, numberOfPieces: null, actualWeight: null, dimensions: null, rawText: "" },
      )
    } else {
      // Process the entire image
      extractedText = await processImageWithVision(buffer)
      if (!extractedText) {
        return NextResponse.json({ error: "No text detected in the image" }, { status: 400 })
      }

      extractedData = extractWaybillFields(extractedText)
    }

    return NextResponse.json({ success: true, data: extractedData })
  } catch (error) {
    console.error("Error processing OCR request:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

