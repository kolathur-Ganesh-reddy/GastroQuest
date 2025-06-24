import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Star, Trophy, Coins } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Profile: React.FC = () => {
  const { user, quests } = useGameStore();

  const completedQuests = quests.filter(q => user.completedQuests.includes(q.id));
  const totalXPEarned = completedQuests.reduce((sum, quest) => sum + quest.xp, 0);
  const totalCoinsEarned = completedQuests.reduce((sum, quest) => sum + quest.coins, 0);

  const levelProgress = (user.xp / (user.xp + user.xpToNextLevel)) * 100;

  const badgesByRarity = {
    Legendary: user.badges.filter(b => b.rarity === 'Legendary'),
    Epic: user.badges.filter(b => b.rarity === 'Epic'),
    Rare: user.badges.filter(b => b.rarity === 'Rare'),
    Common: user.badges.filter(b => b.rarity === 'Common'),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-20">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-6xl">{user.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-orange-100">{user.email}</p>
              <div className="flex items-center mt-2 text-sm">
                <Calendar size={16} className="mr-1" />
                Joined {user.joinedDate.toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Level {user.level}</span>
              <span className="text-sm">{user.xp} / {user.xp + user.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <Trophy className="mx-auto text-yellow-500 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{user.completedQuests.length}</div>
          <div className="text-sm text-gray-600">Quests Completed</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <Award className="mx-auto text-purple-500 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{user.badges.length}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <Star className="mx-auto text-blue-500 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{totalXPEarned}</div>
          <div className="text-sm text-gray-600">Total XP</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <Coins className="mx-auto text-yellow-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-900">{user.coins}</div>
          <div className="text-sm text-gray-600">Coins</div>
        </motion.div>
      </div>

      {/* Badge Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="mr-2 text-purple-500" size={24} />
          Badge Collection
        </h2>

        {Object.entries(badgesByRarity).map(([rarity, badges]) => {
          if (badges.length === 0) return null;
          
          return (
            <div key={rarity} className="mb-6 last:mb-0">
              <h3 className={`font-semibold mb-3 ${
                rarity === 'Legendary' ? 'text-yellow-600' :
                rarity === 'Epic' ? 'text-purple-600' :
                rarity === 'Rare' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {rarity} ({badges.length})
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-xl text-center ${
                      rarity === 'Legendary' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' :
                      rarity === 'Epic' ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                      rarity === 'Rare' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                      'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-semibold text-sm text-gray-900">{badge.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                    {badge.unlockedAt && (
                      <div className="text-xs text-gray-500 mt-1">
                        {badge.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {user.badges.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-gray-600">Complete quests to earn your first badges!</p>
          </div>
        )}
      </motion.div>

      {/* Completed Quests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={24} />
          Completed Quests
        </h2>

        {completedQuests.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {completedQuests.map((quest) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-50 rounded-xl p-4 border border-green-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✅</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                        +{quest.xp} XP
                      </span>
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                        +{quest.coins} coins
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-600">Start completing quests to build your achievement history!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;