import React, { useState } from 'react';

const DeleteGame = () => {
    const [code, setCode] = useState('');
    const [game, setGame] = useState(null);

    const fetchGameDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/game/${code}`);
            if (response.ok) {
                const gameData = await response.json();
                setGame(gameData);
            } else {
                alert('Juego no encontrado');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`¿Está seguro que desea eliminar el juego "${game.name}"?`)) {
            try {
                const response = await fetch(`http://localhost:3000/api/game/${code}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Juego eliminado exitosamente');
                    setGame(null);
                    setCode('');
                } else {
                    alert('Error al eliminar el juego');
                }
            } catch (error) {
                alert('Error de conexión');
            }
        }
    };

    const handleCancel = () => {
        setGame(null);
        setCode('');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>ELIMINAR JUEGO</h1>
            {!game && (
                <div>
                    <label>
                        Código:
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </label>
                    <button onClick={fetchGameDetails}>Buscar Juego</button>
                </div>
            )}
            {game && (
                <div>
                    <h2>Detalles del Juego</h2>
                    <p><strong>Código:</strong> {game.code}</p>
                    <p><strong>Nombre:</strong> {game.name}</p>
                    <p><strong>Descripción:</strong> {game.description}</p>
                    <p><strong>Consola:</strong> {game.console}</p>
                    <p><strong>Año de lanzamiento:</strong> {game.release_year}</p>
                    <p><strong>Número de jugadores:</strong> {game.number_of_players}</p>
                    <img src={game.image} alt={game.name} style={{ width: '200px' }} />
                    <button onClick={handleDelete} style={{ marginTop: '20px' }}>Eliminar</button>
                    <button onClick={handleCancel} style={{ marginTop: '10px' }}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default DeleteGame;