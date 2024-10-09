import React, { useState } from 'react';
import axios from 'axios';

const UpdateGame = () => {
    const [gameCode, setGameCode] = useState('');
    const [game, setGame] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        console: '',
        release_year: '',
        number_of_players: '',
        image: ''
    });
    const [updateMessage, setUpdateMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGameCodeChange = (e) => {
        setGameCode(e.target.value);
    };

    const fetchGame = async () => {
        try {
            const response = await axios.get("http://localhost:8000/");
            setGame(response.data);
            setForm(response.data);
            setIsEditing(true);
        } catch (error) {
            console.error('Error fetching game:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8000/", form);
            setIsEditing(false);
            setUpdateMessage('¡Juego actualizado correctamente!');
        } catch (error) {
            console.error('Error updating game:', error);
            setUpdateMessage('Error al actualizar el juego.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setForm(game);
        setUpdateMessage('');
    };

    return (
        <div>
            <h1>Actualizar juegos</h1>
            <div>
                <label htmlFor="gameCode">Código del Juego:</label>
                <input
                    type="text"
                    id="gameCode"
                    value={gameCode}
                    onChange={handleGameCodeChange}
                />
            </div>
            <div>
                <button onClick={fetchGame}>Obtener Juego</button>
            </div>

            {isEditing && game && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="console"
                        value={form.console}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="release_year"
                        value={form.release_year}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="number_of_players"
                        value={form.number_of_players}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Actualizar Juego</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </form>
            )}

            {updateMessage && <p>{updateMessage}</p>}
        </div>
    );
};

export default UpdateGame;
