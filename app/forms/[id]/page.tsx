import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wand2 } from "lucide-react"
import { AIFormField } from "../../ai-forms/types"

interface PublicFormPageProps {
    params: {
        id: string
    }
}

export default async function PublicFormPage({ params }: PublicFormPageProps) {
    const form = await prisma.form.findUnique({
        where: { id: params.id },
    })

    if (!form) {
        notFound()
    }

    const fields = form.fields as unknown as AIFormField[]

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Form Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Wand2 className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">{form.description}</p>
                </div>

                {/* Form Card */}
                <Card className="border-t-4 border-t-primary shadow-lg">
                    <CardHeader>
                        <CardTitle>Form Details</CardTitle>
                        <CardDescription>Please fill out the following information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            {fields.map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <Label htmlFor={field.id} className="text-base">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>

                                    {field.type === "textarea" ? (
                                        <Textarea
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            rows={4}
                                        />
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
                                            <input
                                                type="checkbox"
                                                id={field.id}
                                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <Label htmlFor={field.id} className="font-normal text-base cursor-pointer">
                                                {field.description || field.label}
                                            </Label>
                                        </div>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="h-11"
                                        />
                                    )}

                                    {field.description && field.type !== "checkbox" && (
                                        <p className="text-sm text-muted-foreground">{field.description}</p>
                                    )}
                                </div>
                            ))}

                            <div className="pt-4">
                                <Button type="submit" className="w-full h-11 text-base">
                                    Submit Form
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Powered by NOREL AI Framework
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
