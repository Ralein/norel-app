"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Monitor, Scan, FileText, Download, CheckCircle, AlertCircle } from "lucide-react"

interface ReceivedProfile {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  timestamp: number
}

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "date"
  required: boolean
  value: string
}

export default function KioskPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [receivedProfile, setReceivedProfile] = useState<ReceivedProfile | null>(null)
  const [selectedForm, setSelectedForm] = useState<string>("bank-account")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Form templates
  const formTemplates = {
    "bank-account": {
      name: "Bank Account Application",
      fields: [
        { id: "fullName", label: "Full Name", type: "text" as const, required: true },
        { id: "email", label: "Email Address", type: "email" as const, required: true },
        { id: "phone", label: "Phone Number", type: "tel" as const, required: true },
        { id: "dateOfBirth", label: "Date of Birth", type: "date" as const, required: true },
        { id: "address", label: "Street Address", type: "text" as const, required: true },
        { id: "city", label: "City", type: "text" as const, required: true },
        { id: "state", label: "State", type: "text" as const, required: true },
        { id: "zipCode", label: "ZIP Code", type: "text" as const, required: true },
        { id: "employmentStatus", label: "Employment Status", type: "text" as const, required: false },
        { id: "annualIncome", label: "Annual Income", type: "text" as const, required: false },
      ],
    },
    "medical-registration": {
      name: "Medical Registration",
      fields: [
        { id: "fullName", label: "Full Name", type: "text" as const, required: true },
        { id: "dateOfBirth", label: "Date of Birth", type: "date" as const, required: true },
        { id: "phone", label: "Phone Number", type: "tel" as const, required: true },
        { id: "email", label: "Email Address", type: "email" as const, required: false },
        { id: "address", label: "Address", type: "text" as const, required: true },
        { id: "emergencyContact", label: "Emergency Contact", type: "text" as const, required: true },
        { id: "emergencyPhone", label: "Emergency Phone", type: "tel" as const, required: true },
        { id: "insuranceProvider", label: "Insurance Provider", type: "text" as const, required: false },
        { id: "policyNumber", label: "Policy Number", type: "text" as const, required: false },
      ],
    },
    "government-service": {
      name: "Government Service Application",
      fields: [
        { id: "fullName", label: "Full Legal Name", type: "text" as const, required: true },
        { id: "dateOfBirth", label: "Date of Birth", type: "date" as const, required: true },
        { id: "email", label: "Email Address", type: "email" as const, required: true },
        { id: "phone", label: "Phone Number", type: "tel" as const, required: true },
        { id: "address", label: "Residential Address", type: "text" as const, required: true },
        { id: "city", label: "City", type: "text" as const, required: true },
        { id: "state", label: "State", type: "text" as const, required: true },
        { id: "zipCode", label: "ZIP Code", type: "text" as const, required: true },
        { id: "citizenship", label: "Citizenship Status", type: "text" as const, required: true },
      ],
    },
  }

  useEffect(() => {
    // Check for shared profile data in URL
    const data = searchParams.get("data")
    if (data) {
      try {
        const decodedData = atob(data)
        const profileData = JSON.parse(decodedData)

        // Check if data is not too old (24 hours)
        const now = Date.now()
        const dataAge = now - profileData.timestamp
        const maxAge = 24 * 60 * 60 * 1000 // 24 hours

        if (dataAge > maxAge) {
          toast({
            title: "Expired Data",
            description: "The shared profile data has expired. Please generate a new QR code.",
            variant: "destructive",
          })
          return
        }

        setReceivedProfile(profileData)
        toast({
          title: "Profile Received",
          description: `Successfully loaded profile for ${profileData.name}`,
        })
      } catch (error) {
        toast({
          title: "Invalid Data",
          description: "Failed to decode profile data. Please try again.",
          variant: "destructive",
        })
      }
    }
  }, [searchParams, toast])

  useEffect(() => {
    // Initialize form fields when form template changes
    const template = formTemplates[selectedForm as keyof typeof formTemplates]
    if (template) {
      const fields = template.fields.map((field) => ({
        ...field,
        value: "",
      }))
      setFormFields(fields)
    }
  }, [selectedForm])

  const autoFillForm = () => {
    if (!receivedProfile) return

    const updatedFields = formFields.map((field) => {
      let value = ""

      // Map profile data to form fields
      switch (field.id) {
        case "fullName":
          value = receivedProfile.name
          break
        case "email":
          value = receivedProfile.email
          break
        case "phone":
          value = receivedProfile.phone
          break
        case "dateOfBirth":
          value = receivedProfile.dateOfBirth
          break
        case "address":
          value = receivedProfile.address
          break
        case "city":
          value = receivedProfile.city
          break
        case "state":
          value = receivedProfile.state
          break
        case "zipCode":
          value = receivedProfile.zipCode
          break
        default:
          value = field.value // Keep existing value
      }

      return { ...field, value }
    })

    setFormFields(updatedFields)

    toast({
      title: "Form Auto-filled",
      description: "Profile data has been automatically filled into the form",
    })
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormFields((prev) => prev.map((field) => (field.id === fieldId ? { ...field, value } : field)))
  }

  const generatePDF = async () => {
    setIsProcessing(true)

    try {
      // Simulate PDF generation (in real app, this would call a backend service)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a simple text-based "PDF" content
      const formData = formFields.reduce(
        (acc, field) => {
          acc[field.label] = field.value
          return acc
        },
        {} as Record<string, string>,
      )

      const pdfContent = `
NOREL - ${formTemplates[selectedForm as keyof typeof formTemplates].name}
Generated: ${new Date().toLocaleString()}

${Object.entries(formData)
  .filter(([_, value]) => value.trim() !== "")
  .map(([label, value]) => `${label}: ${value}`)
  .join("\n")}

---
Generated by NOREL Identity System
      `.trim()

      // Create and download the file
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${selectedForm}-${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Document Generated",
        description: "Form data has been exported successfully",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Monitor className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">NOREL Kiosk</h1>
                <p className="text-muted-foreground">Receive and process shared identity profiles</p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Profile Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {receivedProfile ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Profile Received:</strong> {receivedProfile.name} ({receivedProfile.email})
                    <br />
                    <span className="text-sm text-muted-foreground">
                      Received at {new Date(receivedProfile.timestamp).toLocaleString()}
                    </span>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>No Profile Data:</strong> Scan a QR code or tap an NFC device to receive profile data.
                    <br />
                    <span className="text-sm text-muted-foreground">
                      You can also test with the form below using manual entry.
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Selection */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Template</CardTitle>
                  <CardDescription>Select the type of form to fill</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedForm} onValueChange={setSelectedForm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(formTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {receivedProfile && (
                <Card>
                  <CardHeader>
                    <CardTitle>Auto-fill</CardTitle>
                    <CardDescription>Use received profile data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={autoFillForm} className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Fill Form Automatically
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={generatePDF} disabled={isProcessing} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    {isProcessing ? "Generating..." : "Generate Document"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormFields((prev) => prev.map((field) => ({ ...field, value: "" })))
                      toast({ title: "Form Cleared", description: "All fields have been reset" })
                    }}
                    className="w-full"
                  >
                    Clear Form
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {formTemplates[selectedForm as keyof typeof formTemplates]?.name}
                  </CardTitle>
                  <CardDescription>Fill out the form below or use auto-fill with received profile data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Input
                          id={field.id}
                          type={field.type}
                          value={field.value}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          required={field.required}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      </div>
                    ))}

                    {formFields.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">Select a form template to begin</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
