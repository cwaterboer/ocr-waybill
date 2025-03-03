import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function RoutesPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Routes Page</h2>
      <p>Manage your delivery routes here.</p>
    </ProtectedRoute>
  )
}

