import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const SocialFeed: React.FC = () => {
  const { reviews, user } = useGameStore();

  // Mock social feed data for demonstration
  const mockFeedItems = [
    {
      id: '1',
      type: 'review',
      user: { username: 'FoodieExplorer', avatar: '👩‍🍳' },
      dishName: 'Spicy Ramen Bowl',
      restaurantName: 'Tokyo Noodle House',
      rating: 5,
      image: 'https://images.pexels.com/photos/1988503/pexels-photo-1988503.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Absolutely incredible! The broth was rich and the spice level was perfect. The noodles had great texture and the soft-boiled egg was cooked to perfection.',
      tags: ['Spicy', 'Authentic', 'Comfort Food'],
      questCompleted: 'Spice Challenge',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 24,
      comments: 5,
    },
    {
      id: '2',
      type: 'badge',
      user: { username: 'VeggieMaster', avatar: '🧑‍🍳' },
      badge: { name: 'Plant Power Champion', icon: '🌱', rarity: 'Epic' },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likes: 15,
    },
    {
      id: '3',
      type: 'review',
      user: { username: 'SweetTooth', avatar: '👨‍🍳' },
      dishName: 'Chocolate Lava Cake',
      restaurantName: 'Dessert Paradise',
      rating: 4,
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Rich, decadent, and perfectly gooey in the center. Paired wonderfully with vanilla ice cream!',
      tags: ['Sweet', 'Rich', 'Indulgent'],
      questCompleted: 'Sweet Dreams',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likes: 31,
      comments: 8,
    },
  ];

  const allFeedItems = [...reviews.map(review => ({
    ...review,
    type: 'review' as const,
    user: { username: review.username, avatar: review.userAvatar },
    timestamp: review.createdAt,
    questCompleted: review.questsCompleted[0] || null,
  })), ...mockFeedItems].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Feed</h1>
        <p className="text-gray-600">See what fellow food explorers are discovering!</p>
      </motion.div>

      {/* Feed Items */}
      <div className="space-y-6">
        {allFeedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="p-4 flex items-center space-x-3">
              <div className="text-2xl">{item.user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{item.user.username}</span>
                  {item.user.username === user.username && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      You
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{formatTimestamp(item.timestamp)}</div>
              </div>
            </div>

            {/* Content */}
            {item.type === 'review' ? (
              <>
                {/* Quest Completion Banner */}
                {item.questCompleted && (
                  <div className="mx-4 mb-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">🏆</span>
                      <span className="text-green-800 font-medium text-sm">
                        Completed quest: {item.questCompleted}
                      </span>
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="aspect-square bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.dishName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{item.dishName}</h3>
                    {item.restaurantName && (
                      <p className="text-orange-600 font-medium">{item.restaurantName}</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < item.rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-800">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // Badge achievement
              <div className="p-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">{item.badge.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    New Badge Unlocked!
                  </h3>
                  <p className="text-purple-800 font-semibold">{item.badge.name}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    item.badge.rarity === 'Legendary' ? 'bg-yellow-200 text-yellow-800' :
                    item.badge.rarity === 'Epic' ? 'bg-purple-200 text-purple-800' :
                    item.badge.rarity === 'Rare' ? 'bg-blue-200 text-blue-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {item.badge.rarity}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                    <span className="text-sm">{item.likes}</span>
                  </button>
                  
                  {item.type === 'review' && (
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle size={20} />
                      <span className="text-sm">{item.comments}</span>
                    </button>
                  )}
                </div>
                
                <button className="text-gray-600 hover:text-gray-800 transition-colors">
                  <Share size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {allFeedItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Start sharing your food adventures to see them here!</p>
        </motion.div>
      )}
    </div>
  );
};

export default SocialFeed;