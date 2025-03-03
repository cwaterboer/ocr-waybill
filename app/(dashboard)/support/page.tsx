import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function DashboardSupportPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Dashboard Support</h2>
      <p>
        Welcome to the support page for logged-in users. Here you can find resources and contact our support team for
        assistance with your account.
      </p>
      {/* Add more dashboard-specific support content here */}
    </ProtectedRoute>
  )
}

