import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FireIcon, SparklesIcon, ClockIcon, TagIcon } from "@heroicons/react/24/solid"; 

const getTagIcon = (tag) => {
  switch (tag) {
    case "popular":
      return <FireIcon className="w-4 h-4 text-red-500" />;
    case "new":
      return <SparklesIcon className="w-4 h-4 text-green-500" />;
    case "limited":
      return <ClockIcon className="w-4 h-4 text-yellow-500" />;
    default:
      return <TagIcon className="w-4 h-4 text-gray-400" />;
  }
};


const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get('/games');
      console.log('API Response:', res.data);
      setGames(res.data.games || []);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.fallback) {
      console.warn('Image failed to load:', e.target.src);
      e.target.src = '/images/fallback.jpg';
      e.target.dataset.fallback = 'true';
    }
  };

  const handleEdit = (game) => {
    navigate(`/layout/games/${game.id}`, { state: { game } });
  };

  const handleDeleteClick = (game) => {
    setGameToDelete(game);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/games/${gameToDelete.id}`);
      setGames(games.filter(game => game.id !== gameToDelete.id));
      setDeleteModalOpen(false);
      setGameToDelete(null);
    } catch (err) {
      console.error('Error deleting game:', err);
      setError('Failed to delete game');
    }
  };

  const getImageUrl = (game) => {
    if (!game.imageurl) {
      return '/images/fallback.jpg';
    }

    if (game.imageurl.startsWith('http')) {
      return game.imageurl;
    }

    // Handle relative paths
    const cleanPath = game.imageurl.replace(/^\/+/, '');
    return `${baseUrl}/${cleanPath}`;
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
        {games.length === 0 ? (
          <div className="text-center col-span-full text-gray-500 text-lg">
            No games found
          </div>
        ) : (
          games.map((game) => {
            const imageUrl = getImageUrl(game);
            console.log(`Image URL for ${game.name}:`, imageUrl);
  
            return (
              <div
                key={game.id}
                className="card bg-base-300 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 rounded-xl p-2 m-0.5"
              >
                <figure className="h-40 sm:h-44 md:h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={imageUrl}
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </figure>
                <div className="card-body px-4 py-3">
                  <h2 className="card-title text-base-content text-lg">
                    {game.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {game.description || "No description provided."}
                  </p>
  
                  <div className="flex flex-wrap gap-2 mt-3 items-center">
                    <div className="badge badge-outline capitalize">
                      {game.type}
                    </div>
                    <div
                      className={`badge flex items-center gap-1 capitalize ${
                        game.tag === "popular"
                          ? "badge-primary"
                          : game.tag === "limited"
                          ? "badge-warning"
                          : game.tag === "new"
                          ? "badge-success"
                          : "badge-neutral"
                      }`}
                    >
                      {getTagIcon(game.tag)}
                      {game.tag}
                    </div>
                  </div>
  
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleEdit(game)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(game)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
  
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Game</h3>
            <p className="py-4 text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{gameToDelete?.name}</span>? This
              action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDeleteConfirm}>
                Delete
              </button>
              <button
                className="btn"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setGameToDelete(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default GameList;
