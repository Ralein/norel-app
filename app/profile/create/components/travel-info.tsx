import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ProfileFormData } from "../types"

interface TravelInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function TravelVisa({ formData, handleInputChange }: TravelInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Travel & Visa Information</CardTitle>
                <CardDescription>International travel and visa details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="visaStatus">Visa Status</Label>
                        <Select
                            value={formData.visaStatus}
                            onValueChange={(value) => handleInputChange("visaStatus", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="citizen">Citizen</SelectItem>
                                <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                                <SelectItem value="work-visa">Work Visa</SelectItem>
                                <SelectItem value="student-visa">Student Visa</SelectItem>
                                <SelectItem value="tourist-visa">Tourist Visa</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="visaCountries">Countries with Valid Visa</Label>
                        <Input
                            id="visaCountries"
                            value={formData.visaCountries}
                            onChange={(e) => handleInputChange("visaCountries", e.target.value)}
                            placeholder="USA, UK, Canada"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="travelHistory">Travel History</Label>
                        <Textarea
                            id="travelHistory"
                            value={formData.travelHistory}
                            onChange={(e) => handleInputChange("travelHistory", e.target.value)}
                            placeholder="Countries visited, dates of travel"
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="internationalAddress">International Address</Label>
                        <Textarea
                            id="internationalAddress"
                            value={formData.internationalAddress}
                            onChange={(e) => handleInputChange("internationalAddress", e.target.value)}
                            placeholder="Address in foreign country (if applicable)"
                            rows={3}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
