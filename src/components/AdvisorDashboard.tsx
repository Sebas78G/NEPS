import { useAuth } from '../contexts/AuthContext';

const data = [
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', progress: 75 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', progress: 50 },
];

export default function AdvisorDashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Progress</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="w-1/3 py-3 px-4">{user.name}</td>
                <td className="w-1/3 py-3 px-4">{user.email}</td>
                <td className="w-1/3 py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${user.progress}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
