"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface BoundaryBox {
  x: number
  y: number
  width: number
  height: number
}

interface BoundaryBoxEditorProps {
  imageUrl: string
  onBoundaryBoxesChange: (boxes: BoundaryBox[]) => void
  initialBoundaryBoxes?: BoundaryBox[]
}

export function BoundaryBoxEditor({
  imageUrl,
  onBoundaryBoxesChange,
  initialBoundaryBoxes = [],
}: BoundaryBoxEditorProps) {
  const [boundaryBoxes, setBoundaryBoxes] = useState<BoundaryBox[]>(initialBoundaryBoxes)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [scale, setScale] = useState(1)

  // Load the image
  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)
    }
  }, [imageUrl])

  // Draw the canvas
  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imageRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match container
    const containerWidth = containerRef.current.clientWidth
    const containerHeight = 500 // Fixed height for consistency

    canvas.width = containerWidth
    canvas.height = containerHeight

    // Calculate scale to fit image in canvas
    const imgWidth = imageRef.current.width
    const imgHeight = imageRef.current.height

    const scaleX = containerWidth / imgWidth
    const scaleY = containerHeight / imgHeight
    const newScale = Math.min(scaleX, scaleY)

    setScale(newScale)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    const scaledWidth = imgWidth * newScale
    const scaledHeight = imgHeight * newScale
    const x = (containerWidth - scaledWidth) / 2
    const y = (containerHeight - scaledHeight) / 2

    ctx.drawImage(imageRef.current, x, y, scaledWidth, scaledHeight)

    // Draw boundary boxes
    boundaryBoxes.forEach((box, index) => {
      ctx.strokeStyle = index === selectedBox ? "blue" : "red"
      ctx.lineWidth = 2

      // Draw scaled box
      ctx.strokeRect(x + box.x * newScale, y + box.y * newScale, box.width * newScale, box.height * newScale)
    })
  }, [imageLoaded, boundaryBoxes, selectedBox])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (imageLoaded) {
        // Trigger redraw
        setImageLoaded(false)
        setTimeout(() => setImageLoaded(true), 0)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [imageLoaded])

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on an existing box
    let clickedOnBox = false

    // Calculate image position
    const containerWidth = containerRef.current?.clientWidth || 0
    const containerHeight = 500
    const imgWidth = imageRef.current.width * scale
    const imgHeight = imageRef.current.height * scale
    const imgX = (containerWidth - imgWidth) / 2
    const imgY = (containerHeight - imgHeight) / 2

    for (let i = boundaryBoxes.length - 1; i >= 0; i--) {
      const box = boundaryBoxes[i]
      const boxX = imgX + box.x * scale
      const boxY = imgY + box.y * scale
      const boxWidth = box.width * scale
      const boxHeight = box.height * scale

      if (x >= boxX && x <= boxX + boxWidth && y >= boxY && y <= boxY + boxHeight) {
        setSelectedBox(i)
        clickedOnBox = true
        break
      }
    }

    if (!clickedOnBox) {
      setSelectedBox(null)
      setIsDrawing(true)
      setStartPos({ x, y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Redraw canvas
    const ctx = canvas.getContext("2d")
    if (!ctx || !imageRef.current) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate image position
    const containerWidth = containerRef.current?.clientWidth || 0
    const containerHeight = 500
    const imgWidth = imageRef.current.width * scale
    const imgHeight = imageRef.current.height * scale
    const imgX = (containerWidth - imgWidth) / 2
    const imgY = (containerHeight - imgHeight) / 2

    // Draw image
    ctx.drawImage(imageRef.current, imgX, imgY, imgWidth, imgHeight)

    // Draw existing boxes
    boundaryBoxes.forEach((box, index) => {
      ctx.strokeStyle = index === selectedBox ? "blue" : "red"
      ctx.lineWidth = 2

      ctx.strokeRect(imgX + box.x * scale, imgY + box.y * scale, box.width * scale, box.height * scale)
    })

    // Draw new box
    ctx.strokeStyle = "green"
    ctx.lineWidth = 2
    ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate image position
    const containerWidth = containerRef.current?.clientWidth || 0
    const containerHeight = 500
    const imgWidth = imageRef.current.width * scale
    const imgHeight = imageRef.current.height * scale
    const imgX = (containerWidth - imgWidth) / 2
    const imgY = (containerHeight - imgHeight) / 2

    // Convert coordinates to original image scale
    const startX = Math.max(0, Math.min((startPos.x - imgX) / scale, imageRef.current.width))
    const startY = Math.max(0, Math.min((startPos.y - imgY) / scale, imageRef.current.height))
    const endX = Math.max(0, Math.min((x - imgX) / scale, imageRef.current.width))
    const endY = Math.max(0, Math.min((y - imgY) / scale, imageRef.current.height))

    // Create new box (ensure positive width/height)
    const newBox: BoundaryBox = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    }

    // Only add if box has some size
    if (newBox.width > 5 && newBox.height > 5) {
      const updatedBoxes = [...boundaryBoxes, newBox]
      setBoundaryBoxes(updatedBoxes)
      onBoundaryBoxesChange(updatedBoxes)
    }

    setIsDrawing(false)
    setStartPos(null)
  }

  const handleDeleteBox = () => {
    if (selectedBox !== null) {
      const updatedBoxes = boundaryBoxes.filter((_, index) => index !== selectedBox)
      setBoundaryBoxes(updatedBoxes)
      onBoundaryBoxesChange(updatedBoxes)
      setSelectedBox(null)
    }
  }

  const handleClearBoxes = () => {
    setBoundaryBoxes([])
    onBoundaryBoxesChange([])
    setSelectedBox(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Draw boundary boxes around text areas</h3>
        <div className="space-x-2">
          <Button type="button" variant="outline" size="sm" onClick={handleDeleteBox} disabled={selectedBox === null}>
            Delete Selected
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearBoxes}
            disabled={boundaryBoxes.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="relative border rounded-lg overflow-hidden" style={{ height: "500px" }}>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <p>Loading image...</p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Click and drag to create boundary boxes. Click on a box to select it for deletion.
      </p>
    </div>
  )
}

