import React, { useEffect, useState } from 'react';

function PoblacionSelect({ provinciaId, onPoblacionSelect }) {
    const [poblaciones, setPoblaciones] = useState([]);

    useEffect(() => {
        if (!provinciaId) return;

        const fetchPoblaciones = async () => {
            const response = await fetch(`https://backend-yf8a.onrender.com/api/poblaciones/${provinciaId}`);
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setPoblaciones(data);
        };

        fetchPoblaciones();
    }, [provinciaId]);

    return (
        <div className="mb-4">
            <label className="block text-gray-700">Población</label>
            <select onChange={(e) => onPoblacionSelect(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Selecciona una población</option>
                {poblaciones.map((pob) => (
                    <option key={pob.id} value={pob.id}>
                        {pob.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PoblacionSelect;
