import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard } from "lucide-react"
import { ProfileFormData } from "../types"

interface BankingInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function BankingFinancial({ formData, handleInputChange }: BankingInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Banking & Financial Details
                </CardTitle>
                <CardDescription>Financial and banking information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) => handleInputChange("bankName", e.target.value)}
                            placeholder="State Bank of India"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                            id="accountNumber"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                            placeholder="1234567890"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                            id="ifscCode"
                            value={formData.ifscCode}
                            onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                            placeholder="SBIN0001234"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select
                            value={formData.accountType}
                            onValueChange={(value) => handleInputChange("accountType", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="current">Current</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="nri">NRI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="branchAddress">Branch Address</Label>
                        <Textarea
                            id="branchAddress"
                            value={formData.branchAddress}
                            onChange={(e) => handleInputChange("branchAddress", e.target.value)}
                            placeholder="Branch full address"
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gstNumber">GST Number</Label>
                        <Input
                            id="gstNumber"
                            value={formData.gstNumber}
                            onChange={(e) => handleInputChange("gstNumber", e.target.value.toUpperCase())}
                            placeholder="07AAGFF2194N1Z1"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="creditCardNumber">Credit Card Number</Label>
                        <Input
                            id="creditCardNumber"
                            value={formData.creditCardNumber}
                            onChange={(e) => handleInputChange("creditCardNumber", e.target.value)}
                            placeholder="**** **** **** 1234"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="creditCardBank">Credit Card Bank</Label>
                        <Input
                            id="creditCardBank"
                            value={formData.creditCardBank}
                            onChange={(e) => handleInputChange("creditCardBank", e.target.value)}
                            placeholder="HDFC Bank"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            placeholder="123"
                            maxLength={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cardExpiryDate">Card Expiry Date</Label>
                        <Input
                            id="cardExpiryDate"
                            type="month"
                            value={formData.cardExpiryDate}
                            onChange={(e) => handleInputChange("cardExpiryDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                        <Input
                            id="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                            placeholder="50000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                        <Input
                            id="annualIncome"
                            type="number"
                            value={formData.annualIncome}
                            onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                            placeholder="600000"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="incomeTaxPaid">Income Tax Paid (Last Year)</Label>
                        <Input
                            id="incomeTaxPaid"
                            type="number"
                            value={formData.incomeTaxPaid}
                            onChange={(e) => handleInputChange("incomeTaxPaid", e.target.value)}
                            placeholder="50000"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
