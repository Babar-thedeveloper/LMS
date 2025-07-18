import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import GameList from '../components/Games/GamesList';
import GameForm from '../components/Games/GamesForm';
import DeleteModal from '../components/Games/DeleteModal';
import WelcomePage from '../components/WelcomePage';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    // Reset games data for a fresh start
    setGames([]);
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get('/games');
      setGames(res.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/games/${deleteId}`);
      fetchGames();
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-4">
      <WelcomePage title="Game Management" />
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">All Games</h2>
        <button className="btn btn-primary" onClick={() => { setSelectedGame(null); setShowForm(true); }}>
          Add Game
        </button>
      </div>

      <GameList
        games={games}
        onEdit={(game) => {
          setSelectedGame(game);
          setShowForm(true);
        }}
        onDelete={(id) => setDeleteId(id)}
      />

      {showForm && (
        <GameForm
          initialData={selectedGame}
          onClose={() => setShowForm(false)}
          onSuccess={fetchGames}
        />
      )}

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default GamesPage;
