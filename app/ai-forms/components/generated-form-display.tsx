import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Wand2,
    Download,
    Copy,
    RefreshCw,
    AlertCircle,
    Brain,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

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
    ${field.type === "textarea"
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
                        <Button onClick={onGenerate} variant="outline" size="sm">
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
    )
}
