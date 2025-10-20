import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { MatrizRecord, User } from '../lib/api';
import { FileText } from 'lucide-react';

export default function MatrizComplementaria() {
  const [records, setRecords] = useState<MatrizRecord[]>([]);
  const [asesores, setAsesores] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const [recordsData, asesoresData] = await Promise.all([
        api.get('/matriz-complementaria'),
        api.get('/users/asesores')
      ]);

      setRecords(recordsData.data);
      setAsesores(asesoresData.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignAsesor = async (recordId: string, asesorId: string) => {
    try {
      await api.patch(`/matriz-complementaria/${recordId}/assign`, { 
        asesorId: asesorId || null 
      });
      loadData();
    } catch (error) {
      console.error('Error al asignar asesor:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Matriz Complementaria</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">{records.length} registros</p>
      </div>

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
                Origen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destino
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asesor Asignado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => {
              const patientInfo = record.data?.patient_info || {};
              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.validacion_duplicados}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patientInfo.codigo || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patientInfo.origen || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patientInfo.destino || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={record.assigned_asesor_id || ''}
                      onChange={(e) => handleAssignAsesor(record.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sin asignar</option>
                      {asesores.map((asesor) => (
                        <option key={asesor.id} value={asesor.id}>
                          {asesor.full_name}
                        </option>
                      ))}
                    </select>
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
                </tr>
              );
            })}
          </tbody>
        </table>

        {records.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay registros complementarios disponibles
          </div>
        )}
      </div>
    </div>
  );
}