import { ImageAnnotatorClient } from "@google-cloud/vision"
import { createCanvas, loadImage } from "canvas"

// Interface for boundary box coordinates
export interface BoundaryBox {
  x: number
  y: number
  width: number
  height: number
}

// Interface for extracted waybill data
export interface ExtractedWaybillData {
  waybillNumber: string | null
  numberOfPieces: string | null
  actualWeight: string | null
  dimensions: string | null
  rawText: string
}

// Initialize Google Cloud Vision client
let visionClient: ImageAnnotatorClient | null = null

// Initialize the Vision client with credentials
export const initVisionClient = () => {
  try {
    // In production, these credentials should be securely stored
    // and accessed via environment variables
    visionClient = new ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })
    return true
  } catch (error) {
    console.error("Error initializing Vision client:", error)
    return false
  }
}

// Process an image with Google Vision API
export const processImageWithVision = async (imageBuffer: Buffer): Promise<string | null> => {
  try {
    if (!visionClient) {
      if (!initVisionClient()) {
        throw new Error("Failed to initialize Vision client")
      }
    }

    const [result] = await visionClient.textDetection({
      image: { content: imageBuffer },
    })

    if (!result.fullTextAnnotation) {
      return null
    }

    return result.fullTextAnnotation.text || null
  } catch (error) {
    console.error("Error processing image with Vision API:", error)
    throw error
  }
}

// Process a cropped region of an image
export const processCroppedImage = async (imageBuffer: Buffer, boundaryBox: BoundaryBox): Promise<string | null> => {
  try {
    // Load the image
    const image = await loadImage(imageBuffer)

    // Create a canvas with the dimensions of the boundary box
    const canvas = createCanvas(boundaryBox.width, boundaryBox.height)
    const ctx = canvas.getContext("2d")

    // Draw only the portion of the image defined by the boundary box
    ctx.drawImage(
      image,
      boundaryBox.x,
      boundaryBox.y,
      boundaryBox.width,
      boundaryBox.height,
      0,
      0,
      boundaryBox.width,
      boundaryBox.height,
    )

    // Convert canvas to buffer
    const croppedBuffer = canvas.toBuffer("image/jpeg")

    // Process the cropped image with Vision API
    return await processImageWithVision(croppedBuffer)
  } catch (error) {
    console.error("Error processing cropped image:", error)
    throw error
  }
}

// Extract fields from OCR text using regex patterns
export const extractWaybillFields = (text: string): ExtractedWaybillData => {
  const extractedData: ExtractedWaybillData = {
    waybillNumber: null,
    numberOfPieces: null,
    actualWeight: null,
    dimensions: null,
    rawText: text,
  }

  // Waybill number extraction (looking for a 10-digit number starting with 20)
  const waybillMatch = text.match(/\b20\d{8}\b/)
  if (waybillMatch) {
    extractedData.waybillNumber = waybillMatch[0]
  }

  // Actual weight extraction
  const weightMatch = text.match(/ACTUAL\s*(\d+)/i)
  if (weightMatch) {
    extractedData.actualWeight = weightMatch[1]
  }

  // Dimensions extraction
  const dimensionsMatch = text.match(/DIMENSIONS\s*(\d+×\d+\s*x\s*\d+)/i)
  if (dimensionsMatch) {
    extractedData.dimensions = dimensionsMatch[1]

    // Try to extract number of pieces from dimensions
    const piecesMatch = dimensionsMatch[1].match(/^(\d+)/)
    if (piecesMatch) {
      extractedData.numberOfPieces = piecesMatch[1]
    }
  }

  return extractedData
}

