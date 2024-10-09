import React, { useState } from 'react';

const DeleteGame = () => {
    const [code, setCode] = useState('');
    const [gameName, setGameName] = useState('');

    const handleDelete = async () => {
        if (window.confirm(`¿Está seguro que desea eliminar el juego "${gameName}"?`)) {
            try {
                const response = await fetch("http://localhost:8000/", {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Juego eliminado exitosamente');
                } else {
                    alert('Error al eliminar el juego');
                }
            } catch (error) {
                alert('Error de conexión');
            }
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>ELIMINAR JUEGO</h1>
            <div>
                <label>
                    Código:
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Nombre del juego:
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default DeleteGame;
