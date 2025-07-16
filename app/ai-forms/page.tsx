"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Sparkles,
  Wand2,
  Download,
  Copy,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react"

interface AIFormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  validation?: string
  description?: string
}

interface GeneratedForm {
  name: string
  description: string
  fields: AIFormField[]
  category: string
  confidence: number
  suggestions: string[]
}

export default function AIFormsPage() {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [formType, setFormType] = useState("")
  const [industry, setIndustry] = useState("")
  const [complexity, setComplexity] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null)

  const formTypes = [
    "Contact Form",
    "Registration Form",
    "Survey Form",
    "Application Form",
    "Feedback Form",
    "Order Form",
    "Booking Form",
    "Newsletter Signup",
    "Event Registration",
    "Job Application",
    "Customer Onboarding",
    "Lead Generation",
  ]

  const industries = [
    "Healthcare",
    "Banking & Finance",
    "Education",
    "E-commerce",
    "Real Estate",
    "Technology",
    "Government",
    "Insurance",
    "Travel & Tourism",
    "Food & Restaurant",
    "Legal Services",
    "Non-profit",
  ]

  const generateForm = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please describe the form you want to create.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock AI-generated form based on prompt
      const mockForm: GeneratedForm = {
        name: generateFormName(prompt, formType),
        description: generateFormDescription(prompt, formType, industry),
        fields: generateFormFields(prompt, formType, industry, complexity),
        category: formType || "General",
        confidence: 0.85 + Math.random() * 0.1,
        suggestions: generateSuggestions(prompt, formType, industry),
      }

      setGeneratedForm(mockForm)

      toast({
        title: "Form Generated Successfully",
        description: `Created a ${mockForm.fields.length}-field form with ${Math.round(mockForm.confidence * 100)}% confidence.`,
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFormName = (prompt: string, type: string): string => {
    if (type) return type
    if (prompt.toLowerCase().includes("contact")) return "Contact Form"
    if (prompt.toLowerCase().includes("registration")) return "Registration Form"
    if (prompt.toLowerCase().includes("application")) return "Application Form"
    if (prompt.toLowerCase().includes("survey")) return "Survey Form"
    return "Custom Form"
  }

  const generateFormDescription = (prompt: string, type: string, industry: string): string => {
    const descriptions = {
      "Contact Form": `A professional contact form for ${industry || "general"} inquiries`,
      "Registration Form": `User registration form tailored for ${industry || "general"} services`,
      "Application Form": `Comprehensive application form for ${industry || "general"} processes`,
      "Survey Form": `Data collection survey for ${industry || "general"} research`,
    }
    return descriptions[type as keyof typeof descriptions] || `Custom form based on: ${prompt}`
  }

  const generateFormFields = (prompt: string, type: string, industry: string, complexity: string): AIFormField[] => {
    const baseFields: AIFormField[] = [
      {
        id: "1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        description: "Legal name as per official documents",
      },
      {
        id: "2",
        type: "email",
        label: "Email Address",
        placeholder: "your.email@example.com",
        required: true,
        validation: "email",
        description: "We'll use this to contact you",
      },
    ]

    // Add fields based on form type and industry
    if (type === "Contact Form") {
      baseFields.push(
        {
          id: "3",
          type: "tel",
          label: "Phone Number",
          placeholder: "+1 (555) 123-4567",
          required: false,
          validation: "phone",
        },
        {
          id: "4",
          type: "select",
          label: "Subject",
          required: true,
          description: "What is this regarding?",
        },
        {
          id: "5",
          type: "textarea",
          label: "Message",
          placeholder: "Please describe your inquiry...",
          required: true,
          description: "Provide details about your request",
        },
      )
    }

    if (industry === "Healthcare") {
      baseFields.push(
        {
          id: "6",
          type: "date",
          label: "Date of Birth",
          required: true,
          description: "Required for medical records",
        },
        {
          id: "7",
          type: "text",
          label: "Insurance Provider",
          placeholder: "Blue Cross Blue Shield",
          required: false,
        },
      )
    }

    if (industry === "Banking & Finance") {
      baseFields.push(
        {
          id: "6",
          type: "text",
          label: "Social Security Number",
          placeholder: "XXX-XX-XXXX",
          required: true,
          validation: "ssn",
          description: "Required for identity verification",
        },
        {
          id: "7",
          type: "number",
          label: "Annual Income",
          placeholder: "50000",
          required: true,
          description: "Gross annual income in USD",
        },
      )
    }

    if (complexity === "complex") {
      baseFields.push(
        {
          id: "8",
          type: "file",
          label: "Supporting Documents",
          required: false,
          description: "Upload any relevant documents",
        },
        {
          id: "9",
          type: "checkbox",
          label: "Terms and Conditions",
          required: true,
          description: "I agree to the terms and conditions",
        },
      )
    }

    return baseFields
  }

  const generateSuggestions = (prompt: string, type: string, industry: string): string[] => {
    const suggestions = [
      "Consider adding a CAPTCHA field to prevent spam submissions",
      "Add field validation to ensure data quality",
      "Include a confirmation email field for important forms",
      "Consider making phone number required for urgent inquiries",
    ]

    if (industry === "Healthcare") {
      suggestions.push("Add emergency contact information field")
      suggestions.push("Include medical history or allergies section")
    }

    if (industry === "Banking & Finance") {
      suggestions.push("Implement strong data encryption for sensitive fields")
      suggestions.push("Add identity verification steps")
    }

    return suggestions.slice(0, 3)
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

  const copyFormCode = () => {
    if (!generatedForm) return

    const htmlCode = `
<form class="ai-generated-form">
  <h2>${generatedForm.name}</h2>
  <p>${generatedForm.description}</p>
  
  ${generatedForm.fields
    .map(
      (field) => `
  <div class="form-field">
    <label for="${field.id}">${field.label}${field.required ? " *" : ""}</label>
    ${
      field.type === "textarea"
        ? `<textarea id="${field.id}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""}></textarea>`
        : field.type === "select"
          ? `<select id="${field.id}" ${field.required ? "required" : ""}>
      <option value="">Select an option</option>
    </select>`
          : `<input type="${field.type}" id="${field.id}" placeholder="${field.placeholder || ""}" ${field.required ? "required" : ""} />`
    }
    ${field.description ? `<small>${field.description}</small>` : ""}
  </div>`,
    )
    .join("")}
  
  <button type="submit">Submit</button>
</form>
    `.trim()

    navigator.clipboard.writeText(htmlCode)
    toast({
      title: "Code Copied",
      description: "HTML form code has been copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              AI Form Generator
            </h1>
            <p className="text-muted-foreground">
              Describe your form requirements and let AI create the perfect form for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Form Requirements
                  </CardTitle>
                  <CardDescription>Describe what kind of form you need</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Form Description *</Label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="I need a contact form for my healthcare clinic that collects patient information including name, email, phone, date of birth, and reason for visit..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formType">Form Type</Label>
                    <Select value={formType} onValueChange={setFormType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form type (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {formTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complexity">Complexity Level</Label>
                    <Select value={complexity} onValueChange={setComplexity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (3-5 fields)</SelectItem>
                        <SelectItem value="medium">Medium (6-10 fields)</SelectItem>
                        <SelectItem value="complex">Complex (10+ fields)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={generateForm} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Generate Form
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* AI Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    AI Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Be specific about the data you need to collect</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Mention any validation requirements</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Include the purpose or context of the form</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Specify any compliance requirements</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated Form Display */}
            <div className="lg:col-span-2 space-y-6">
              {generatedForm ? (
                <>
                  {/* Form Header */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Wand2 className="w-5 h-5" />
                            {generatedForm.name}
                          </CardTitle>
                          <CardDescription>{generatedForm.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{Math.round(generatedForm.confidence * 100)}% confidence</Badge>
                          <Badge variant="outline">{generatedForm.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button onClick={exportForm} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export JSON
                        </Button>
                        <Button onClick={copyFormCode} variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy HTML
                        </Button>
                        <Button onClick={generateForm} variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Form Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Preview</CardTitle>
                      <CardDescription>Preview of your AI-generated form</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-w-2xl">
                        {generatedForm.fields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            <Label htmlFor={field.id}>
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {field.type === "textarea" ? (
                              <Textarea id={field.id} placeholder={field.placeholder} rows={3} disabled />
                            ) : field.type === "select" ? (
                              <Select disabled>
                                <SelectTrigger>
                                  <SelectValue placeholder={field.placeholder || "Select an option"} />
                                </SelectTrigger>
                              </Select>
                            ) : field.type === "checkbox" ? (
                              <div className="flex items-center space-x-2">
                                <input type="checkbox" id={field.id} disabled />
                                <Label htmlFor={field.id} className="text-sm">
                                  {field.description || field.label}
                                </Label>
                              </div>
                            ) : (
                              <Input type={field.type} id={field.id} placeholder={field.placeholder} disabled />
                            )}
                            {field.description && field.type !== "checkbox" && (
                              <p className="text-xs text-muted-foreground">{field.description}</p>
                            )}
                          </div>
                        ))}
                        <Button className="w-full" disabled>
                          Submit Form
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Suggestions */}
                  {generatedForm.suggestions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          AI Suggestions
                        </CardTitle>
                        <CardDescription>Recommendations to improve your form</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {generatedForm.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                /* Empty State */
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
