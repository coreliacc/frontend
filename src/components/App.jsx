import React, { useState, useEffect } from 'react';
import ProvinciaSelect from './ProvinciaSelect';
import PoblacionSelect from './PoblacionSelect';
import TipoViaSelect from './TipoViaSelect';
import Modal from './Modal';

// Función para normalizar el texto (convertir a mayúsculas)
function normalizeText(text) {
    return text
        .toUpperCase() // Convertir todo a mayúsculas
        .normalize('NFD') // Descomponer caracteres unicode (para separar acentos)
        .replace(/[\u0300-\u036f]/g, '') // Eliminar marcas diacríticas (acentos)
        .replace(/[^\w\s]/gi, '') // Eliminar símbolos especiales, manteniendo solo letras y números
        .trim(); // Eliminar espacios en blanco al inicio y al final
}

function App() {
    const [provinciaId, setProvinciaId] = useState(null);
    const [poblacionId, setPoblacionId] = useState(null);
    const [tipoVia, setTipoVia] = useState('');
    const [nombreVia, setNombreVia] = useState('');
    const [numero, setNumero] = useState('');
    const [cp, setCp] = useState('');
    const [cobertura, setCobertura] = useState(null);

    const buscarCobertura = async () => {
        // Normalizar nombre de vía antes de enviar la solicitud
        const normalizedNombreVia = normalizeText(nombreVia);

        const response = await fetch('https://backend-yf8a.onrender.com/api/buscarDireccion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                numero,
                cp,
                nombre_via: normalizedNombreVia, // Usar nombre normalizado
                poblacion_id: poblacionId,
            }),
        });
        const data = await response.json();
        setCobertura(data.cobertura);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Buscar Cobertura de Dirección</h2>
                <ProvinciaSelect onProvinciaSelect={setProvinciaId} />
                <PoblacionSelect provinciaId={provinciaId} onPoblacionSelect={setPoblacionId} />
                <TipoViaSelect onTipoViaSelect={setTipoVia} />

                <div className="mb-4">
                    <label className="block text-gray-700">Nombre de Vía</label>
                    <input
                        type="text"
                        value={nombreVia}
                        onChange={(e) => setNombreVia(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Número</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Código Postal (CP)</label>
                    <input
                        type="text"
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                <button
                    onClick={buscarCobertura}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Buscar Cobertura
                </button>

                {cobertura !== null && <Modal cobertura={cobertura} onClose={() => setCobertura(null)} />}
            </div>
        </div>
    );
}

export default App;
