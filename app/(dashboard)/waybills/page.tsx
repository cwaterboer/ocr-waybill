import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function WaybillsPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Waybills Page</h2>
      <p>Manage your waybills here.</p>
    </ProtectedRoute>
  )
}

