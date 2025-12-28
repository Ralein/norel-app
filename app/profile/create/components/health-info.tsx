import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart } from "lucide-react"
import { ProfileFormData } from "../types"

interface HealthInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function HealthInsurance({ formData, handleInputChange }: HealthInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Health & Insurance
                </CardTitle>
                <CardDescription>Medical and insurance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="healthInsuranceProvider">Health Insurance Provider</Label>
                        <Input
                            id="healthInsuranceProvider"
                            value={formData.healthInsuranceProvider}
                            onChange={(e) => handleInputChange("healthInsuranceProvider", e.target.value)}
                            placeholder="Blue Cross Blue Shield"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="healthPolicyNumber">Policy Number</Label>
                        <Input
                            id="healthPolicyNumber"
                            value={formData.healthPolicyNumber}
                            onChange={(e) => handleInputChange("healthPolicyNumber", e.target.value)}
                            placeholder="POL123456789"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sumInsured">Sum Insured (₹)</Label>
                        <Input
                            id="sumInsured"
                            type="number"
                            value={formData.sumInsured}
                            onChange={(e) => handleInputChange("sumInsured", e.target.value)}
                            placeholder="500000"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="policyStartDate">Policy Start Date</Label>
                        <Input
                            id="policyStartDate"
                            type="date"
                            value={formData.policyStartDate}
                            onChange={(e) => handleInputChange("policyStartDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="policyEndDate">Policy End Date</Label>
                        <Input
                            id="policyEndDate"
                            type="date"
                            value={formData.policyEndDate}
                            onChange={(e) => handleInputChange("policyEndDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                        placeholder="Previous surgeries, chronic conditions, etc."
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Textarea
                            id="allergies"
                            value={formData.allergies}
                            onChange={(e) => handleInputChange("allergies", e.target.value)}
                            placeholder="Food allergies, drug allergies, etc."
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ongoingMedications">Ongoing Medications</Label>
                        <Textarea
                            id="ongoingMedications"
                            value={formData.ongoingMedications}
                            onChange={(e) => handleInputChange("ongoingMedications", e.target.value)}
                            placeholder="Current medications and dosages"
                            rows={2}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
                        <Textarea
                            id="previousSurgeries"
                            value={formData.previousSurgeries}
                            onChange={(e) => handleInputChange("previousSurgeries", e.target.value)}
                            placeholder="Any past surgical procedures"
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="familyMedicalHistory">Family Medical History</Label>
                        <Textarea
                            id="familyMedicalHistory"
                            value={formData.familyMedicalHistory}
                            onChange={(e) => handleInputChange("familyMedicalHistory", e.target.value)}
                            placeholder="Hereditary conditions, family health history"
                            rows={2}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="smokingHabits">Smoking Habits</Label>
                        <Select
                            value={formData.smokingHabits}
                            onValueChange={(value) => handleInputChange("smokingHabits", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select habit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="never">Never Smoked</SelectItem>
                                <SelectItem value="former">Former Smoker</SelectItem>
                                <SelectItem value="occasional">Occasional</SelectItem>
                                <SelectItem value="regular">Regular</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="drinkingHabits">Drinking Habits</Label>
                        <Select
                            value={formData.drinkingHabits}
                            onValueChange={(value) => handleInputChange("drinkingHabits", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select habit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="never">Never</SelectItem>
                                <SelectItem value="social">Social Drinker</SelectItem>
                                <SelectItem value="occasional">Occasional</SelectItem>
                                <SelectItem value="regular">Regular</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="exerciseRoutine">Exercise Routine</Label>
                        <Input
                            id="exerciseRoutine"
                            value={formData.exerciseRoutine}
                            onChange={(e) => handleInputChange("exerciseRoutine", e.target.value)}
                            placeholder="Daily walking, gym 3x week"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="dataConsent"
                        checked={formData.dataConsent}
                        onChange={(e) => handleInputChange("dataConsent", e.target.checked.toString())}
                        className="rounded border-gray-300"
                    />
                    <Label htmlFor="dataConsent" className="text-sm">
                        I consent to sharing my health data with authorized healthcare providers
                    </Label>
                </div>
            </CardContent>
        </Card>
    )
}
