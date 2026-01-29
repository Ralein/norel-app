"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  FileText,
  ImageIcon,
  File,
  X,
  Eye,
  Download,
  Sparkles,
  Brain,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { autoFillForm } from "../actions/auto-fill-form"
import type { GeneratedForm } from "../ai-forms/types"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
  category: string
  extractedData?: any
  aiProcessed?: boolean
}


export default function UploadPage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("auto-detect")
  const [aiProcessing, setAiProcessing] = useState<string[]>([])
  const [extractedData, setExtractedData] = useState<{ [fileId: string]: GeneratedForm }>({})

  const categories = [
    { value: "auto-detect", label: "Auto-detect", icon: Brain },
    { value: "identity", label: "Identity Documents", icon: FileText },
    { value: "financial", label: "Financial Documents", icon: FileText },
    { value: "medical", label: "Medical Records", icon: FileText },
    { value: "legal", label: "Legal Documents", icon: FileText },
    { value: "education", label: "Educational Certificates", icon: FileText },
    { value: "other", label: "Other", icon: File },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = async (files: File[]) => {
    setUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/json",
      ]

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive",
        })
        continue
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        })
        continue
      }

      // Simulate file upload
      const fileId = Date.now().toString() + i
      const fileUrl = URL.createObjectURL(file)

      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        uploadedAt: new Date().toISOString(),
        category: selectedCategory === "auto-detect" ? "processing" : selectedCategory,
      }

      setUploadedFiles((prev) => [...prev, uploadedFile])

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Start AI processing
      if (selectedCategory === "auto-detect" || file.type.startsWith("image/") || file.type === "application/pdf") {
        processWithAI(fileId, file)
      }
    }

    setUploading(false)
    setUploadProgress(0)

    toast({
      title: "Upload Complete",
      description: `${files.length} file(s) uploaded successfully.`,
    })
  }

  const processWithAI = async (fileId: string, file: File) => {
    setAiProcessing((prev) => [...prev, fileId])

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await autoFillForm(formData)

      if (result.success && result.form) {
        setExtractedData((prev) => ({
          ...prev,
          [fileId]: result.form as GeneratedForm,
        }))

        // Update file with AI processing complete
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, aiProcessed: true, category: result.form!.category } : f)),
        )

        toast({
          title: "AI Processing Complete",
          description: `Data extracted and profile-matched for ${file.name}.`,
        })
      } else {
        throw new Error(result.error || "Failed to process form")
      }
    } catch (error: any) {
      toast({
        title: "AI Processing Failed",
        description: error.message || `Failed to process ${file.name}. You can still view and manage the file manually.`,
        variant: "destructive",
      })
    } finally {
      setAiProcessing((prev) => prev.filter((id) => id !== fileId))
    }
  }

  const detectFormType = (filename: string): string => {
    const name = filename.toLowerCase()
    if (name.includes("passport") || name.includes("id")) return "identity"
    if (name.includes("bank") || name.includes("statement")) return "financial"
    if (name.includes("medical") || name.includes("health")) return "medical"
    if (name.includes("certificate") || name.includes("degree")) return "education"
    return "other"
  }


  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
    setExtractedData((prev) => {
      const newData = { ...prev }
      delete newData[fileId]
      return newData
    })
    toast({
      title: "File Removed",
      description: "File has been removed from your uploads.",
    })
  }

  const downloadExtractedData = (fileId: string) => {
    const data = extractedData[fileId]
    const file = uploadedFiles.find((f) => f.id === fileId)

    if (!data || !file) return

    const exportData = {
      fileName: file.name,
      formName: data.name,
      category: data.category,
      confidence: data.confidence,
      extractedFields: data.fields,
      suggestions: data.suggestions,
      extractedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `extracted-data-${file.name}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Data Downloaded",
      description: "Extracted data has been downloaded as JSON.",
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") return FileText
    return File
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      identity: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
      financial: "bg-green-500/10 text-green-700 dark:text-green-300",
      medical: "bg-red-500/10 text-red-700 dark:text-red-300",
      legal: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
      education: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
      processing: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
      other: "bg-gray-500/10 text-gray-700 dark:text-gray-300",
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Document Upload & AI Processing</h1>
            <p className="text-muted-foreground">
              Upload documents and let AI extract and organize your information automatically
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Category</CardTitle>
                  <CardDescription>Select the type of documents you're uploading</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Upload Area */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Documents
                  </CardTitle>
                  <CardDescription>
                    Drag and drop documents or click to browse. Supports PDF, DOCX, TXT, and JSON up to 10MB.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                      }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drop files here or click to upload</h3>
                    <p className="text-muted-foreground mb-4">PDF, DOCX, TXT, JSON files up to 10MB each</p>
                    <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </>
                      )}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.json"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>

                  {uploading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
                    <CardDescription>Manage your uploaded documents and view AI-extracted data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {uploadedFiles.map((file) => {
                        const FileIcon = getFileIcon(file.type)
                        const isProcessing = aiProcessing.includes(file.id)
                        const hasExtractedData = extractedData[file.id]

                        return (
                          <div key={file.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                  <FileIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium truncate">{file.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className={getCategoryColor(file.category)}>
                                      {file.category}
                                    </Badge>
                                    {isProcessing && (
                                      <Badge variant="secondary">
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                        AI Processing...
                                      </Badge>
                                    )}
                                    {file.aiProcessed && (
                                      <Badge variant="default">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        AI Processed
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasExtractedData && (
                                  <Button variant="outline" size="sm" onClick={() => downloadExtractedData(file.id)}>
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => removeFile(file.id)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* AI Extracted Data */}
                            {hasExtractedData && (
                              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                  <Sparkles className="w-4 h-4 text-primary" />
                                  <h5 className="font-medium">AI Profile-Matched Data</h5>
                                  <Badge variant="secondary">
                                    {Math.round(extractedData[file.id].confidence * 100)}% confidence
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  {extractedData[file.id].fields.map((field) => (
                                    <div key={field.id} className="space-y-1">
                                      <Label className="text-xs font-medium text-muted-foreground">{field.label}</Label>
                                      <div className="flex items-center gap-2">
                                        <Input value={(field as any).value || ""} readOnly className="text-sm" />
                                        <Badge variant="outline" className="text-[10px] h-4">
                                          {field.type}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {extractedData[file.id].suggestions && extractedData[file.id].suggestions.length > 0 && (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <AlertCircle className="w-4 h-4 text-orange-500" />
                                      <span className="text-sm font-medium">AI Suggestions</span>
                                    </div>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {extractedData[file.id].suggestions.map((suggestion, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <span className="text-orange-500 mt-1">•</span>
                                          {suggestion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Smart Text Extraction</h4>
                        <p className="text-sm text-muted-foreground">Automatically extract text from images and PDFs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Form Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Identify document types and extract structured data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Data Validation</h4>
                        <p className="text-sm text-muted-foreground">
                          Verify extracted information with confidence scores
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Auto-categorization</h4>
                        <p className="text-sm text-muted-foreground">Automatically categorize documents by type</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Files:</span>
                    <span className="font-medium">{uploadedFiles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">AI Processed:</span>
                    <span className="font-medium">{uploadedFiles.filter((f) => f.aiProcessed).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing:</span>
                    <span className="font-medium">{aiProcessing.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Size:</span>
                    <span className="font-medium">
                      {formatFileSize(uploadedFiles.reduce((acc, f) => acc + f.size, 0))}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Supported Formats */}
              <Card>
                <CardHeader>
                  <CardTitle>Supported Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>PDF Documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <span>Word Documents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <span>Text & JSON Files</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Maximum file size: 10MB per file</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
