"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Wand2,
    Download,
    Copy,
    RefreshCw,
    AlertCircle,
    Brain,
    Share2,
    Check,
    Code,
    Eye,
    Save,
    ExternalLink
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { GeneratedForm } from "../types"
import { saveForm } from "../../actions/save-form"

interface GeneratedFormDisplayProps {
    generatedForm: GeneratedForm | null;
    prompt: string;
    formType: string;
    industry: string;
    complexity: string;
    onGenerate: () => void;
}

export function GeneratedFormDisplay({
    generatedForm,
    prompt,
    formType,
    industry,
    complexity,
    onGenerate
}: GeneratedFormDisplayProps) {
    const [saving, setSaving] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null)
    const [copiedLink, setCopiedLink] = useState(false)

    // Code copy states
    const [copiedHtml, setCopiedHtml] = useState(false)
    const [copiedJson, setCopiedJson] = useState(false)


    const handleSaveAndShare = async () => {
        if (!generatedForm) return

        setSaving(true)
        try {
            const result = await saveForm(generatedForm)
            if (result.success && result.id) {
                const url = `${window.location.origin}/forms/${result.id}`
                setShareUrl(url)
                toast({
                    title: "Form Saved!",
                    description: "Your form is now public and ready to share.",
                })
            } else {
                toast({
                    title: "Save Failed",
                    description: result.error || "Failed to save form",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            })
        } finally {
            setSaving(false)
        }
    }

    const copyLink = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl)
            setCopiedLink(true)
            setTimeout(() => setCopiedLink(false), 2000)
            toast({ title: "Link Copied", description: "Share link copied to clipboard" })
        }
    }

    const exportForm = () => {
        if (!generatedForm) return

        const formData = {
            ...generatedForm,
            generatedAt: new Date().toISOString(),
            prompt: prompt,
            settings: { formType, industry, complexity },
        }

        const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${generatedForm.name.replace(/\s+/g, "-").toLowerCase()}-ai-form.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
            title: "Form Exported",
            description: "AI-generated form has been downloaded as JSON.",
        })
    }

    const generateHtmlCode = () => {
        if (!generatedForm) return ""
        return `
<form class="ai-generated-form">
  <h2>${generatedForm.name}</h2>
  <p>${generatedForm.description}</p>
  
  ${generatedForm.fields.map(field => `
  <div class="form-field">
    <label for="${field.id}">${field.label}${field.required ? " *" : ""}</label>
    ${field.type === "textarea"
                ? `<textarea id="${field.id}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""}></textarea>`
                : field.type === "select"
                    ? `<select id="${field.id}" ${field.required ? "required" : ""}>
      <option value="">Select an option</option>
    </select>`
                    : `<input type="${field.type}" id="${field.id}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""} />`
            }
    ${field.description ? `<small>${field.description}</small>` : ""}
  </div>`).join("")}
  
  <button type="submit">Submit</button>
</form>`.trim()
    }

    const copyCode = (type: 'html' | 'json') => {
        if (!generatedForm) return
        const text = type === 'html' ? generateHtmlCode() : JSON.stringify(generatedForm, null, 2)
        navigator.clipboard.writeText(text)

        if (type === 'html') {
            setCopiedHtml(true); setTimeout(() => setCopiedHtml(false), 2000)
        } else {
            setCopiedJson(true); setTimeout(() => setCopiedJson(false), 2000)
        }

        toast({ title: "Copied!", description: `${type.toUpperCase()} copied to clipboard.` })
    }

    if (!generatedForm) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Form Generated Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Describe your form requirements in the sidebar and let AI create the perfect form for you.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>✨ AI-powered field generation</p>
                        <p>🎯 Industry-specific templates</p>
                        <p>📋 Smart validation rules</p>
                        <p>🔧 Customizable complexity levels</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {/* Form Header */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Wand2 className="w-5 h-5 text-primary" />
                                {generatedForm.name}
                            </CardTitle>
                            <CardDescription>{generatedForm.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">{Math.round(generatedForm.confidence * 100)}% confidence</Badge>
                            <Badge variant="outline">{generatedForm.category}</Badge>
                            <Button onClick={onGenerate} variant="ghost" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Regenerate
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                        <Code className="w-4 h-4" /> Code
                    </TabsTrigger>
                    <TabsTrigger value="share" className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </TabsTrigger>
                </TabsList>

                {/* Preview Tab */}
                <TabsContent value="preview" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Preview</CardTitle>
                            <CardDescription>Test your form exactly as users will see it.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4 max-w-2xl mx-auto border p-6 rounded-lg bg-card/50" onSubmit={(e) => e.preventDefault()}>
                                {generatedForm.fields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <Label htmlFor={field.id}>
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                        </Label>

                                        {field.type === "textarea" ? (
                                            <Textarea id={field.id} placeholder={field.placeholder} rows={3} required={field.required} />
                                        ) : field.type === "select" ? (
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={field.placeholder || "Select an option"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="option1">Option 1</SelectItem>
                                                    <SelectItem value="option2">Option 2</SelectItem>
                                                    <SelectItem value="option3">Option 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : field.type === "checkbox" ? (
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id={field.id} className="h-4 w-4 rounded border-gray-300" />
                                                <Label htmlFor={field.id} className="text-sm font-normal">
                                                    {field.description || field.label}
                                                </Label>
                                            </div>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                id={field.id}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                            />
                                        )}

                                        {field.description && field.type !== "checkbox" && (
                                            <p className="text-xs text-muted-foreground">{field.description}</p>
                                        )}
                                    </div>
                                ))}
                                <Button className="w-full" type="submit">Submit Form (Demo)</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Source Code</CardTitle>
                            <CardDescription>Get the code to embed this form on your website.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>HTML Structure</Label>
                                    <Button variant="outline" size="sm" onClick={() => copyCode('html')}>
                                        {copiedHtml ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                        {copiedHtml ? "Copied" : "Copy HTML"}
                                    </Button>
                                </div>
                                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                    <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">{generateHtmlCode()}</pre>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>JSON Data</Label>
                                    <Button variant="outline" size="sm" onClick={() => copyCode('json')}>
                                        {copiedJson ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                        {copiedJson ? "Copied" : "Copy JSON"}
                                    </Button>
                                </div>
                                <div className="bg-muted p-4 rounded-md overflow-x-auto max-h-[300px]">
                                    <pre className="text-xs text-muted-foreground font-mono">{JSON.stringify(generatedForm, null, 2)}</pre>
                                </div>
                            </div>

                            <Button onClick={exportForm} variant="secondary" className="w-full">
                                <Download className="w-4 h-4 mr-2" /> Download JSON File
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Share Tab */}
                <TabsContent value="share" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Save & Share</CardTitle>
                            <CardDescription>Publish your form to share it with the world.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {!shareUrl ? (
                                <div className="text-center py-8">
                                    <Share2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                    <h3 className="text-lg font-medium mb-2">Publish to Share</h3>
                                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                        Save this form to create a unique shareable link. Anyone with the link can view and fill out the form.
                                    </p>
                                    <Button onClick={handleSaveAndShare} disabled={saving} className="w-full max-w-sm">
                                        {saving ? (
                                            <>Saving...</>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save & Generate Link
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-900">Form Published!</h4>
                                            <p className="text-sm text-green-700">Your form is live and ready to collect responses.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Share Link</Label>
                                        <div className="flex items-center gap-2">
                                            <Input value={shareUrl} readOnly />
                                            <Button onClick={copyLink} variant="outline" size="icon">
                                                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                            <Button asChild variant="outline" size="icon">
                                                <a href={shareUrl} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-center">
                                        <Button variant="outline" onClick={() => setShareUrl(null)}>
                                            Create Improvements Loop
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
