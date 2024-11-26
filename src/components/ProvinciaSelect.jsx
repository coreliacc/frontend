import React, { useEffect, useState } from 'react';

function ProvinciaSelect({ onProvinciaSelect }) {
    const [provincias, setProvincias] = useState([]);

    useEffect(() => {
        const fetchProvincias = async () => {
            const response = await fetch('https://backend-yf8a.onrender.com/api/provincias');
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setProvincias(sortedData);
        };
        fetchProvincias();
    }, []);

    return (
        <div className="mb-4">
            <label className="block text-gray-700">Provincia</label>
            <select onChange={(e) => onProvinciaSelect(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Selecciona una provincia</option>
                {provincias.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                        {prov.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ProvinciaSelect;
