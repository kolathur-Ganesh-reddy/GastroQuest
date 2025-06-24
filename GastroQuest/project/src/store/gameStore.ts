import { create } from 'zustand';
import { User, Quest, Review, Badge, ViewType } from '../types';

interface GameState {
  user: User;
  currentView: ViewType;
  quests: Quest[];
  reviews: Review[];
  selectedQuest: Quest | null;
  
  // Actions
  setCurrentView: (view: ViewType) => void;
  selectQuest: (quest: Quest | null) => void;
  completeQuest: (questId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'userId' | 'username' | 'userAvatar' | 'createdAt' | 'likes' | 'comments'>) => void;
  gainXP: (amount: number) => void;
  gainCoins: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
}

// Mock data
const mockUser: User = {
  id: '1',
  username: 'FoodExplorer',
  email: 'explorer@gastroquest.com',
  avatar: '👨‍🍳',
  level: 8,
  xp: 2350,
  xpToNextLevel: 650,
  coins: 1250,
  badges: [
    { id: '1', name: 'First Bite', description: 'Complete your first quest', icon: '🍽️', rarity: 'Common' },
    { id: '2', name: 'Spice Master', description: 'Complete 5 spicy food quests', icon: '🌶️', rarity: 'Rare' },
    { id: '3', name: 'Globe Trotter', description: 'Try dishes from 10 different countries', icon: '🌍', rarity: 'Epic' },
  ],
  completedQuests: ['1', '3', '5', '7', '9'],
  reviews: [],
  joinedDate: new Date('2024-01-15'),
};

const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'Spice Challenge',
    description: 'Try a dish with a spice level of 4+ peppers',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Spicy',
    difficulty: 'Medium',
    xp: 150,
    coins: 75,
    requirements: ['Spice level 4+', 'Rate the dish'],
    isLocked: false,
    completedBy: 342,
    badge: { id: '4', name: 'Fire Tongue', description: 'Conquered the spice challenge', icon: '🔥', rarity: 'Rare' }
  },
  {
    id: '2',
    title: 'Plant Power',
    description: 'Discover an amazing vegan dish',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegan',
    difficulty: 'Easy',
    xp: 100,
    coins: 50,
    requirements: ['Must be 100% vegan', 'Include photo'],
    isLocked: false,
    completedBy: 578,
  },
  {
    id: '3',
    title: 'Around the World',
    description: 'Try a dish from a cuisine you\'ve never had before',
    image: 'https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'International',
    difficulty: 'Medium',
    xp: 200,
    coins: 100,
    requirements: ['New cuisine type', 'Learn about the dish origin'],
    isLocked: false,
    completedBy: 234,
  },
  {
    id: '4',
    title: 'Sweet Dreams',
    description: 'Find the perfect dessert to end your meal',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dessert',
    difficulty: 'Easy',
    xp: 120,
    coins: 60,
    requirements: ['Must be dessert', 'Rate sweetness level'],
    isLocked: false,
    completedBy: 892,
  },
  {
    id: '5',
    title: 'Street Food Safari',
    description: 'Hunt down authentic street food',
    image: 'https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Street Food',
    difficulty: 'Hard',
    xp: 250,
    coins: 125,
    requirements: ['From street vendor', 'Under $10', 'Share location'],
    isLocked: true,
    completedBy: 156,
  },
  {
    id: '6',
    title: 'Comfort Zone',
    description: 'Indulge in the ultimate comfort food',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Comfort Food',
    difficulty: 'Easy',
    xp: 100,
    coins: 50,
    requirements: ['Classic comfort dish', 'Share childhood memory'],
    isLocked: false,
    completedBy: 723,
  },
];

export const useGameStore = create<GameState>((set, get) => ({
  user: mockUser,
  currentView: 'home',
  quests: mockQuests,
  reviews: [],
  selectedQuest: null,

  setCurrentView: (view) => set({ currentView: view }),
  
  selectQuest: (quest) => set({ selectedQuest: quest }),
  
  completeQuest: (questId) => set((state) => {
    const quest = state.quests.find(q => q.id === questId);
    if (!quest || state.user.completedQuests.includes(questId)) return state;
    
    const updatedUser = {
      ...state.user,
      completedQuests: [...state.user.completedQuests, questId],
      xp: state.user.xp + quest.xp,
      coins: state.user.coins + quest.coins,
    };
    
    // Check for level up
    if (updatedUser.xp >= updatedUser.xp + updatedUser.xpToNextLevel) {
      updatedUser.level += 1;
      updatedUser.xpToNextLevel = Math.floor(updatedUser.xpToNextLevel * 1.5);
    }
    
    return { user: updatedUser };
  }),
  
  addReview: (reviewData) => set((state) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      userId: state.user.id,
      username: state.user.username,
      userAvatar: state.user.avatar,
      createdAt: new Date(),
      likes: 0,
      comments: [],
    };
    
    return {
      reviews: [newReview, ...state.reviews],
      user: {
        ...state.user,
        coins: state.user.coins + 25, // Bonus coins for reviewing
      }
    };
  }),
  
  gainXP: (amount) => set((state) => ({
    user: { ...state.user, xp: state.user.xp + amount }
  })),
  
  gainCoins: (amount) => set((state) => ({
    user: { ...state.user, coins: state.user.coins + amount }
  })),
  
  unlockBadge: (badge) => set((state) => ({
    user: {
      ...state.user,
      badges: [...state.user.badges, { ...badge, unlockedAt: new Date() }]
    }
  })),
}));