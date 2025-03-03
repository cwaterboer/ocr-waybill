import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Settings Page</h2>
      <p>Manage your account and application settings here.</p>
    </ProtectedRoute>
  )
}

