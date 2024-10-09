import React, { useState } from 'react';

const UpdateGames = ({ game, updateGame }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(game);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateGames(form);
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    <input type="text" name="description" value={form.description} onChange={handleChange} required />
                    <input type="text" name="console" value={form.console} onChange={handleChange} required />
                    <input type="text" name="release_year" value={form.release_year} onChange={handleChange} required />
                    <input type="number" name="number_of_players" value={form.number_of_players} onChange={handleChange} required />
                    <input type="text" name="image" value={form.image} onChange={handleChange} required />
                    <button type="submit">Actualizar Juego</button>
                </form>
            ) : (
                <button onClick={() => setIsEditing(true)}>Editar</button>
            )}
        </>
    );
};

export default UpdateGames;
