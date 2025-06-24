import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Mesh } from 'three';
import { foodStalls } from '../data/foodStalls';
import { useGameStore } from '../store/gameStore';

const ChefAvatar: React.FC<{ 
  position: [number, number, number]; 
  stall: typeof foodStalls[0];
  onClick: () => void;
}> = ({ position, stall, onClick }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Chef Body */}
      <Box
        ref={meshRef}
        args={[0.8, 1.2, 0.8]}
        position={[0, 0.6, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? '#ff6b35' : '#ff8c42'} />
      </Box>
      
      {/* Chef Hat */}
      <Box args={[0.9, 0.3, 0.9]} position={[0, 1.35, 0]}>
        <meshStandardMaterial color="white" />
      </Box>
      
      {/* Stall Base */}
      <Box args={[1.5, 0.8, 1.5]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>
      
      {/* Stall Name */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.2}
        color={hovered ? '#ff6b35' : '#333'}
        anchorX="center"
        anchorY="middle"
      >
        {stall.name}
      </Text>
      
      {/* Cuisine Type */}
      <Text
        position={[0, 1.7, 0]}
        fontSize={0.15}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {stall.cuisine}
      </Text>
    </group>
  );
};

const FoodCourt3D: React.FC = () => {
  const { setCurrentView, selectQuest, quests } = useGameStore();
  const [selectedStall, setSelectedStall] = useState<typeof foodStalls[0] | null>(null);

  const handleStallClick = (stall: typeof foodStalls[0]) => {
    setSelectedStall(stall);
  };

  const handleQuestStart = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest) {
      selectQuest(quest);
      setCurrentView('review');
    }
  };

  return (
    <div className="h-screen relative">
      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} />
        
        {/* Ground */}
        <Box args={[20, 0.1, 10]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#e8d5b7" />
        </Box>
        
        {/* Food Stalls */}
        {foodStalls.map((stall) => (
          <ChefAvatar
            key={stall.id}
            position={stall.position}
            stall={stall}
            onClick={() => handleStallClick(stall)}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="text-2xl font-bold mb-2">🏛️ GastroQuest Food Court</h1>
          <p className="text-orange-200">Click on chef avatars to explore their stalls!</p>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-4 right-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center"
        >
          <p className="text-sm text-gray-600">
            🖱️ Drag to rotate • 📏 Scroll to zoom • 👆 Click chefs to interact
          </p>
        </motion.div>
      </div>

      {/* Stall Details Modal */}
      {selectedStall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStall(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{selectedStall.chefAvatar}</div>
              <h2 className="text-xl font-bold text-gray-900">{selectedStall.name}</h2>
              <p className="text-orange-600 font-semibold">{selectedStall.cuisine} Cuisine</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Signature Dishes</h3>
                <div className="space-y-1">
                  {selectedStall.dishes.map((dish, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      🍽️ {dish}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Available Quests</h3>
                <div className="space-y-2">
                  {selectedStall.relatedQuests.map((questId) => {
                    const quest = quests.find(q => q.id === questId);
                    if (!quest) return null;
                    
                    return (
                      <div key={questId} className="bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{quest.title}</div>
                            <div className="text-sm text-gray-600">{quest.xp} XP • {quest.coins} coins</div>
                          </div>
                          <button
                            onClick={() => handleQuestStart(questId)}
                            className="bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStall(null)}
              className="w-full mt-6 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FoodCourt3D;