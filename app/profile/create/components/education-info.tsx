import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap } from "lucide-react"
import { ProfileFormData } from "../types"

interface EducationInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function EducationDetails({ formData, handleInputChange }: EducationInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education Details
                </CardTitle>
                <CardDescription>Educational qualifications and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="educationalQualification">Educational Qualification</Label>
                        <Select
                            value={formData.educationalQualification}
                            onValueChange={(value) => handleInputChange("educationalQualification", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10th">10th Pass</SelectItem>
                                <SelectItem value="12th">12th Pass</SelectItem>
                                <SelectItem value="diploma">Diploma</SelectItem>
                                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                <SelectItem value="masters">Master's Degree</SelectItem>
                                <SelectItem value="phd">PhD</SelectItem>
                                <SelectItem value="professional">Professional Degree</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="courseCompleted">Course Completed</Label>
                        <Input
                            id="courseCompleted"
                            value={formData.courseCompleted}
                            onChange={(e) => handleInputChange("courseCompleted", e.target.value)}
                            placeholder="B.Tech Computer Science"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="instituteName">Institute Name</Label>
                        <Input
                            id="instituteName"
                            value={formData.instituteName}
                            onChange={(e) => handleInputChange("instituteName", e.target.value)}
                            placeholder="Indian Institute of Technology"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="universityName">University Name</Label>
                        <Input
                            id="universityName"
                            value={formData.universityName}
                            onChange={(e) => handleInputChange("universityName", e.target.value)}
                            placeholder="University of Delhi"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="yearOfPassing">Year of Passing</Label>
                        <Input
                            id="yearOfPassing"
                            type="number"
                            value={formData.yearOfPassing}
                            onChange={(e) => handleInputChange("yearOfPassing", e.target.value)}
                            placeholder="2020"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="percentage">Percentage/Grade</Label>
                        <Input
                            id="percentage"
                            value={formData.percentage}
                            onChange={(e) => handleInputChange("percentage", e.target.value)}
                            placeholder="85% / 8.5 GPA"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rollNumber">Roll Number</Label>
                        <Input
                            id="rollNumber"
                            value={formData.rollNumber}
                            onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                            placeholder="ROLL123456"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="professionalCertifications">Professional Certifications</Label>
                        <Textarea
                            id="professionalCertifications"
                            value={formData.professionalCertifications}
                            onChange={(e) => handleInputChange("professionalCertifications", e.target.value)}
                            placeholder="AWS Certified, Google Cloud Professional, etc."
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="additionalSkills">Additional Skills</Label>
                        <Textarea
                            id="additionalSkills"
                            value={formData.additionalSkills}
                            onChange={(e) => handleInputChange("additionalSkills", e.target.value)}
                            placeholder="Programming languages, software proficiency, etc."
                            rows={2}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
