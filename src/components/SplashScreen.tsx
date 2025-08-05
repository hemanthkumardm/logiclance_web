import { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="text-center">
        <div className="animate-pulse">
          <Cpu className="h-24 w-24 text-white mx-auto mb-6" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">LogicLance</h1>
        <p className="text-white/80 text-lg">Streamlined ASIC Design Platform</p>
        <div className="mt-8">
          <div className="w-48 h-1 bg-white/20 rounded-full mx-auto">
            <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;