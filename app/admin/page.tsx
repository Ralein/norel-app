import { getAdminSession } from "../actions/admin-auth"
import { getAllUsers } from "../actions/admin-actions"
import { redirect } from "next/navigation"
import { AdminDashboardClient } from "./components/admin-dashboard-client"

export default async function AdminDashboardPage() {
    const isAdmin = await getAdminSession()

    if (!isAdmin) {
        redirect("/admin/login")
    }

    const result = await getAllUsers()

    if (!result.success) {
        return <div>Error loading users: {result.error}</div>
    }

    return <AdminDashboardClient initialUsers={result.users || []} />
}
