import React, { useState } from 'react';

const Create = ({ addGame }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [console, setConsole] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [image, setImage] = useState('');

    const resetForm = () => {
        setCode('');
        setName('');
        setDescription('');
        setConsole('');
        setReleaseYear('');
        setNumberOfPlayers('');
        setImage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGame({ code, name, description, console, release_year: releaseYear, number_of_players: numberOfPlayers, image });
        resetForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)} required />
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Consola" value={console} onChange={(e) => setConsole(e.target.value)} required />
            <input type="text" placeholder="Año de lanzamiento" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
            <input type="number" placeholder="Número de jugadores" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)} required />
            <input type="text" placeholder="URL de la imagen" value={image} onChange={(e) => setImage(e.target.value)} required />
            <button type="submit">Agregar Juego</button>
        </form>
    );
};

export default Create;