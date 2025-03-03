import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Reports Page</h2>
      <p>View and generate reports here.</p>
    </ProtectedRoute>
  )
}

