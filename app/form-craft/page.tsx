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
  Wand2,
  Trash2,
  Eye,
  Save,
  Download,
  Copy,
  Type,
  Mail,
  Phone,
  Calendar,
  Hash,
  ToggleLeft,
  List,
  FileText,
  Image,
  DotIcon as DragHandleDots2,
} from "lucide-react"

interface FormField {
  id: string
  type: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select" | "checkbox" | "radio" | "file"
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: string
}

interface FormTemplate {
  id: string
  name: string
  description: string
  fields: FormField[]
  createdAt: string
}

export default function FormCraftPage() {
  const { toast } = useToast()
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [fields, setFields] = useState<FormField[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const [draggedField, setDraggedField] = useState<string | null>(null)

  const fieldTypes = [
    { type: "text", label: "Text Input", icon: Type },
    { type: "email", label: "Email", icon: Mail },
    { type: "tel", label: "Phone", icon: Phone },
    { type: "date", label: "Date", icon: Calendar },
    { type: "number", label: "Number", icon: Hash },
    { type: "textarea", label: "Text Area", icon: FileText },
    { type: "select", label: "Dropdown", icon: List },
    { type: "checkbox", label: "Checkbox", icon: ToggleLeft },
    { type: "radio", label: "Radio", icon: ToggleLeft },
    { type: "file", label: "File Upload", icon: Image },
  ]

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: type === "textarea" ? "Enter your message..." : `Enter ${type}...`,
      required: false,
      options: type === "select" || type === "radio" ? ["Option 1", "Option 2", "Option 3"] : undefined,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields]
    const [movedField] = newFields.splice(fromIndex, 1)
    newFields.splice(toIndex, 0, movedField)
    setFields(newFields)
  }

  const saveForm = () => {
    if (!formName.trim()) {
      toast({
        title: "Form Name Required",
        description: "Please enter a name for your form.",
        variant: "destructive",
      })
      return
    }

    if (fields.length === 0) {
      toast({
        title: "No Fields Added",
        description: "Please add at least one field to your form.",
        variant: "destructive",
      })
      return
    }

    const formTemplate: FormTemplate = {
      id: Date.now().toString(),
      name: formName,
      description: formDescription,
      fields,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const existingForms = JSON.parse(localStorage.getItem("form-craft-templates") || "[]")
    existingForms.push(formTemplate)
    localStorage.setItem("form-craft-templates", JSON.stringify(existingForms))

    toast({
      title: "Form Saved",
      description: "Your form template has been saved successfully.",
    })

    // Reset form
    setFormName("")
    setFormDescription("")
    setFields([])
  }

  const exportForm = () => {
    const formData = {
      name: formName,
      description: formDescription,
      fields,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formName.replace(/\s+/g, "-").toLowerCase()}-form.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Form Exported",
      description: "Form template has been downloaded as JSON.",
    })
  }

  const renderFieldPreview = (field: FormField) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full",
    }

    switch (field.type) {
      case "textarea":
        return <Textarea {...commonProps} rows={3} />
      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" id={field.id} className="rounded" />
            <label htmlFor={field.id} className="text-sm">
              {field.label}
            </label>
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" id={`${field.id}-${index}`} name={field.id} className="rounded" />
                <label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      case "file":
        return <Input type="file" {...commonProps} />
      default:
        return <Input type={field.type} {...commonProps} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Wand2 className="w-8 h-8 text-primary" />
              Form-Craft
            </h1>
            <p className="text-muted-foreground">Build custom forms with drag-and-drop simplicity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Form Builder */}
            <div className="lg:col-span-3 space-y-6">
              {/* Form Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Settings</CardTitle>
                  <CardDescription>Configure your form's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="formName">Form Name *</Label>
                      <Input
                        id="formName"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Contact Form"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formDescription">Description</Label>
                      <Input
                        id="formDescription"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="A simple contact form"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Fields */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Form Fields</CardTitle>
                      <CardDescription>Add and configure form fields</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                        <Eye className="w-4 h-4 mr-2" />
                        {previewMode ? "Edit" : "Preview"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {previewMode ? (
                    /* Preview Mode */
                    <div className="space-y-6">
                      <div className="text-center py-4 border-b">
                        <h3 className="text-xl font-bold">{formName || "Untitled Form"}</h3>
                        {formDescription && <p className="text-muted-foreground">{formDescription}</p>}
                      </div>
                      <div className="space-y-4">
                        {fields.map((field) => (
                          <div key={field.id} className="space-y-2">
                            {field.type !== "checkbox" && (
                              <Label htmlFor={field.id}>
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                            )}
                            {renderFieldPreview(field)}
                          </div>
                        ))}
                        {fields.length > 0 && <Button className="w-full">Submit Form</Button>}
                      </div>
                    </div>
                  ) : (
                    /* Edit Mode */
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="border rounded-lg p-4 space-y-4"
                          draggable
                          onDragStart={() => setDraggedField(field.id)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            if (draggedField) {
                              const fromIndex = fields.findIndex((f) => f.id === draggedField)
                              moveField(fromIndex, index)
                              setDraggedField(null)
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DragHandleDots2 className="w-4 h-4 text-muted-foreground cursor-move" />
                              <Badge variant="outline">{field.type}</Badge>
                              <span className="font-medium">{field.label}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeField(field.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Field Label</Label>
                              <Input
                                value={field.label}
                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Placeholder</Label>
                              <Input
                                value={field.placeholder || ""}
                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                              />
                            </div>
                          </div>

                          {(field.type === "select" || field.type === "radio") && (
                            <div className="space-y-2">
                              <Label>Options (one per line)</Label>
                              <Textarea
                                value={field.options?.join("\n") || ""}
                                onChange={(e) =>
                                  updateField(field.id, { options: e.target.value.split("\n").filter(Boolean) })
                                }
                                rows={3}
                              />
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`required-${field.id}`}
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            />
                            <Label htmlFor={`required-${field.id}`}>Required field</Label>
                          </div>
                        </div>
                      ))}

                      {fields.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No fields added yet. Start building your form by adding fields from the sidebar.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Field Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Field Types</CardTitle>
                  <CardDescription>Drag or click to add fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {fieldTypes.map((fieldType) => {
                      const Icon = fieldType.icon
                      return (
                        <Button
                          key={fieldType.type}
                          variant="outline"
                          className="justify-start h-auto p-3 bg-transparent"
                          onClick={() => addField(fieldType.type as FormField["type"])}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          <div className="text-left">
                            <div className="font-medium">{fieldType.label}</div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={saveForm} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Form
                  </Button>
                  <Button
                    onClick={exportForm}
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={fields.length === 0}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" disabled={fields.length === 0}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy HTML
                  </Button>
                </CardContent>
              </Card>

              {/* Form Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Fields:</span>
                    <span className="font-medium">{fields.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Required Fields:</span>
                    <span className="font-medium">{fields.filter((f) => f.required).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Optional Fields:</span>
                    <span className="font-medium">{fields.filter((f) => !f.required).length}</span>
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
