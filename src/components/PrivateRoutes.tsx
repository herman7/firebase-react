import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext' // Get Context

// Outlet: Renders the matching child route of a parent route or nothing if no child route matches

const PrivateRoutes = () => {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
