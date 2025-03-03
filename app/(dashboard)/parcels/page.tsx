import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function ParcelsPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Parcels Page</h2>
      <p>Manage your parcels here.</p>
    </ProtectedRoute>
  )
}

