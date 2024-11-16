import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllGames.css';

const AllGames = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const getGames = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/game/all"); 
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
                            <td><a href={`/edit-games?id=${game.id}`}>Editar</a></td>
                            <td><button data-id={game.id}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBackClick} className="back-button">Atrás</button>
        </div>
    );
};

export default AllGames;
