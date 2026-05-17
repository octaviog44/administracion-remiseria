import { useState, useEffect } from 'react';
import { supabase } from './firebaseConfig';
import { useAuth } from './AuthContext';
import { ViajeForm } from './ViajeForm';
import { PriceCalculator } from './PriceCalculator';

export function ViagesPage() {
  const { user } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('viajes'); // 'viajes' o 'calculadora'

  const handleAddViaje = async (viajeData) => {
    setLoading(true);
    const { error } = await supabase.from('viajes').insert([
      {
        ...viajeData,
        user_id: user.id,
      }
    ]);

    if (error) {
      alert('Error al guardar: ' + error.message);
    } else {
      loadViajes();
    }
    setLoading(false);
  };

  const loadViajes = async () => {
    const { data, error } = await supabase
      .from('viajes')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error cargando viajes:', error);
    } else {
      setViajes(data || []);
    }
  };

  useEffect(() => {
    if (user) loadViajes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 mt-4">
          <h1 className="text-4xl font-bold text-blue-600">PWA Remisería</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg shadow-lg p-1">
          <button
            onClick={() => setActiveTab('viajes')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
              activeTab === 'viajes'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 Mis Viajes
          </button>
          <button
            onClick={() => setActiveTab('calculadora')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
              activeTab === 'calculadora'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🧮 Calculadora
          </button>
        </div>

        {/* Tab: Mis Viajes */}
        {activeTab === 'viajes' && (
          <>
            <ViajeForm onSubmit={handleAddViaje} loading={loading} />

            <div className="space-y-4">
              {viajes.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No hay viajes registrados aún</p>
              ) : (
                viajes.map(viaje => (
                  <div key={viaje.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{viaje.titulo}</h3>
                        <p className="text-gray-600">📅 {new Date(viaje.fecha).toLocaleDateString('es-AR')}</p>
                        <p className="text-gray-600">🚗 {viaje.kilometros} km</p>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Precio Viaje</p>
                            <p className="font-bold text-gray-800">${viaje.precio_viaje.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Combustible</p>
                            <p className="font-bold text-gray-800">${viaje.precio_combustible.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Gastos Extra</p>
                            <p className="font-bold text-gray-800">${(viaje.gastos_extra || 0).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Ganancia</p>
                            <p className={`font-bold text-lg ${viaje.ganancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${viaje.ganancia.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Tab: Calculadora */}
        {activeTab === 'calculadora' && (
          <PriceCalculator />
        )}
      </div>
    </div>
  );
}
