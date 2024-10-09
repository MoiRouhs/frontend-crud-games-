import React from 'react';

const DeleteGame = ({ deleteGame, code }) => {
    return (
        <button onClick={() => deleteGame(code)}>Eliminar</button>
    );
};

export default DeleteGame;