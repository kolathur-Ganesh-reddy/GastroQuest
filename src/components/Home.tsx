import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Home: React.FC = () => {
  const { user, quests, setCurrentView } = useGameStore();

  const dailyQuests = quests.filter(q => !q.isLocked).slice(0, 3);
  const recentBadges = user.badges.slice(-3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}! 👋</h1>
          <p className="text-orange-100 mb-6">Your next culinary adventure awaits!</p>
          
          <motion.button
            onClick={() => setCurrentView('quests')}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Quest 🚀
          </motion.button>
        </div>
        
        <div className="absolute -right-4 -top-4 text-6xl opacity-20">🍕</div>
        <div className="absolute -left-4 -bottom-4 text-4xl opacity-20">🌮</div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-gray-900">{user.completedQuests.length}</div>
          <div className="text-sm text-gray-600">Quests Done</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-2">🎖️</div>
          <div className="text-2xl font-bold text-gray-900">{user.badges.length}</div>
          <div className="text-sm text-gray-600">Badges</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-gray-900">{user.level}</div>
          <div className="text-sm text-gray-600">Level</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <div className="text-2xl mb-2">🪙</div>
          <div className="text-2xl font-bold text-gray-900">{user.coins}</div>
          <div className="text-sm text-gray-600">Coins</div>
        </motion.div>
      </div>

      {/* Daily Quests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Clock className="mr-2 text-orange-600" size={24} />
            Today's Featured Quests
          </h2>
          <button
            onClick={() => setCurrentView('quests')}
            className="text-orange-600 font-semibold hover:text-orange-700"
          >
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {dailyQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                setCurrentView('quests');
              }}
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden group-hover:bg-gray-100 transition-colors">
                <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 relative">
                  <img
                    src={quest.image}
                    alt={quest.title}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-white text-xs font-semibold">{quest.xp} XP</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{quest.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quest.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{quest.completedBy} completed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Badges */}
      {recentBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="mr-2 text-yellow-500" size={24} />
            Recent Achievements
          </h2>

          <div className="flex space-x-4">
            {recentBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;