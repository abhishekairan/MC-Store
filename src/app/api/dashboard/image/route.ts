import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const uploadDir = path.join(process.cwd(), "public/uploads/images");
  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const fileName = randomUUID() + path.extname(file.name) // Generate a unique file name
  const uploadedFile = fs.writeFileSync(path.join(uploadDir, fileName), buffer)
  // await writeFile(uploadDir, buffer)
  // console.log(`open ${path} to see the uploaded file`)
  const response = {
    success: true,
    filePath: `/uploads/images/${fileName}`, // Adjust the path as needed
  }

  return NextResponse.json(response)
}

