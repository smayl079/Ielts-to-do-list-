import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import VocabCard from '../components/vocabulary/VocabCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

const VocabularyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vocabularyList = [
    {
      id: 1,
      word: 'Resilient',
      pronunciation: '/rɪˈzɪliənt/',
      meaning: 'Able to withstand or recover quickly from difficult conditions',
      example:
        'The resilient team managed to complete the project despite numerous challenges.',
      difficulty: 'hard',
      synonyms: ['Strong', 'Tough', 'Flexible'],
    },
    {
      id: 2,
      word: 'Ubiquitous',
      pronunciation: '/juːˈbɪkwɪtəs/',
      meaning: 'Present, appearing, or found everywhere',
      example:
        'Smartphones have become ubiquitous in modern society, with nearly everyone owning one.',
      difficulty: 'hard',
      synonyms: ['Omnipresent', 'Universal', 'Widespread'],
    },
    {
      id: 3,
      word: 'Ephemeral',
      pronunciation: '/ɪˈfem(ə)rəl/',
      meaning: 'Lasting for a very short time; short-lived',
      example:
        'The beauty of cherry blossoms is ephemeral, lasting only a few weeks each spring.',
      difficulty: 'hard',
      synonyms: ['Fleeting', 'Temporary', 'Transitory'],
    },
    {
      id: 4,
      word: 'Pragmatic',
      pronunciation: '/præɡˈmætɪk/',
      meaning: 'Dealing with things in a realistic way based on practical considerations',
      example:
        'Taking a pragmatic approach, the company decided to focus on improving customer service.',
      difficulty: 'medium',
      synonyms: ['Practical', 'Realistic', 'Sensible'],
    },
    {
      id: 5,
      word: 'Benevolent',
      pronunciation: '/bəˈnev(ə)lənt/',
      meaning: 'Kind and generous; showing goodwill',
      example:
        'The benevolent donor established a foundation to support underprivileged children.',
      difficulty: 'medium',
      synonyms: ['Kind', 'Generous', 'Charitable'],
    },
    {
      id: 6,
      word: 'Happy',
      pronunciation: '/ˈhæpi/',
      meaning: 'Feeling or showing pleasure or contentment',
      example: 'I am happy to help with your project.',
      difficulty: 'easy',
      synonyms: ['Joyful', 'Content', 'Pleased'],
    },
  ];

  const filteredVocab =
    selectedDifficulty === 'all'
      ? vocabularyList.filter((v) =>
          v.word.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : vocabularyList.filter(
          (v) =>
            v.difficulty === selectedDifficulty &&
            v.word.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Layout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Vocabulary
            </h1>
            <p className="text-text-muted">
              Build your IELTS vocabulary and improve your language skills
            </p>
          </div>
          <Button icon={Plus} variant="accent">
            Add Word
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            placeholder="Search vocabulary..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            {['all', 'easy', 'medium', 'hard'].map((diff) => (
              <motion.button
                key={diff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border hover:border-primary/50 text-text-primary'
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-primary">{vocabularyList.length}</p>
          <p className="text-text-muted text-sm">Total Words</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-success">1,243</p>
          <p className="text-text-muted text-sm">Words Learned</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-accent">12</p>
          <p className="text-text-muted text-sm">Day Streak</p>
        </Card>
      </motion.div>

      {/* Vocabulary Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredVocab.map((vocab) => (
          <motion.div key={vocab.id} variants={itemVariants}>
            <VocabCard
              word={vocab.word}
              pronunciation={vocab.pronunciation}
              meaning={vocab.meaning}
              example={vocab.example}
              difficulty={vocab.difficulty}
              synonyms={vocab.synonyms}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredVocab.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-text-muted text-lg mb-4">No vocabulary found</p>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('all');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </Layout>
  );
};

export default VocabularyPage;
