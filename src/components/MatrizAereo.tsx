import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { MatrizRecord } from '../lib/api';

const MatrizAereo = () => {
  const [records, setRecords] = useState<MatrizRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await api.get('/matriz-aereo');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching aereo records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Matriz Aéreo</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validación Duplicados</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asesor Asignado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record: any) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.validacion_duplicados}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.assigned_asesor_id || 'No asignado'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatrizAereo;
