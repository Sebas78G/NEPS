import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { MatrizRecord } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { ClipboardList, LogOut, Plane, FileText } from 'lucide-react';

export default function AsesorDashboard() {
  const { user, logout } = useAuth();
  const [aereoRecords, setAereoRecords] = useState<MatrizRecord[]>([]);
  const [complementariaRecords, setComplementariaRecords] = useState<MatrizRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'aereo' | 'complementaria'>('aereo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignedRecords();
  }, [user]);

  const loadAssignedRecords = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const [aereoData, complementariaData] = await Promise.all([
        api.get(`/matriz-aereo/asesor/${user.id}`),
        api.get(`/matriz-complementaria/asesor/${user.id}`)
      ]);

      setAereoRecords(aereoData.data);
      setComplementariaRecords(complementariaData.data);
    } catch (error) {
      console.error('Error al cargar registros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (recordId: string, newStatus: string, type: 'aereo' | 'complementaria') => {
    try {
      const endpoint = type === 'aereo' 
        ? `/matriz-aereo/${recordId}/status`
        : `/matriz-complementaria/${recordId}/status`;

      await api.patch(endpoint, { status: newStatus });
      loadAssignedRecords();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const currentRecords = activeTab === 'aereo' ? aereoRecords : complementariaRecords;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <ClipboardList className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Asesor</h1>
                <p className="text-sm text-gray-500">{user?.full_name}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('aereo')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition flex items-center justify-center space-x-2 ${
              activeTab === 'aereo'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>Aéreo ({aereoRecords.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('complementaria')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition flex items-center justify-center space-x-2 ${
              activeTab === 'complementaria'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Complementaria ({complementariaRecords.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origen - Destino
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Celular
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords.map((record) => {
                    const patientInfo = record.data?.patient_info || {};
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {record.validacion_duplicados}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {patientInfo.codigo || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div>
                            <div className="font-medium">{patientInfo.acompanante || '-'}</div>
                            <div className="text-gray-500">CC: {patientInfo.cedula || '-'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {patientInfo.origen || '-'} → {patientInfo.destino || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {patientInfo.celular || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              record.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : record.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {record.status === 'completed'
                              ? 'Completado'
                              : record.status === 'in_progress'
                              ? 'En Proceso'
                              : 'Pendiente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            value={record.status}
                            onChange={(e) => handleUpdateStatus(record.id, e.target.value, activeTab)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="in_progress">En Proceso</option>
                            <option value="completed">Completado</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {currentRecords.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No tienes registros asignados en esta categoría
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}