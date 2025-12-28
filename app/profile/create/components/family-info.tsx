import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users } from "lucide-react"
import { ProfileFormData } from "../types"

interface FamilyInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function FamilyNominee({ formData, handleInputChange }: FamilyInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Family & Nominee Details
                </CardTitle>
                <CardDescription>Family members and emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fatherName">Father's Name</Label>
                        <Input
                            id="fatherName"
                            value={formData.fatherName}
                            onChange={(e) => handleInputChange("fatherName", e.target.value)}
                            placeholder="Robert Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                        <Input
                            id="fatherOccupation"
                            value={formData.fatherOccupation}
                            onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                            placeholder="Engineer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="motherName">Mother's Name</Label>
                        <Input
                            id="motherName"
                            value={formData.motherName}
                            onChange={(e) => handleInputChange("motherName", e.target.value)}
                            placeholder="Mary Doe"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                        <Input
                            id="motherOccupation"
                            value={formData.motherOccupation}
                            onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                            placeholder="Teacher"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spouseName">Spouse's Name</Label>
                        <Input
                            id="spouseName"
                            value={formData.spouseName}
                            onChange={(e) => handleInputChange("spouseName", e.target.value)}
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spouseOccupation">Spouse's Occupation</Label>
                        <Input
                            id="spouseOccupation"
                            value={formData.spouseOccupation}
                            onChange={(e) => handleInputChange("spouseOccupation", e.target.value)}
                            placeholder="Doctor"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="spouseDateOfBirth">Spouse's Date of Birth</Label>
                        <Input
                            id="spouseDateOfBirth"
                            type="date"
                            value={formData.spouseDateOfBirth}
                            onChange={(e) => handleInputChange("spouseDateOfBirth", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="numberOfChildren">Number of Children</Label>
                        <Input
                            id="numberOfChildren"
                            type="number"
                            value={formData.numberOfChildren}
                            onChange={(e) => handleInputChange("numberOfChildren", e.target.value)}
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="childrenNames">Children Names</Label>
                        <Input
                            id="childrenNames"
                            value={formData.childrenNames}
                            onChange={(e) => handleInputChange("childrenNames", e.target.value)}
                            placeholder="Child1, Child2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input
                            id="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                        <Input
                            id="emergencyContactNumber"
                            type="tel"
                            value={formData.emergencyContactNumber}
                            onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                            placeholder="+1 (555) 987-6543"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelation">Emergency Contact Relation</Label>
                        <Select
                            value={formData.emergencyContactRelation}
                            onValueChange={(value) => handleInputChange("emergencyContactRelation", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select relation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="relative">Relative</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="nomineeName">Nominee Name</Label>
                        <Input
                            id="nomineeName"
                            value={formData.nomineeName}
                            onChange={(e) => handleInputChange("nomineeName", e.target.value)}
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nomineeRelationship">Nominee Relationship</Label>
                        <Select
                            value={formData.nomineeRelationship}
                            onValueChange={(value) => handleInputChange("nomineeRelationship", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="father">Father</SelectItem>
                                <SelectItem value="mother">Mother</SelectItem>
                                <SelectItem value="son">Son</SelectItem>
                                <SelectItem value="daughter">Daughter</SelectItem>
                                <SelectItem value="brother">Brother</SelectItem>
                                <SelectItem value="sister">Sister</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nomineeDOB">Nominee Date of Birth</Label>
                        <Input
                            id="nomineeDOB"
                            type="date"
                            value={formData.nomineeDOB}
                            onChange={(e) => handleInputChange("nomineeDOB", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nomineePhone">Nominee Phone</Label>
                        <Input
                            id="nomineePhone"
                            type="tel"
                            value={formData.nomineePhone}
                            onChange={(e) => handleInputChange("nomineePhone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="nomineeAddress">Nominee Address</Label>
                    <Textarea
                        id="nomineeAddress"
                        value={formData.nomineeAddress}
                        onChange={(e) => handleInputChange("nomineeAddress", e.target.value)}
                        placeholder="Complete address of nominee"
                        rows={2}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
