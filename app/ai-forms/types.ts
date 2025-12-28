export interface AIFormField {
    id: string
    type: string
    label: string
    placeholder?: string
    required: boolean
    validation?: string
    description?: string
}

export interface GeneratedForm {
    name: string
    description: string
    fields: AIFormField[]
    category: string
    confidence: number
    suggestions: string[]
}
