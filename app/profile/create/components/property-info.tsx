import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ProfileFormData } from "../types"

interface PropertyInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function PropertyAssets({ formData, handleInputChange }: PropertyInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Property & Assets</CardTitle>
                <CardDescription>Real estate and investment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="propertyOwned">Property Owned</Label>
                        <Select
                            value={formData.propertyOwned}
                            onValueChange={(value) => handleInputChange("propertyOwned", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                                <SelectItem value="land">Land Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="propertyValue">Property Value (₹)</Label>
                        <Input
                            id="propertyValue"
                            type="number"
                            value={formData.propertyValue}
                            onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                            placeholder="2500000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicleOwned">Vehicle Owned</Label>
                        <Input
                            id="vehicleOwned"
                            value={formData.vehicleOwned}
                            onChange={(e) => handleInputChange("vehicleOwned", e.target.value)}
                            placeholder="Car, Bike, etc."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="propertyAddress">Property Address</Label>
                        <Textarea
                            id="propertyAddress"
                            value={formData.propertyAddress}
                            onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                            placeholder="Complete address of owned property"
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
                        <Input
                            id="vehicleRegistration"
                            value={formData.vehicleRegistration}
                            onChange={(e) => handleInputChange("vehicleRegistration", e.target.value)}
                            placeholder="MH01AB1234"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="vehicleInsurance">Vehicle Insurance</Label>
                        <Input
                            id="vehicleInsurance"
                            value={formData.vehicleInsurance}
                            onChange={(e) => handleInputChange("vehicleInsurance", e.target.value)}
                            placeholder="Policy number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fixedDeposits">Fixed Deposits (₹)</Label>
                        <Input
                            id="fixedDeposits"
                            type="number"
                            value={formData.fixedDeposits}
                            onChange={(e) => handleInputChange("fixedDeposits", e.target.value)}
                            placeholder="100000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mutualFunds">Mutual Funds (₹)</Label>
                        <Input
                            id="mutualFunds"
                            type="number"
                            value={formData.mutualFunds}
                            onChange={(e) => handleInputChange("mutualFunds", e.target.value)}
                            placeholder="50000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stockInvestments">Stock Investments (₹)</Label>
                        <Input
                            id="stockInvestments"
                            type="number"
                            value={formData.stockInvestments}
                            onChange={(e) => handleInputChange("stockInvestments", e.target.value)}
                            placeholder="75000"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="investmentDetails">Investment Details</Label>
                    <Textarea
                        id="investmentDetails"
                        value={formData.investmentDetails}
                        onChange={(e) => handleInputChange("investmentDetails", e.target.value)}
                        placeholder="Detailed breakdown of investments, portfolio details"
                        rows={3}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
