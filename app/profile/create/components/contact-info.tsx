import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { ProfileFormData } from "../types"

interface ContactInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
    copyPermanentToCurrent: () => void;
}

export function ContactAddress({ formData, handleInputChange, copyPermanentToCurrent }: ContactInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Contact & Address Details
                </CardTitle>
                <CardDescription>Permanent and current address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium">Permanent Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="permanentAddress">Street Address *</Label>
                            <Input
                                id="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                                placeholder="123 Main Street"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanentCity">City *</Label>
                            <Input
                                id="permanentCity"
                                value={formData.permanentCity}
                                onChange={(e) => handleInputChange("permanentCity", e.target.value)}
                                placeholder="New York"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanentState">State *</Label>
                            <Input
                                id="permanentState"
                                value={formData.permanentState}
                                onChange={(e) => handleInputChange("permanentState", e.target.value)}
                                placeholder="NY"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanentZip">ZIP Code *</Label>
                            <Input
                                id="permanentZip"
                                value={formData.permanentZip}
                                onChange={(e) => handleInputChange("permanentZip", e.target.value)}
                                placeholder="10001"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="permanentCountry">Country</Label>
                            <Input
                                id="permanentCountry"
                                value={formData.permanentCountry}
                                onChange={(e) => handleInputChange("permanentCountry", e.target.value)}
                                placeholder="India / United States"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="residenceType">Residence Type</Label>
                            <Select
                                value={formData.residenceType}
                                onValueChange={(value) => handleInputChange("residenceType", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="owned">Own</SelectItem>
                                    <SelectItem value="rented">Rented</SelectItem>
                                    <SelectItem value="family">Family Property</SelectItem>
                                    <SelectItem value="company">Company Provided</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yearsAtCurrentAddress">Years at Current Address</Label>
                        <Input
                            id="yearsAtCurrentAddress"
                            type="number"
                            value={formData.yearsAtCurrentAddress}
                            onChange={(e) => handleInputChange("yearsAtCurrentAddress", e.target.value)}
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input
                                id="sameAsPermanent"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        copyPermanentToCurrent()
                                    }
                                }}
                            />
                            <Label htmlFor="sameAsPermanent" className="text-sm font-medium">Same as Permanent Address</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={copyPermanentToCurrent}
                                className="ml-auto"
                            >
                                Copy Permanent
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="currentAddress">Street Address</Label>
                            <Input
                                id="currentAddress"
                                value={formData.currentAddress}
                                onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                                placeholder="456 Current Street"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentCity">City</Label>
                            <Input
                                id="currentCity"
                                value={formData.currentCity}
                                onChange={(e) => handleInputChange("currentCity", e.target.value)}
                                placeholder="Boston"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentState">State</Label>
                            <Input
                                id="currentState"
                                value={formData.currentState}
                                onChange={(e) => handleInputChange("currentState", e.target.value)}
                                placeholder="MA"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentZip">ZIP Code</Label>
                            <Input
                                id="currentZip"
                                value={formData.currentZip}
                                onChange={(e) => handleInputChange("currentZip", e.target.value)}
                                placeholder="02101"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentCountry">Country</Label>
                            <Input
                                id="currentCountry"
                                value={formData.currentCountry}
                                onChange={(e) => handleInputChange("currentCountry", e.target.value)}
                                placeholder="India / United States"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="primaryPhone">Primary Phone *</Label>
                        <Input
                            id="primaryPhone"
                            type="tel"
                            value={formData.primaryPhone}
                            onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alternatePhone">Alternate Phone</Label>
                        <Input
                            id="alternatePhone"
                            type="tel"
                            value={formData.alternatePhone}
                            onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                            placeholder="+1 (555) 987-6543"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alternateEmail">Alternate Email</Label>
                        <Input
                            id="alternateEmail"
                            type="email"
                            value={formData.alternateEmail}
                            onChange={(e) => handleInputChange("alternateEmail", e.target.value)}
                            placeholder="john.alternate@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="communicationPreference">Communication Preference</Label>
                        <Select
                            value={formData.communicationPreference}
                            onValueChange={(value) => handleInputChange("communicationPreference", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                                <SelectItem value="postal">Postal Mail</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
