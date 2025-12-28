import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"
import { ProfileFormData } from "../types"

interface PersonalInfoProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
    firebaseUser: any;
    password?: string;
    setPassword?: (value: string) => void;
    confirmPassword?: string;
    setConfirmPassword?: (value: string) => void;
}

export function PersonalInformation({
    formData,
    handleInputChange,
    firebaseUser,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
}: PersonalInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                </CardTitle>
                <CardDescription>Basic personal details for identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                            id="middleName"
                            value={formData.middleName}
                            onChange={(e) => handleInputChange("middleName", e.target.value)}
                            placeholder="Michael"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="nameAsPerID">Name as per ID *</Label>
                        <Input
                            id="nameAsPerID"
                            value={formData.nameAsPerID}
                            onChange={(e) => handleInputChange("nameAsPerID", e.target.value)}
                            placeholder="John Michael Doe"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                {!firebaseUser && setPassword && setConfirmPassword && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => {
                                handleInputChange("dateOfBirth", e.target.value)
                                // Auto-calculate age
                                if (e.target.value) {
                                    const today = new Date()
                                    const birthDate = new Date(e.target.value)
                                    const age = today.getFullYear() - birthDate.getFullYear()
                                    const monthDiff = today.getMonth() - birthDate.getMonth()
                                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                                        handleInputChange("age", (age - 1).toString())
                                    } else {
                                        handleInputChange("age", age.toString())
                                    }
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" value={formData.age} readOnly placeholder="Auto-calculated" className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select
                            value={formData.maritalStatus}
                            onValueChange={(value) => handleInputChange("maritalStatus", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="widowed">Widowed</SelectItem>
                                <SelectItem value="separated">Separated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Input
                            id="nationality"
                            value={formData.nationality}
                            onChange={(e) => handleInputChange("nationality", e.target.value)}
                            placeholder="Indian / American / British"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="placeOfBirth">Place of Birth</Label>
                        <Input
                            id="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                            placeholder="City, State, Country"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="religion">Religion</Label>
                        <Select value={formData.religion} onValueChange={(value) => handleInputChange("religion", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select religion" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hindu">Hindu</SelectItem>
                                <SelectItem value="muslim">Muslim</SelectItem>
                                <SelectItem value="christian">Christian</SelectItem>
                                <SelectItem value="sikh">Sikh</SelectItem>
                                <SelectItem value="buddhist">Buddhist</SelectItem>
                                <SelectItem value="jain">Jain</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="obc">OBC</SelectItem>
                                <SelectItem value="sc">SC</SelectItem>
                                <SelectItem value="st">ST</SelectItem>
                                <SelectItem value="ews">EWS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="motherTongue">Mother Tongue</Label>
                        <Input
                            id="motherTongue"
                            value={formData.motherTongue}
                            onChange={(e) => handleInputChange("motherTongue", e.target.value)}
                            placeholder="English / Hindi / Tamil"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                            id="height"
                            type="number"
                            value={formData.height}
                            onChange={(e) => handleInputChange("height", e.target.value)}
                            placeholder="175"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                            id="weight"
                            type="number"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                            placeholder="70"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="caste">Caste</Label>
                        <Input
                            id="caste"
                            value={formData.caste}
                            onChange={(e) => handleInputChange("caste", e.target.value)}
                            placeholder="Optional"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subCaste">Sub-Caste</Label>
                        <Input
                            id="subCaste"
                            value={formData.subCaste}
                            onChange={(e) => handleInputChange("subCaste", e.target.value)}
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="distinguishingMarks">Distinguishing Marks</Label>
                    <Textarea
                        id="distinguishingMarks"
                        value={formData.distinguishingMarks}
                        onChange={(e) => handleInputChange("distinguishingMarks", e.target.value)}
                        placeholder="Mole on left cheek, scar on right hand, etc."
                        rows={2}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
