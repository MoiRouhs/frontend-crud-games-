import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UpdateGame.css';

const UpdateGame = () => {
    let [game, setGame] = useState(null);
    let [form, setForm] = useState({
        name: '',
        description: '',
        console: '',
        release_year: '',
        number_of_players: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [shouldReload, setShouldReload] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const getIdFromQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    };

    const fetchGameDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/game/${id}`);
            if (response.ok) {
                const gameJson = await response.json();
                if (gameJson.data && gameJson.data.length > 0) {
                const gameData = gameJson.data[0];
                setGame(gameData); 
                setForm({ 
                    code: gameData.code,
                    name: gameData.name, 
                    description: gameData.description, 
                    console: gameData.console, 
                    release_year: gameData.releaseYear, 
                    number_of_players: gameData.numberOfPlayers, 
                    image: gameData.image 
                });  
                }
            } 
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
        };

    useEffect(() => {
        const id = getIdFromQuery();
        if (id) {
            fetchGameDetails(id);
            setShouldReload(false);
        }
    }, [location, shouldReload]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.release_year.length < 4 || isNaN(form.release_year)) {
            setUpdateMessage('El año de lanzamiento debe tener al menos 4 dígitos.');
            return;
        }

        form.release_year = Number(form.release_year);

        try {
            const response = await fetch(`http://localhost:4000/api/game/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (response.ok) {
            setIsEditing(false);
            setUpdateMessage('¡Juego actualizado correctamente!');
            setShouldReload(true);
            }
        } catch (error) {
            console.error('Error updating game:', error); 
            setUpdateMessage(`Error al actualizar el juego: ${error.message}`);
        }
};

    const handleBackClick = () => {
        navigate(-1); 
    };

    if (!game) return <div>Cargando...</div>;

    

    return (
        <div>
            <h1>ACTUALIZAR JUEGO</h1>
            {!isEditing ? (
                <div>
                    <p><strong>Código:</strong> {game.code}</p>
                    <p><strong>Nombre:</strong> {game.name}</p>
                    <p><strong>Descripción:</strong> {game.description}</p>
                    <p><strong>Consola:</strong> {game.console}</p>
                    <p><strong>Año de Lanzamiento:</strong> {game.releaseYear}</p>
                    <p><strong>Número de Jugadores:</strong> {game.numberOfPlayers}</p>
                    <img src={game.image} alt={game.name} />
                    <br />
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                </div>
            ) : (
                // Formulario para actualizar el juego
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        disabled
                    />
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
                </form>
            )}
            
            <button onClick={handleBackClick} className="back-button">Atrás</button>
            {updateMessage && <p>{updateMessage}</p>}
        </div>
    );
};

export default UpdateGame;
