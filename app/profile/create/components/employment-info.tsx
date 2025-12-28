import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase } from "lucide-react"
import { ProfileFormData } from "../types"

interface EmploymentInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function EmploymentDetails({ formData, handleInputChange }: EmploymentInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Employment Details
                </CardTitle>
                <CardDescription>Work and employment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) => handleInputChange("occupation", e.target.value)}
                            placeholder="Software Engineer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                            id="designation"
                            value={formData.designation}
                            onChange={(e) => handleInputChange("designation", e.target.value)}
                            placeholder="Senior Developer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleInputChange("department", e.target.value)}
                            placeholder="Engineering"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="employerName">Employer Name</Label>
                        <Input
                            id="employerName"
                            value={formData.employerName}
                            onChange={(e) => handleInputChange("employerName", e.target.value)}
                            placeholder="Tech Company Inc."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="employmentType">Employment Type</Label>
                        <Select
                            value={formData.employmentType}
                            onValueChange={(value) => handleInputChange("employmentType", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="permanent">Permanent</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="consultant">Consultant</SelectItem>
                                <SelectItem value="freelancer">Freelancer</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="government">Government</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="employerAddress">Employer Address</Label>
                        <Textarea
                            id="employerAddress"
                            value={formData.employerAddress}
                            onChange={(e) => handleInputChange("employerAddress", e.target.value)}
                            placeholder="Company full address"
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="workExperience">Work Experience (Years)</Label>
                        <Input
                            id="workExperience"
                            type="number"
                            value={formData.workExperience}
                            onChange={(e) => handleInputChange("workExperience", e.target.value)}
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={(e) => handleInputChange("employeeId", e.target.value)}
                            placeholder="EMP001234"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="joiningDate">Joining Date</Label>
                        <Input
                            id="joiningDate"
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                            id="workingHours"
                            value={formData.workingHours}
                            onChange={(e) => handleInputChange("workingHours", e.target.value)}
                            placeholder="9 AM - 6 PM"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reportingManager">Reporting Manager</Label>
                        <Input
                            id="reportingManager"
                            value={formData.reportingManager}
                            onChange={(e) => handleInputChange("reportingManager", e.target.value)}
                            placeholder="Jane Smith"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="employerPhone">Employer Phone</Label>
                        <Input
                            id="employerPhone"
                            type="tel"
                            value={formData.employerPhone}
                            onChange={(e) => handleInputChange("employerPhone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="employerEmail">Employer Email</Label>
                        <Input
                            id="employerEmail"
                            type="email"
                            value={formData.employerEmail}
                            onChange={(e) => handleInputChange("employerEmail", e.target.value)}
                            placeholder="hr@company.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hrContactName">HR Contact Name</Label>
                        <Input
                            id="hrContactName"
                            value={formData.hrContactName}
                            onChange={(e) => handleInputChange("hrContactName", e.target.value)}
                            placeholder="HR Manager Name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="hrContactNumber">HR Contact Number</Label>
                    <Input
                        id="hrContactNumber"
                        type="tel"
                        value={formData.hrContactNumber}
                        onChange={(e) => handleInputChange("hrContactNumber", e.target.value)}
                        placeholder="+1 (555) 987-6543"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
