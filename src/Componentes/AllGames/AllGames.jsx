import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllGames.css';

const AllGames = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getGames = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/game/all");
            const gamesJson = await response.json();
            console.log(gamesJson);
            setGames(gamesJson.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    const handleBackClick = () => {
        navigate('/');
    };

    const handleConsultClick = (id) => {
        navigate(`/updategame?id=${id}`);
    };

    const handleDeleteClick = (id) => {
        console.log(`estoy eliminando: ${id}`)
        fetch(`http://localhost:4000/api/game/${id}`, { method: 'DELETE' })
        .then(response => { 
            if (response.ok) {
                console.log('Eliminado exitosamente');
                getGames(); // Actualizar la lista de juegos
            } else {
                console.error('Error al eliminar');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
        });
    };

    return (
        <div>
            <h2 className="title">Lista de Juegos</h2>
            <table className="games-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.code}>
                            <td>{game.code}</td>
                            <td>{game.name}</td>
                            <td><button onClick={() => handleConsultClick(game.id)}>Consultar</button></td>
                            <td><button onClick={() => handleDeleteClick(game.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBackClick} className="back-button">Atrás</button>
        </div>
    );
};

export default AllGames;

