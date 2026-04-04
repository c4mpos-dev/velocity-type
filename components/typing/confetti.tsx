'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  rotation: number;
  scale: number;
  color: string;
  duration: number;
}

interface ConfettiProps {
  isActive: boolean;
  particleCount?: number;
}

const colors = [
  'var(--primary)',
  'var(--chart-2)',
  'var(--chart-4)',
  'var(--correct)',
];

export function Confetti({ isActive, particleCount = 50 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 720 - 360,
        scale: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 2 + 2,
      }));
      setPieces(newPieces);

      const timeout = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(timeout);
    }
  }, [isActive, particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: `${piece.x}vw`,
              y: -20,
              rotate: 0,
              scale: piece.scale,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: piece.rotation,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: [0.1, 0.25, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
