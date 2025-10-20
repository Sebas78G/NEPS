import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciar sesión con:", email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
      {/* Efecto de luz de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl px-8 flex items-center justify-between gap-16">
        {/* Sección Izquierda - Logo y Animación */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-28 h-28">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#1e40af" strokeWidth="8"/>
                  <path d="M 40 100 L 80 100" stroke="#1e40af" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 40 80 L 80 80" stroke="#1e40af" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 40 120 L 80 120" stroke="#1e40af" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 160 100 L 100 100" stroke="#1e40af" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2">EXPRESO</h1>
            <p className="text-2xl text-blue-200">Agencia de Viajes</p>
            <p className="text-lg text-blue-300 mt-1">by Cafam</p>
          </div>

          {/* Ilustración de laptop */}
          <div className="relative">
            <div className="w-80 h-48 bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-lg border-4 border-blue-700/50 backdrop-blur-sm p-4">
              <div className="flex gap-4 h-full">
                {/* Excel icon */}
                <div className="flex-1 bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="w-20 h-20 bg-green-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                    X
                  </div>
                </div>
                {/* Table icon */}
                <div className="flex-1 bg-white/10 rounded-lg p-3">
                  <div className="grid grid-cols-3 gap-1 h-full">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-blue-300/40 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-96 h-3 bg-blue-800/50 rounded-b-xl mx-auto -mt-1"></div>
          </div>
        </div>

        {/* Sección Derecha - Formulario */}
        <div className="flex-1 max-w-md">
          <div className="bg-blue-900/30 backdrop-blur-xl border border-blue-400/30 rounded-3xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Iniciar Sesión</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-blue-200 text-sm mb-2">Correo electrónico</label>
                <div className="relative">
                  <FiMail className="absolute top-4 left-4 text-blue-300 text-xl" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-950/50 border border-blue-400/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-200 text-sm mb-2">Contraseña</label>
                <div className="relative">
                  <FiLock className="absolute top-4 left-4 text-blue-300 text-xl" />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-blue-950/50 border border-blue-400/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02] duration-200"
              >
                Ingresar
              </button>
            </div>

            <button
              onClick={() => console.log("Recuperar contraseña")}
              className="block w-full mt-6 text-sm text-blue-200 hover:text-cyan-300 transition-colors text-center"
            >
              Recuperar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}