import { useState } from "react";
import Lottie from "lottie-react";
import excelAnimation from "../assets/excel.json"; // descarga el JSON de Lottie y colócalo en /src/assets/
import logo from "../img/expreso.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Iniciando sesión con: ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-gray-100">
      {/* Lado izquierdo: animación y logo */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-10 space-y-6">
        <img src={logo} alt="Expreso" className="w-10 h-10 object-contain drop-shadow-lg" />
        <Lottie animationData={excelAnimation} loop className="w-10 h-10" />
        <p className="text-center text-gray-300 max-w-md text-sm">
          Bienvenido a <span className="font-bold text-white">Expreso Agencia de Viajes by Cafam</span>.  
          Administra tus viajes, clientes y reportes fácilmente desde nuestro panel profesional.
        </p>
      </div>

      {/* Lado derecho: formulario */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-950 bg-opacity-40 backdrop-blur-md p-10">
        <form
          onSubmit={handleSubmit}
          className="half max-w-sm bg-gray-900 bg-opacity-70 p-8 rounded-2xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Bienvenido</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Inicia sesión para acceder al panel de control
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="half p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="half p- rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 half py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-gray-500 text-xs mt-6">
            © 2025 Expreso Cafam. Todos los derechos reservados.
          </p>
        </form>
      </div>
    </div>
  );
}
