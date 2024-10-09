import React, { useEffect, useState } from 'react';
import './AllGames.css';

const AllGames = () => {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        try {
            const response = await fetch("http://localhost:8000/games"); // Asegúrate de que esta URL sea correcta
            const gamesJson = await response.json();
            setGames(gamesJson);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };    

        useEffect(() => {
            getGames();
        }, []);
    
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    
    export default AllGames;
    