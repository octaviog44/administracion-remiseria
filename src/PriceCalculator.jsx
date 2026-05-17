import { useState } from 'react';

export function PriceCalculator() {
  const [formData, setFormData] = useState({
    kilometros: '',
    precioKm: '',
    gastoCombustible: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calcular precio total
  const precioBase = (parseFloat(formData.kilometros) || 0) * (parseFloat(formData.precioKm) || 0);
  const gastoCombustible = parseFloat(formData.gastoCombustible) || 0;
  const precioTotal = precioBase + gastoCombustible;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Calculadora de Precios</h2>
      <p className="text-gray-600 mb-6">Calcula el precio recomendado para tu viaje</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Distancia del viaje</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio por Km*
          </label>
          <input
            type="number"
            name="precioKm"
            value={formData.precioKm}
            onChange={handleChange}
            placeholder="Ej: 25"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Tu tarifa por km</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gasto Combustible*
          </label>
          <input
            type="number"
            name="gastoCombustible"
            value={formData.gastoCombustible}
            onChange={handleChange}
            placeholder="Ej: 150"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Costo de combustible</p>
        </div>
      </div>

      {/* Desglose de cálculo */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Precio base */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Precio Base</p>
            <p className="text-2xl font-bold text-blue-600">
              ${precioBase.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {(parseFloat(formData.kilometros) || 0).toFixed(1)} km × ${(parseFloat(formData.precioKm) || 0).toFixed(2)}/km
            </p>
          </div>

          {/* Gasto combustible */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Gasto Combustible</p>
            <p className="text-2xl font-bold text-orange-600">
              ${gastoCombustible.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Costo adicional</p>
          </div>

          {/* Total */}
          <div className="text-center md:border-l md:border-blue-300">
            <p className="text-gray-600 text-sm mb-2 font-bold">PRECIO TOTAL</p>
            <p className={`text-3xl font-bold ${precioTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${precioTotal.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Cobrar al cliente</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-yellow-800">
          <span className="font-bold">💡 Tips:</span> Suma tus gastos de combustible para saber cuánto cobrar. Puedes guardar este viaje en "Mis Viajes" después.
        </p>
      </div>
    </div>
  );
}
