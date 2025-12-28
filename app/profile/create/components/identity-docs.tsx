import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileData, ProfileFormData } from "../types"

interface IdentityDocsProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
    handleFileChange: (field: keyof FileData, file: File | null) => void;
}

export function IdentityDocuments({ formData, handleInputChange, handleFileChange }: IdentityDocsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Identity Documents</CardTitle>
                <CardDescription>Government issued identification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="panNumber">PAN Number</Label>
                        <Input
                            id="panNumber"
                            value={formData.panNumber}
                            onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="panCardName">PAN Card Name</Label>
                        <Input
                            id="panCardName"
                            value={formData.panCardName}
                            onChange={(e) => handleInputChange("panCardName", e.target.value)}
                            placeholder="Name as per PAN Card"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aadhaarNumber">Aadhaar Number / SSN</Label>
                        <Input
                            id="aadhaarNumber"
                            value={formData.aadhaarNumber}
                            onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
                            placeholder="1234 5678 9012"
                            maxLength={12}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="voterIdNumber">Voter ID Number</Label>
                        <Input
                            id="voterIdNumber"
                            value={formData.voterIdNumber}
                            onChange={(e) => handleInputChange("voterIdNumber", e.target.value.toUpperCase())}
                            placeholder="ABC1234567"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="passportNumber">Passport Number</Label>
                        <Input
                            id="passportNumber"
                            value={formData.passportNumber}
                            onChange={(e) => handleInputChange("passportNumber", e.target.value.toUpperCase())}
                            placeholder="A1234567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
                        <Input
                            id="passportIssueDate"
                            type="date"
                            value={formData.passportIssueDate}
                            onChange={(e) => handleInputChange("passportIssueDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passportExpiryDate">Passport Expiry Date</Label>
                        <Input
                            id="passportExpiryDate"
                            type="date"
                            value={formData.passportExpiryDate}
                            onChange={(e) => handleInputChange("passportExpiryDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="passportIssuePlace">Passport Issue Place</Label>
                        <Input
                            id="passportIssuePlace"
                            value={formData.passportIssuePlace}
                            onChange={(e) => handleInputChange("passportIssuePlace", e.target.value)}
                            placeholder="Mumbai / New York"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="passportType">Passport Type</Label>
                        <Select
                            value={formData.passportType}
                            onValueChange={(value) => handleInputChange("passportType", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ordinary">Ordinary</SelectItem>
                                <SelectItem value="diplomatic">Diplomatic</SelectItem>
                                <SelectItem value="official">Official</SelectItem>
                                <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rationCardNumber">Ration Card Number</Label>
                        <Input
                            id="rationCardNumber"
                            value={formData.rationCardNumber}
                            onChange={(e) => handleInputChange("rationCardNumber", e.target.value)}
                            placeholder="RATION123456"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="drivingLicenseNumber">Driving License Number</Label>
                        <Input
                            id="drivingLicenseNumber"
                            value={formData.drivingLicenseNumber}
                            onChange={(e) => handleInputChange("drivingLicenseNumber", e.target.value.toUpperCase())}
                            placeholder="DL123456789"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dlIssueDate">DL Issue Date</Label>
                        <Input
                            id="dlIssueDate"
                            type="date"
                            value={formData.dlIssueDate}
                            onChange={(e) => handleInputChange("dlIssueDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dlExpiryDate">DL Expiry Date</Label>
                        <Input
                            id="dlExpiryDate"
                            type="date"
                            value={formData.dlExpiryDate}
                            onChange={(e) => handleInputChange("dlExpiryDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="governmentIdFile">Government ID Upload</Label>
                        <Input
                            id="governmentIdFile"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleFileChange("governmentIdFile", file || null);
                            }}
                        />
                        <p className="text-xs text-muted-foreground">Upload scan of government ID</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photoFile">Passport Photo</Label>
                        <Input
                            id="photoFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleFileChange("photoFile", file || null);
                            }}
                        />
                        <p className="text-xs text-muted-foreground">Passport-sized photo</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="signatureFile">Digital Signature</Label>
                        <Input
                            id="signatureFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleFileChange("signatureFile", file || null);
                            }}
                        />
                        <p className="text-xs text-muted-foreground">Upload signature image</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
