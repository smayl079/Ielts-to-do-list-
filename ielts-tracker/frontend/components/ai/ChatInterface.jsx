import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="w-2 h-2 bg-primary rounded-full"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        className="w-2 h-2 bg-primary rounded-full"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        className="w-2 h-2 bg-primary rounded-full"
      />
    </div>
  );
};

const ChatMessage = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs ${
          isUser
            ? 'bg-gradient-to-r from-primary to-accent rounded-3xl rounded-tr-lg px-4 py-3 text-white'
            : 'glass rounded-3xl rounded-tl-lg px-4 py-3 text-text-primary'
        }`}
      >
        {typeof message === 'string' ? (
          <p className="text-sm leading-relaxed">{message}</p>
        ) : (
          message
        )}
      </div>
    </motion.div>
  );
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your IELTS tutor. How can I help you prepare today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'How to improve writing?',
    'Speaking tips',
    'Vocabulary exercise',
    'Practice test',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text = input) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: `Thanks for asking about "${text}". Here's some helpful information...\n\nI can provide detailed explanations, practice exercises, and personalized recommendations based on your learning goals.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass rounded-3xl rounded-tl-lg px-4 py-3">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs text-text-muted uppercase tracking-wide mb-3">
            Suggested questions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.map((question) => (
              <motion.button
                key={question}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSendMessage(question)}
                className="glass rounded-lg px-3 py-2 text-xs text-text-primary hover:border-primary/50 transition-all text-left"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex gap-3">
          <Input
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            icon={isLoading ? Loader2 : Send}
            isLoading={isLoading}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
