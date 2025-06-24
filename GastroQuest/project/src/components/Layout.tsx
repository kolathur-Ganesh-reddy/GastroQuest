import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map, Trophy, User, Camera, Users } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { ViewType } from '../types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentView, setCurrentView, user } = useGameStore();

  const navItems: { id: ViewType; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'quests', icon: <Trophy size={20} />, label: 'Quests' },
    { id: 'court', icon: <Map size={20} />, label: 'Food Court' },
    { id: 'review', icon: <Camera size={20} />, label: 'Review' },
    { id: 'feed', icon: <Users size={20} />, label: 'Feed' },
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                🍜 GastroQuest
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                <span className="text-yellow-600 font-semibold">{user.coins}</span>
                <span className="text-yellow-500">🪙</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                <div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${(user.xp / (user.xp + user.xpToNextLevel)) * 100}%` }}
                  />
                </div>
                <span className="text-blue-600 font-semibold text-sm">Lv.{user.level}</span>
              </div>
              
              <div className="text-2xl">{user.avatar}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-orange-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;