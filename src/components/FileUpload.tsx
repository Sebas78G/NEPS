import React, { useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { processExcelFile } from '../utils/excelProcessor';

interface UploadStatus {
  type: 'success' | 'error' | 'processing';
  message: string;
}

export default function FileUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setProcessing(true);
    setStatus({ type: 'processing', message: 'Procesando archivo...' });

    try {
      const rows = await processExcelFile(file);

      await api.post('/uploads', {
        fileName: file.name,
        rows: rows
      });

      setStatus({
        type: 'success',
        message: `Archivo procesado exitosamente. ${rows.length} registros cargados.`
      });

      setFile(null);
      onUploadComplete();
    } catch (error) {
      console.error('Error processing file:', error);
      setStatus({
        type: 'error',
        message: 'Error al procesar el archivo. Por favor intente nuevamente.'
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Cargar Archivo Excel</h2>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Seleccionar archivo
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-4 text-sm text-gray-600">
              Archivo seleccionado: <span className="font-medium">{file.name}</span>
            </div>
          )}
        </div>

        {status && (
          <div
            className={`flex items-center space-x-3 p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-green-50 text-green-800'
                : status.type === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : status.type === 'error' ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {processing ? 'Procesando...' : 'Procesar y Cargar'}
        </button>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Instrucciones:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Seleccione el archivo Excel de EXPRESO VIAJES Y TURISMO</li>
            <li>• El sistema procesará automáticamente las columnas AC y AD</li>
            <li>• Los datos se clasificarán como Aéreo o Complementario según CUPS</li>
            <li>• Se generarán las matrices correspondientes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
