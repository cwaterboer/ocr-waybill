import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <h2 className="text-2xl font-bold mb-4">Clients Page</h2>
      <p>Manage your clients here.</p>
    </ProtectedRoute>
  )
}

