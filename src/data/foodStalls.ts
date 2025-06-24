import { FoodStall } from '../types';

export const foodStalls: FoodStall[] = [
  {
    id: '1',
    name: 'Spice Garden',
    position: [-3, 0, 0],
    cuisine: 'Indian',
    chefAvatar: '👨‍🍳',
    dishes: ['Butter Chicken', 'Biryani', 'Vindaloo'],
    relatedQuests: ['1'],
  },
  {
    id: '2',
    name: 'Green Haven',
    position: [-1, 0, 0],
    cuisine: 'Vegan',
    chefAvatar: '👩‍🍳',
    dishes: ['Quinoa Bowl', 'Jackfruit Tacos', 'Acai Bowl'],
    relatedQuests: ['2'],
  },
  {
    id: '3',
    name: 'World Kitchen',
    position: [1, 0, 0],
    cuisine: 'Fusion',
    chefAvatar: '🧑‍🍳',
    dishes: ['Korean BBQ Tacos', 'Sushi Burrito', 'Thai Pizza'],
    relatedQuests: ['3'],
  },
  {
    id: '4',
    name: 'Sweet Dreams Bakery',
    position: [3, 0, 0],
    cuisine: 'Desserts',
    chefAvatar: '👨‍🍳',
    dishes: ['Chocolate Lava Cake', 'Tiramisu', 'Crème Brûlée'],
    relatedQuests: ['4'],
  },
  {
    id: '5',
    name: 'Street Bites',
    position: [5, 0, 0],
    cuisine: 'Street Food',
    chefAvatar: '👩‍🍳',
    dishes: ['Fish Tacos', 'Pad Thai', 'Hot Dogs'],
    relatedQuests: ['5'],
  },
];