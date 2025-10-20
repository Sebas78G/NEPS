import AdminDashboard from "../components/AdminDashboard";
import AdvisorDashboard from "../components/AdvisorDashboard";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'advisor') {
    return <AdvisorDashboard />;
  } else {
    return <div>Not authorized</div>;
  }
}