import { useState } from 'react';

export function ViajeForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    titulo: '',
    kilometros: '',
    precio_viaje: '',
    precio_combustible: '',
    gastos_extra: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      kilometros: parseFloat(formData.kilometros) || 0,
      precio_viaje: parseFloat(formData.precio_viaje) || 0,
      precio_combustible: parseFloat(formData.precio_combustible) || 0,
      gastos_extra: parseFloat(formData.gastos_extra) || 0,
    });
    setFormData({
      titulo: '',
      kilometros: '',
      precio_viaje: '',
      precio_combustible: '',
      gastos_extra: '',
      fecha: new Date().toISOString().split('T')[0],
    });
  };

  const ganancia = (
    (parseFloat(formData.precio_viaje) || 0) -
    (parseFloat(formData.precio_combustible) || 0) -
    (parseFloat(formData.gastos_extra) || 0)
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Nuevo Viaje</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del Viaje*
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: Viaje al centro"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha*
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kilómetros*
          </label>
          <input
            type="number"
            name="kilometros"
            value={formData.kilometros}
            onChange={handleChange}
            placeholder="Ej: 15.5"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio del Viaje*
          </label>
          <input
            type="number"
            name="precio_viaje"
            value={formData.precio_viaje}
            onChange={handleChange}
            placeholder="Ej: 500"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio del Combustible*
          </label>
          <input
            type="number"
            name="precio_combustible"
            value={formData.precio_combustible}
            onChange={handleChange}
            placeholder="Ej: 150"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gastos Extra (opcional)
          </label>
          <input
            type="number"
            name="gastos_extra"
            value={formData.gastos_extra}
            onChange={handleChange}
            placeholder="Ej: 50"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
        <p className="text-gray-700">
          <span className="font-bold">Ganancia estimada:</span>
        </p>
        <p className={`text-3xl font-bold ${ganancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${ganancia.toFixed(2)}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition"
      >
        {loading ? 'Guardando...' : 'Guardar Viaje'}
      </button>
    </form>
  );
}
