import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileFormData } from "../types"

interface ReferencesProps {
    formData: ProfileFormData;
    handleInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export function References({ formData, handleInputChange }: ReferencesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>References</CardTitle>
                <CardDescription>Personal and professional references</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium">Reference 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="reference1Name">Name</Label>
                            <Input
                                id="reference1Name"
                                value={formData.reference1Name}
                                onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                                placeholder="John Smith"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference1Phone">Phone</Label>
                            <Input
                                id="reference1Phone"
                                type="tel"
                                value={formData.reference1Phone}
                                onChange={(e) => handleInputChange("reference1Phone", e.target.value)}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference1Relation">Relation</Label>
                            <Input
                                id="reference1Relation"
                                value={formData.reference1Relation}
                                onChange={(e) => handleInputChange("reference1Relation", e.target.value)}
                                placeholder="Colleague / Friend"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference1Address">Address</Label>
                            <Input
                                id="reference1Address"
                                value={formData.reference1Address}
                                onChange={(e) => handleInputChange("reference1Address", e.target.value)}
                                placeholder="Complete address"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium">Reference 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="reference2Name">Name</Label>
                            <Input
                                id="reference2Name"
                                value={formData.reference2Name}
                                onChange={(e) => handleInputChange("reference2Name", e.target.value)}
                                placeholder="Mary Johnson"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference2Phone">Phone</Label>
                            <Input
                                id="reference2Phone"
                                type="tel"
                                value={formData.reference2Phone}
                                onChange={(e) => handleInputChange("reference2Phone", e.target.value)}
                                placeholder="+1 (555) 987-6543"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference2Relation">Relation</Label>
                            <Input
                                id="reference2Relation"
                                value={formData.reference2Relation}
                                onChange={(e) => handleInputChange("reference2Relation", e.target.value)}
                                placeholder="Manager / Neighbor"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reference2Address">Address</Label>
                            <Input
                                id="reference2Address"
                                value={formData.reference2Address}
                                onChange={(e) => handleInputChange("reference2Address", e.target.value)}
                                placeholder="Complete address"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
