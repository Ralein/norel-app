import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"
import { ProfileFormData } from "../types"

interface ProfileTypeProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function ProfileType({ formData, handleInputChange }: ProfileTypeProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Type
                </CardTitle>
                <CardDescription>Select the type of profile you're creating</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="profileType">Profile Type</Label>
                    <Select
                        value={formData.profileType}
                        onValueChange={(value) => handleInputChange("profileType", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select profile type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="family">Family Member</SelectItem>
                            <SelectItem value="dependent">Dependent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
