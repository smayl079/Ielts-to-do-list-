import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Volume2, X } from 'lucide-react';

const VocabCard = ({
  word,
  pronunciation,
  meaning,
  example,
  difficulty = 'medium',
  synonyms = [],
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyColor = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger',
  }[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-64 cursor-pointer"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute w-full h-full"
        >
          <Card className="p-8 h-full flex flex-col justify-between items-start">
            <div className="w-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-text-primary gradient-text mb-1">
                    {word}
                  </h3>
                  <p className="text-text-muted text-sm italic">{pronunciation}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-surface/50 rounded-lg"
                >
                  <Volume2 size={20} className="text-primary" />
                </motion.button>
              </div>

              <Badge variant={difficultyColor} className="mt-4">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>

            <div className="text-text-muted text-center w-full">
              <p className="text-sm">Click to reveal meaning</p>
            </div>
          </Card>
        </motion.div>

        {/* Back */}
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute w-full h-full"
        >
          <Card className="p-8 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-primary mb-3">Meaning</h4>
              <p className="text-text-primary text-base leading-relaxed mb-6">
                {meaning}
              </p>

              <h4 className="text-lg font-bold text-accent mb-2">Example</h4>
              <p className="text-text-muted text-sm italic leading-relaxed">
                "{example}"
              </p>
            </div>

            {synonyms.length > 0 && (
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
                  Synonyms
                </p>
                <div className="flex flex-wrap gap-2">
                  {synonyms.map((syn) => (
                    <Badge key={syn} variant="muted" size="sm">
                      {syn}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default VocabCard;
