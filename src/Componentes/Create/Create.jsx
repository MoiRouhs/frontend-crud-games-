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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGame = { 
            code, 
            name, 
            description, 
            console, 
            release_year: releaseYear, 
            number_of_players: numberOfPlayers, 
            image 
        };

        try {
            const response = await fetch('http://localhost:8000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (response.ok) {
                const addedGame = await response.json();
                addGame(addedGame);
                resetForm();
            } else {
                console.error('Error al agregar el juego');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <>
            <h1 className="text-red-100">CREAR JUEGO</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Código" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Descripción" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Consola" 
                    value={console} 
                    onChange={(e) => setConsole(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Año de lanzamiento" 
                    value={releaseYear} 
                    onChange={(e) => setReleaseYear(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Número de jugadores" 
                    value={numberOfPlayers} 
                    onChange={(e) => setNumberOfPlayers(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="URL de la imagen" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    required 
                />
                <button type="submit">Agregar Juego</button>
            </form>
        </>
    );
};

export default Create;
