import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateGame.css';

const UpdateGame = () => {
    const [game, setGame] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const getIdFromQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    };

    const fetchGameDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/game/${id}`);
            const gameJson = await response.json();
            setGame(gameJson.data);
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    };

    useEffect(() => {
        const id = getIdFromQuery();
        if (id) {
            fetchGameDetails(id);
        }
    }, [location]);

    const handleBackClick = () => {
        navigate(-1); 
    };

    if (!game) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Juego</h2>
            <p><strong>Código:</strong> {game.code}</p>
            <p><strong>Nombre:</strong> {game.name}</p>
            <p><strong>Descripción:</strong> {game.description}</p>
            <p><strong>Consola:</strong> {game.console}</p>
            <p><strong>Año de Lanzamiento:</strong> {game.release_year}</p>
            <p><strong>Número de Jugadores:</strong> {game.number_of_players}</p>
            <img src={game.image} alt={game.name} />
            <button onClick={handleBackClick}>Atrás</button>
        </div>
    );
};


export default UpdateGame;
