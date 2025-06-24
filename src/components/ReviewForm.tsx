import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Star, Tag, MapPin, ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ReviewForm: React.FC = () => {
  const { selectedQuest, addReview, setCurrentView, completeQuest } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    dishName: '',
    restaurantName: '',
    rating: 0,
    description: '',
    tags: [] as string[],
    image: null as string | null,
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const commonTags = [
    'Spicy', 'Sweet', 'Savory', 'Healthy', 'Comfort Food', 'Authentic', 
    'Creative', 'Fresh', 'Rich', 'Light', 'Crispy', 'Tender'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dishName || !formData.rating || !formData.image) return;

    const reviewData = {
      dishName: formData.dishName,
      restaurantName: formData.restaurantName,
      rating: formData.rating,
      image: formData.image,
      description: formData.description,
      tags: formData.tags,
      questsCompleted: selectedQuest ? [selectedQuest.id] : [],
    };

    addReview(reviewData);
    
    if (selectedQuest) {
      completeQuest(selectedQuest.id);
    }

    // Reset form
    setFormData({
      dishName: '',
      restaurantName: '',
      rating: 0,
      description: '',
      tags: [],
      image: null,
    });

    setCurrentView('feed');
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-6"
      >
        <button
          onClick={() => setCurrentView('quests')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Share Your Experience</h1>
          {selectedQuest && (
            <p className="text-orange-600 font-medium">Quest: {selectedQuest.title}</p>
          )}
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📸 Add Photo</h2>
          
          {formData.image ? (
            <div className="relative">
              <img
                src={formData.image}
                alt="Food preview"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
            >
              <Camera size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Click to upload a photo of your dish</p>
              <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </motion.div>

        {/* Dish Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">🍽️ Dish Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dish Name *
            </label>
            <input
              type="text"
              value={formData.dishName}
              onChange={(e) => setFormData(prev => ({ ...prev, dishName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Spicy Chicken Tikka Masala"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant/Location
            </label>
            <input
              type="text"
              value={formData.restaurantName}
              onChange={(e) => setFormData(prev => ({ ...prev, restaurantName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Mumbai Street Kitchen"
            />
          </div>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⭐ Rate Your Experience</h2>
          
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-2 transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredRating || formData.rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          
          {formData.rating > 0 && (
            <p className="text-center text-gray-600 mt-2">
              {formData.rating === 5 ? '🤩 Amazing!' :
               formData.rating === 4 ? '😍 Great!' :
               formData.rating === 3 ? '😊 Good!' :
               formData.rating === 2 ? '😐 Okay' : '😞 Not great'}
            </p>
          )}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🏷️ Add Tags</h2>
          
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.tags.includes(tag)
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Tell Your Story</h2>
          
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            placeholder="Share your thoughts about the dish, flavor, presentation, or experience..."
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          type="submit"
          disabled={!formData.dishName || !formData.rating || !formData.image}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {selectedQuest ? '🏆 Complete Quest & Share Review' : '📤 Share Review'}
        </motion.button>
      </form>
    </div>
  );
};

export default ReviewForm;