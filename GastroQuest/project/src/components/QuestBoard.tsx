import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Users, Filter, Search } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { QuestCategory } from '../types';

const QuestBoard: React.FC = () => {
  const { quests, user, selectQuest, setCurrentView, completeQuest } = useGameStore();
  const [filter, setFilter] = useState<QuestCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: (QuestCategory | 'All')[] = [
    'All', 'Spicy', 'Vegan', 'International', 'Dessert', 'Healthy', 'Street Food', 'Comfort Food'
  ];

  const filteredQuests = quests.filter(quest => {
    const matchesFilter = filter === 'All' || quest.category === filter;
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCompleteQuest = (questId: string) => {
    completeQuest(questId);
    // Show some celebration animation here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quest Board</h1>
        <p className="text-gray-600">Choose your culinary adventure and earn XP, coins, and badges!</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quest Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map((quest, index) => {
          const isCompleted = user.completedQuests.includes(quest.id);
          
          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                quest.isLocked ? 'opacity-60' : 'cursor-pointer hover:-translate-y-1'
              }`}
              onClick={() => !quest.isLocked && selectQuest(quest)}
            >
              {/* Image */}
              <div className="relative aspect-video">
                <img
                  src={quest.image}
                  alt={quest.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {quest.isLocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl mb-2">🔒</div>
                      <div className="text-sm">Locked</div>
                    </div>
                  </div>
                )}
                
                {isCompleted && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Completed
                  </div>
                )}
                
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs font-semibold">{quest.xp} XP</span>
                </div>
                
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-bold text-lg mb-1">{quest.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2">{quest.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {quest.difficulty}
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    {quest.category}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Users size={14} className="mr-1" />
                      {quest.completedBy}
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <span className="mr-1">🪙</span>
                      {quest.coins}
                    </div>
                  </div>
                  
                  {quest.timeLimit && (
                    <div className="flex items-center text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {quest.timeLimit}h
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {!quest.isLocked && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCompleted) {
                        setCurrentView('profile');
                      } else {
                        setCurrentView('review');
                        selectQuest(quest);
                      }
                    }}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                      isCompleted
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCompleted ? 'View Badge' : 'Start Quest'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredQuests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quests found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default QuestBoard;