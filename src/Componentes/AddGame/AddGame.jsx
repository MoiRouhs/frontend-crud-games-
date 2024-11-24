import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGame.css';

const AddGame = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [console, setConsole] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate(); // Asegúrate de definir el hook useNavigate

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

        const resetForm = () => {
            setCode('');
            setName('');
            setDescription('');
            setConsole('');
            setReleaseYear('');
            setNumberOfPlayers('');
            setImage('');
        };

        try {
            const response = await fetch('http://localhost:4000/api/game/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (response.ok) {
                resetForm();
            } else {
                console.error('Error al agregar el juego');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <>
            <h1 className="text-red-100">AGREGAR JUEGO</h1>
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
            <div>
                <button onClick={handleBackClick} style={{ marginTop: '10px' }}>Atrás</button>
            </div>
        </>
    );
};

export default AddGame;
