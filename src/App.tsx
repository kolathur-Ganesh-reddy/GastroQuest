import React from 'react';
import { useGameStore } from './store/gameStore';
import Layout from './components/Layout';
import Home from './components/Home';
import QuestBoard from './components/QuestBoard';
import FoodCourt3D from './components/FoodCourt3D';
import ReviewForm from './components/ReviewForm';
import Profile from './components/Profile';
import SocialFeed from './components/SocialFeed';

function App() {
  const { currentView } = useGameStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'quests':
        return <QuestBoard />;
      case 'court':
        return <FoodCourt3D />;
      case 'review':
        return <ReviewForm />;
      case 'profile':
        return <Profile />;
      case 'feed':
        return <SocialFeed />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;