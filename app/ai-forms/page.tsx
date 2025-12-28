"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  Sparkles,
  Loader2,
  Lightbulb,
  CheckCircle,
} from "lucide-react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { AIFormField, GeneratedForm } from "./types"
import { generateForm as generateFormAction } from "../actions/generate-form"

const GeneratedFormDisplay = dynamic(() => import("./components/generated-form-display").then(mod => mod.GeneratedFormDisplay), {
  loading: () => <Skeleton className="w-full h-[600px] rounded-lg" />,
})


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
      const form = await generateFormAction(prompt, formType, industry, complexity);
      setGeneratedForm(form)

      toast({
        title: "Form Generated Successfully",
        description: `Created a ${form.fields.length}-field form with ${Math.round(form.confidence * 100)}% confidence.`,
      })
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Remove mock generation helper functions as they are no longer needed
  // ...


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
              <GeneratedFormDisplay
                generatedForm={generatedForm}
                prompt={prompt}
                formType={formType}
                industry={industry}
                complexity={complexity}
                onGenerate={generateForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
