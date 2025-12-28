import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ProfileFormData } from "../types"

interface AdditionalInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function AdditionalFields({ formData, handleInputChange }: AdditionalInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Other preferences and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="formCategory">Form Category</Label>
                        <Select
                            value={formData.formCategory}
                            onValueChange={(value) => handleInputChange("formCategory", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="banking">Banking & Finance</SelectItem>
                                <SelectItem value="medical">Medical & Health</SelectItem>
                                <SelectItem value="government">Government & Legal</SelectItem>
                                <SelectItem value="insurance">Insurance</SelectItem>
                                <SelectItem value="employment">Employment</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="travel">Travel & Visa</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="preferredLanguage">Preferred Language</Label>
                        <Select
                            value={formData.preferredLanguage}
                            onValueChange={(value) => handleInputChange("preferredLanguage", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="hindi">Hindi</SelectItem>
                                <SelectItem value="tamil">Tamil</SelectItem>
                                <SelectItem value="telugu">Telugu</SelectItem>
                                <SelectItem value="marathi">Marathi</SelectItem>
                                <SelectItem value="bengali">Bengali</SelectItem>
                                <SelectItem value="gujarati">Gujarati</SelectItem>
                                <SelectItem value="kannada">Kannada</SelectItem>
                                <SelectItem value="malayalam">Malayalam</SelectItem>
                                <SelectItem value="punjabi">Punjabi</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="german">German</SelectItem>
                                <SelectItem value="chinese">Chinese</SelectItem>
                                <SelectItem value="arabic">Arabic</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                        id="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                        placeholder="Any additional information, special requirements, or notes that might be relevant for form filling"
                        rows={4}
                    />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Data Security & Privacy</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                        Your information is encrypted and stored securely. Only you can access your profile data, and it will only be used for the forms you explicitly choose to generate.
                    </p>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="privacyConsent"
                            required
                            className="rounded border-gray-300"
                        />
                        <Label htmlFor="privacyConsent" className="text-sm">
                            I agree to the Terms of Service and Privacy Policy, and consent to the secure storage and processing of my personal information for form generation purposes only.
                        </Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
