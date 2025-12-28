import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileFormData } from "../types"

interface LegalInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function LegalCompliance({ formData, handleInputChange }: LegalInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Legal & Compliance</CardTitle>
                <CardDescription>Legal history and compliance information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="criminalRecord">Criminal Record</Label>
                        <Select
                            value={formData.criminalRecord}
                            onValueChange={(value) => handleInputChange("criminalRecord", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="minor">Minor Offenses</SelectItem>
                                <SelectItem value="major">Major Offenses</SelectItem>
                                <SelectItem value="pending">Cases Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pendingLitigation">Pending Litigation</Label>
                        <Select
                            value={formData.pendingLitigation}
                            onValueChange={(value) => handleInputChange("pendingLitigation", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="civil">Civil Cases</SelectItem>
                                <SelectItem value="criminal">Criminal Cases</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="bankruptcyHistory">Bankruptcy History</Label>
                        <Select
                            value={formData.bankruptcyHistory}
                            onValueChange={(value) => handleInputChange("bankruptcyHistory", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="past">Past Bankruptcy</SelectItem>
                                <SelectItem value="current">Current Proceedings</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="taxCompliance">Tax Compliance</Label>
                        <Select
                            value={formData.taxCompliance}
                            onValueChange={(value) => handleInputChange("taxCompliance", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="compliant">Fully Compliant</SelectItem>
                                <SelectItem value="pending">Returns Pending</SelectItem>
                                <SelectItem value="issues">Tax Issues</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="politicalExposure">Political Exposure</Label>
                        <Select
                            value={formData.politicalExposure}
                            onValueChange={(value) => handleInputChange("politicalExposure", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="self">Self</SelectItem>
                                <SelectItem value="family">Family Member</SelectItem>
                                <SelectItem value="associate">Close Associate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
