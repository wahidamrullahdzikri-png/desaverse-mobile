import React, { useState, useEffect } from 'react';
import { CharacterType, CharacterExpression } from '../types';

interface CharacterAvatarProps {
  character: CharacterType;
  expression: CharacterExpression;
  size?: 'sm' | 'md' | 'lg';
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  expression,
  size = 'md',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking effect timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-64 md:h-64',
  }[size];

  // Motion class based on character expression
  const motionClass = {
    happy: 'animate-bounce-subtle',
    surprised: 'animate-pulse',
    thinking: 'animate-bounce-subtle',
    sad: 'opacity-90',
    proud: 'scale-105',
  }[expression] || '';

  // Emotion status bubble indicator above character head
  const renderEmotionBubble = () => {
    switch (expression) {
      case 'happy':
        return <span className="absolute -top-3 right-0 text-2xl animate-bounce">✨</span>;
      case 'surprised':
        return <span className="absolute -top-4 right-0 text-3xl font-black text-amber-500 animate-ping">⚡</span>;
      case 'thinking':
        return <span className="absolute -top-4 right-0 text-2xl animate-pulse">💡</span>;
      case 'sad':
        return <span className="absolute -top-3 right-0 text-2xl animate-bounce">💧</span>;
      case 'proud':
        return <span className="absolute -top-4 right-0 text-2xl animate-bounce">🌟</span>;
      default:
        return null;
    }
  };

  const renderExpressionFace = () => {
    if (isBlinking) {
      return (
        <g>
          {/* Blinking Eyes */}
          <line x1="34" y1="42" x2="48" y2="42" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <line x1="62" y1="42" x2="76" y2="42" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <path d="M 40 58 Q 55 64 70 58" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    }

    switch (expression) {
      case 'happy':
        return (
          <g>
            <path d="M 35 42 Q 42 34 49 42" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <path d="M 61 42 Q 68 34 75 42" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <path d="M 36 54 Q 55 76 74 54 Z" fill="#FF6B6B" stroke="#000" strokeWidth="3.5" />
            <circle cx="28" cy="50" r="6" fill="#FF8E8E" opacity="0.8" />
            <circle cx="82" cy="50" r="6" fill="#FF8E8E" opacity="0.8" />
          </g>
        );
      case 'sad':
        return (
          <g>
            <circle cx="42" cy="42" r="4" fill="#000" />
            <circle cx="68" cy="42" r="4" fill="#000" />
            <path d="M 36 36 L 46 40" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 74 36 L 64 40" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 40 62 Q 55 52 70 62" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <path d="M 72 48 Q 70 56 72 58 Q 74 56 72 48" fill="#4D96FF" />
          </g>
        );
      case 'thinking':
        return (
          <g>
            <circle cx="44" cy="40" r="4.5" fill="#000" />
            <circle cx="70" cy="40" r="4.5" fill="#000" />
            <path d="M 36 34 Q 42 28 48 34" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 64 28 Q 70 22 76 28" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 44 58 Q 55 62 66 56" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <text x="88" y="32" fontSize="20" fontWeight="900" fill="#F59E0B" stroke="#000" strokeWidth="1">?</text>
          </g>
        );
      case 'surprised':
        return (
          <g>
            <circle cx="40" cy="40" r="8" fill="#FFF" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="40" r="3.5" fill="#000" />
            <circle cx="70" cy="40" r="8" fill="#FFF" stroke="#000" strokeWidth="3" />
            <circle cx="70" cy="40" r="3.5" fill="#000" />
            <path d="M 32 26 Q 40 20 48 26" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 62 26 Q 70 20 78 26" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="55" cy="60" rx="10" ry="14" fill="#FF6B6B" stroke="#000" strokeWidth="3" />
          </g>
        );
      case 'proud':
      default:
        return (
          <g>
            <path d="M 36 40 Q 42 34 48 40" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
            <circle cx="68" cy="40" r="4.5" fill="#000" />
            <path d="M 38 54 Q 55 70 72 54 Z" fill="#FF6B6B" stroke="#000" strokeWidth="3" />
            <path d="M 85 22 L 87 27 L 92 29 L 87 31 L 85 36 L 83 31 L 78 29 L 83 27 Z" fill="#FFD93D" stroke="#000" strokeWidth="1.5" />
          </g>
        );
    }
  };

  const renderCharacterSVG = () => {
    switch (character) {
      case 'windah':
        return (
          <div className="w-full h-full rounded-full border-4 border-black overflow-hidden bg-white relative">
            <img 
              src="/images/windah_avatar.jpg" 
              alt="Windah Avatar" 
              className="w-full h-full object-cover" 
            />
            {/* Overlay the expression face on top of the image to keep animations or just let the image handle it */}
          </div>
        );

      case 'pak_jaya':
        return (
          <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-xl">
            <path d="M 25 30 Q 55 8 85 30 Z" fill="#2563EB" stroke="#000" strokeWidth="3.5" />
            <rect x="18" y="28" width="74" height="8" rx="4" fill="#1D4ED8" stroke="#000" strokeWidth="3" />
            <text x="55" y="24" textAnchor="middle" fontSize="12" fill="#FFF" fontWeight="bold">♻️</text>
            <ellipse cx="55" cy="54" rx="33" ry="31" fill="#FFD1A4" stroke="#000" strokeWidth="4" />
            <circle cx="42" cy="44" r="10" fill="none" stroke="#000" strokeWidth="3.5" />
            <circle cx="68" cy="44" r="10" fill="none" stroke="#000" strokeWidth="3.5" />
            <line x1="52" y1="44" x2="58" y2="44" stroke="#000" strokeWidth="3.5" />
            {renderExpressionFace()}
            <path d="M 26 84 L 84 84 L 90 110 L 20 110 Z" fill="#3B82F6" stroke="#000" strokeWidth="3.5" />
          </svg>
        );

      case 'pak_tani':
        return (
          <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-xl">
            <polygon points="55,2 10,36 100,36" fill="#F59E0B" stroke="#000" strokeWidth="4" />
            <line x1="10" y1="36" x2="100" y2="36" stroke="#000" strokeWidth="4" />
            <ellipse cx="55" cy="56" rx="32" ry="30" fill="#E5A670" stroke="#000" strokeWidth="4" />
            <path d="M 40 56 Q 55 64 70 56 Q 55 52 40 56 Z" fill="#374151" stroke="#000" strokeWidth="2" />
            {renderExpressionFace()}
            <path d="M 25 84 L 85 84 L 90 110 L 20 110 Z" fill="#10B981" stroke="#000" strokeWidth="3.5" />
          </svg>
        );

      case 'bu_rina':
        return (
          <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-xl">
            <circle cx="55" cy="22" r="18" fill="#4B5563" stroke="#000" strokeWidth="3.5" />
            <ellipse cx="55" cy="54" rx="32" ry="30" fill="#FFD1A4" stroke="#000" strokeWidth="4" />
            <path d="M 22 45 Q 55 25 88 45" fill="none" stroke="#EC4899" strokeWidth="6" />
            {renderExpressionFace()}
            <path d="M 25 82 L 85 82 L 90 110 L 20 110 Z" fill="#F43F5E" stroke="#000" strokeWidth="3.5" />
          </svg>
        );

      case 'warga':
      default:
        return (
          <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-xl">
            <path d="M 25 38 Q 55 15 85 38 Z" fill="#374151" stroke="#000" strokeWidth="3.5" />
            <ellipse cx="55" cy="52" rx="32" ry="30" fill="#FFE0BD" stroke="#000" strokeWidth="4" />
            {renderExpressionFace()}
            <path d="M 26 82 L 84 82 L 90 110 L 20 110 Z" fill="#FFD93D" stroke="#000" strokeWidth="3.5" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses} ${motionClass} transition-transform duration-300 hover:scale-105 select-none`}>
      {renderEmotionBubble()}
      {renderCharacterSVG()}
    </div>
  );
};
