import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaRegCalendarPlus, FaFirstAid } from 'react-icons/fa';

const dummyLeaves = [
  {
    type: 'ANNUAL LEAVES',
    count: 12,
    icon: <FaCalendarAlt size={32} className="text-primary" />,
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10',
    description: 'Vacation time available',
    used: 3,
    total: 15
  },
  {
    type: 'CASUAL LEAVES',
    count: 8,
    icon: <FaRegCalendarPlus size={32} className="text-secondary" />,
    gradient: 'bg-gradient-to-br from-secondary/10 to-accent/10',
    description: 'Short breaks available',
    used: 2,
    total: 10
  },
  {
    type: 'SICK LEAVES',
    count: 5,
    icon: <FaFirstAid size={32} className="text-accent" />,
    gradient: 'bg-gradient-to-br from-accent/10 to-primary/10',
    description: 'Health leave available',
    used: 1,
    total: 6
  },
];

const CountingAnimation = ({ target, duration = 800, index }) => {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);
      setIsCounting(true);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsCounting(false);
        setIsComplete(true);
      }
    };

    // Start animation with delay based on index
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, index * 200);

    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, index]);

  return (
    <span 
      className={`transition-all duration-300 ${
        isCounting 
          ? 'animate-pulse text-warning drop-shadow-lg' 
          : isComplete 
            ? 'text-primary drop-shadow-lg animate-bounce' 
            : ''
      }`}
    >
      {count}
    </span>
  );
};

const RemainingLeavesCards = () => (
  <div className="flex flex-col gap-6 w-full">
    {dummyLeaves.map(({ type, count, icon, gradient, description, used, total }, index) => (
      <div
        key={type}
        className={`card shadow-xl ${gradient} border border-base-300 animate-fade-in transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className="card-body p-6 min-h-[140px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-base-100 rounded-xl shadow-md">
                {icon}
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold text-base-content">{type}</div>
                <div className="text-sm text-base-content/70">{description}</div>
                <div className="text-xs text-base-content/50 mt-1">
                  Used: {used} / Total: {total}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-base-content mb-1">
                <CountingAnimation target={count} duration={800} index={index} />
              </div>
              <div className="text-xs text-base-content/60 font-medium">Remaining</div>
              <div className="w-16 bg-base-300 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(count / total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RemainingLeavesCards; 