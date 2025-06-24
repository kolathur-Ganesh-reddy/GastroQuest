export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  badges: Badge[];
  completedQuests: string[];
  reviews: Review[];
  joinedDate: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  image: string;
  category: QuestCategory;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  coins: number;
  requirements: string[];
  timeLimit?: number; // in hours
  isLocked: boolean;
  completedBy: number;
  badge?: Badge;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlockedAt?: Date;
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  dishName: string;
  restaurantName: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  questsCompleted: string[];
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
}

export interface FoodStall {
  id: string;
  name: string;
  position: [number, number, number];
  cuisine: string;
  chefAvatar: string;
  dishes: string[];
  relatedQuests: string[];
}

export type QuestCategory = 'Spicy' | 'Vegan' | 'International' | 'Dessert' | 'Healthy' | 'Street Food' | 'Comfort Food';

export type ViewType = 'home' | 'quests' | 'court' | 'profile' | 'feed' | 'review';