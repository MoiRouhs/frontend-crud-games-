import React from 'react';
import UpdateGames from './UpdateGames';
import DeleteGame from '../DeleteGame/DeleteGame';


const AllGames = ({ games, updateGames, deleteGame }) => {
    return (
        <div>
            <h2>Lista de Juegos</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.code}>
                        {game.name} - {game.console}
                        <UpdateGames game={game} UpdateGames={UpdateGames} />
                        <DeleteGame deleteGame={deleteGame} code={game.code} />
                        <button onClick={() => deleteGame(game.code)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default AllGames;