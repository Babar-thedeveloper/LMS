import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../utils/axiosInstance';

const EditGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { game } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    tag: 'default',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


  useEffect(() => {
    if (game) {
      setFormData({
        name: game.name || '',
        type: game.type || '',
        description: game.description || '',
        tag: game.tag || 'default',
      });
      if (game.imageurl) {
        const imageUrl = game.imageurl.startsWith('http')
          ? game.imageurl
          : `${baseUrl}${game.imageurl}`;
        setPreviewImage(imageUrl);
        console.log('Setting initial preview image:', imageUrl);
      }
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setError(null);
      console.log('Selected new image:', file.name, file.type, file.size);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      // Only append image if a new one was selected
      if (image) {
        // Send image in the same format as POST request
        payload.append('imageurl', image);
        console.log('Appending image to FormData:', image.name);
      }

      // Log FormData contents for debugging
      for (let [key, value] of payload.entries()) {
        console.log(`FormData - ${key}:`, value instanceof File ? value.name : value);
      }

      const response = await axios.put(`/games/${game.id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update response:', response.data);

      // Refresh the games list after successful update
      navigate('/layout/games', { replace: true });
    } catch (err) {
      console.error('Error updating game:', err);
      setError(err.response?.data?.message || 'Failed to update game');
    } finally {
      setLoading(false);
    }
  };

  if (!game) {
    return <div className="text-center">Game not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">Edit Game</h1>

      {error && (
        <div className="alert alert-error mb-6 shadow-sm">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Game Name */}
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Game Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Type */}
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Type</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Tag</span>
          </label>
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Tag</option>
            <option value="popular">Popular</option>
            <option value="new">New</option>
            <option value="limited">Limited</option>
            <option value="default">Default</option>
          </select>
        </div>


        {/* Image Upload */}
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Game Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-36 h-36 rounded-lg border object-cover shadow"
                onError={(e) => {
                  console.error('Preview image failed to load:', e.target.src);
                  e.target.src = '/images/fallback.jpg';
                }}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/layout/games')}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Game'}
          </button>
        </div>
      </form>
    </div>
  );

};

export default EditGame; 