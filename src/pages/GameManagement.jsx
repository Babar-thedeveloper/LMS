import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import WelcomePage from '../components/WelcomePage';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

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
        <button className="btn btn-primary" onClick={() => { setSelectedGame(null); }}>
          Add Game
        </button>
      </div>

      {/* GameList removed - file does not exist. */}
      <div className="p-4 text-gray-500">Game list component is missing. Please restore or update this section.</div>

      {/* GameForm removed - file does not exist. */}

      {/* DeleteModal removed - file does not exist. */}
    </div>
  );
};

export default GamesPage;
