"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, Sparkles, FileText, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { autoFillForm } from "../actions/auto-fill-form"
import { GeneratedFormDisplay } from "../ai-forms/components/generated-form-display"
import { GeneratedForm } from "../ai-forms/types"

export default function AutoFillPage() {
    const { toast } = useToast()
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setFile(selectedFile)
                setPreviewUrl(URL.createObjectURL(selectedFile))
                setGeneratedForm(null)
            } else {
                toast({
                    title: "Invalid File Type",
                    description: "Please upload an image file (PNG, JPG, JPEG).",
                    variant: "destructive"
                })
            }
        }
    }

    const handleAutoFill = async () => {
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const result = await autoFillForm(formData)

            if (result.success && result.form) {
                setGeneratedForm(result.form)
                toast({
                    title: "Success",
                    description: "Form analyzed and auto-filled with your profile data!",
                })
            } else {
                toast({
                    title: "Processing Failed",
                    description: result.error || "Could not analyze the form.",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">AI Form Auto-Fill</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Upload a photo of any form, and our AI will extract the fields and automatically fill them using your stored profile data.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="space-y-6">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-primary" />
                                    Upload Form Image
                                </CardTitle>
                                <CardDescription>Supported formats: JPG, PNG, WEBP</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                                        ${previewUrl ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'}
                                    `}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="form-upload"
                                    />

                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} alt="Preview" className="max-h-[400px] mx-auto rounded-md shadow-md" />
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setFile(null)
                                                    setPreviewUrl(null)
                                                    setGeneratedForm(null)
                                                }}
                                            >
                                                Change
                                            </Button>
                                        </div>
                                    ) : (
                                        <label htmlFor="form-upload" className="cursor-pointer block space-y-4">
                                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                                                <Upload className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">Click to upload or drag and drop</p>
                                                <p className="text-sm text-muted-foreground">Upload a clear image of your form</p>
                                            </div>
                                        </label>
                                    )}
                                </div>

                                <Button
                                    onClick={handleAutoFill}
                                    disabled={!file || loading}
                                    className="w-full h-12 text-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Analyzing & Filling...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Auto-Fill with AI
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results Section */}
                    {generatedForm ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-medium">Form successfully analyzed and filled!</span>
                            </div>
                            <GeneratedFormDisplay
                                generatedForm={generatedForm}
                                prompt="Auto-filled from image"
                                formType="Uploaded"
                                industry="General"
                                complexity="Auto"
                                onGenerate={handleAutoFill} // Allows "regenerating" which effectively re-processes
                            />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/10 p-12 text-center text-muted-foreground">
                            <div className="space-y-4 max-w-sm">
                                <FileText className="w-16 h-16 mx-auto opacity-20" />
                                <h3 className="text-xl font-medium text-foreground">No Result Yet</h3>
                                <p>Upload a form image and click "Auto-Fill" to see the magic happen here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
