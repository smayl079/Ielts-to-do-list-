# IELTS Tracker - Premium UI/UX Documentation

A modern, premium IELTS preparation web application built with **Next.js**, **TailwindCSS**, and **Framer Motion**. Designed with a dark theme inspired by Linear, Vercel, and Raycast.

## 🎨 Design System

### Color Palette
- **Background**: #0a0e1a (Deep Navy)
- **Surface**: #111827 (Dark Card)
- **Border**: #1f2937 (Subtle)
- **Primary**: #6366f1 (Indigo)
- **Accent**: #8b5cf6 (Violet)
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Text Primary**: #f9fafb
- **Text Muted**: #6b7280

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: font-bold, tracking-tight
- **Body**: font-normal, leading-relaxed
- **Mono**: font-mono (for scores/stats)

## 📁 Project Structure

```
frontend/
├── components/
│   ├── ui/                 # Base UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Skeleton.jsx
│   │   └── index.js
│   ├── layout/            # Layout wrapper components
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Layout.jsx
│   │   └── index.js
│   ├── dashboard/         # Dashboard specific components
│   │   ├── MetricCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── WeeklyChart.jsx
│   │   ├── ActivityHeatmap.jsx
│   │   └── index.js
│   ├── vocabulary/        # Vocabulary features
│   │   └── VocabCard.jsx
│   ├── calculator/        # Score calculator
│   │   └── ScoreCalculator.jsx
│   ├── ai/               # AI features
│   │   └── ChatInterface.jsx
│   ├── auth/             # Authentication components
│   │   └── AuthCard.jsx
│   └── index.js
├── pages/
│   ├── index.jsx          # Home page
│   ├── dashboard.jsx      # Dashboard
│   ├── vocabulary.jsx     # Vocabulary builder
│   ├── calculator.jsx     # Score calculator
│   ├── progress.jsx       # Progress tracking
│   ├── ai.jsx             # AI assistant
│   ├── settings.jsx       # User settings
│   ├── auth/
│   │   ├── login.jsx      # Login page
│   │   └── signup.jsx     # Signup page
│   ├── _app.jsx           # Next.js app wrapper
│   ├── _document.jsx      # Next.js HTML wrapper
│   └── 404.jsx            # 404 page
├── styles/
│   └── globals.css        # Global styles & animations
├── utils/
│   ├── helpers.js         # Utility functions
│   ├── api.js             # API configuration
│   ├── animations.js      # Framer Motion variants
│   ├── constants.js       # App constants
│   ├── hooks.js           # Custom React hooks
│   ├── axios.js           # Axios instance
│   └── auth.js            # Auth utilities
├── tailwind.config.js     # TailwindCSS configuration
├── postcss.config.js      # PostCSS configuration
├── next.config.js         # Next.js configuration
└── package.json

```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Install additional packages (if not already installed)
npm install framer-motion lucide-react clsx class-variance-authority

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Create optimized export
npm run export
```

## 🎯 Key Features

### 1. **Dashboard** (`/dashboard`)
- Metric cards with animated counters
- Real-time progress tracking
- Skill progress bars with gradient fills
- Weekly activity chart
- Activity heatmap (GitHub-style)
- Daily goals checklist

### 2. **Vocabulary Builder** (`/vocabulary`)
- Flip card animations
- Difficulty levels (Easy, Medium, Hard)
- Search and filter functionality
- Word statistics
- Synonym display

### 3. **Score Calculator** (`/calculator`)
- Interactive sliders for each IELTS module
- Real-time band score calculation
- Visual band score display with glow effect
- Score breakdown by module
- Color-coded results (Green: 7+, Amber: 5-6.5, Red: <5)

### 4. **Progress Tracking** (`/progress`)
- Radar chart for skill balance
- Daily study time bar chart
- Detailed skill breakdown
- Weekly goals progress
- PDF export functionality

### 5. **AI Assistant** (`/ai`)
- Chat interface with typing animation
- Suggested question chips
- Real-time message display
- Glass-morphism design

### 6. **Authentication** (`/auth/login`, `/auth/signup`)
- Modern login & signup pages
- Animated gradient backgrounds
- Password strength indicator
- Social login buttons
- Form validation

### 7. **Settings** (`/settings`)
- Account management
- Notification preferences
- Privacy & security settings
- Toggle switches with smooth animations

## 🎨 Component Usage

### Button
```jsx
import { Button } from '@/components/ui';
import { Save } from 'lucide-react';

<Button 
  variant="primary" 
  size="md" 
  icon={Save}
  isLoading={false}
>
  Save Changes
</Button>
```

**Variants**: primary, secondary, danger, success, ghost, accent
**Sizes**: xs, sm, md, lg, xl

### Card
```jsx
import { Card } from '@/components/ui';

<Card glass clickable>
  <p>Glass morphism card</p>
</Card>
```

### Badge
```jsx
import { Badge } from '@/components/ui';
import { Star } from 'lucide-react';

<Badge variant="success" size="md" icon={Star}>
  Excellent
</Badge>
```

**Variants**: default, secondary, success, warning, danger, muted

### Input
```jsx
import { Input } from '@/components/ui';
import { Mail } from 'lucide-react';

<Input
  label="Email"
  placeholder="you@example.com"
  icon={Mail}
  error={errorMessage}
/>
```

### Modal
```jsx
import { Modal } from '@/components/ui';

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit">
  {/* Content */}
</Modal>
```

### Toast
```jsx
import { useToast } from '@/components/ui';

const { addToast } = useToast();
addToast('Success!', 'success');
addToast('Error!', 'error');
```

## 🎬 Animations

### Built-in Animations
- **Fade In**: opacity transition
- **Slide Up**: slide up with fade
- **Scale In**: scale and fade
- **Count Up**: animated number counter
- **Typing**: dots bounce animation

### Custom Animations with Framer Motion

```jsx
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/utils/animations';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={slideUp}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

## 🎨 Tailwind Custom Classes

### Glass Morphism
```html
<div class="glass">Glass effect background</div>
<div class="glass-dark">Dark glass effect</div>
```

### Gradients
```html
<div class="gradient-bg">Indigo to Violet gradient</div>
<div class="gradient-text">Text with gradient</div>
<div class="gradient-bg-subtle">Subtle gradient background</div>
```

### Glow Effects
```html
<div class="glow-primary">Primary glow</div>
<div class="glow-accent">Accent glow</div>
<div class="glow-success">Success glow</div>
<div class="glow-danger">Danger glow</div>
```

## 📊 Charts

Using **Recharts** for data visualization:

```jsx
import { WeeklyChart } from '@/components/dashboard';

<WeeklyChart data={data} type="bar" />
```

### Supported Chart Types
- Bar Chart
- Area Chart
- Line Chart
- Radar Chart (Skill Balance)

## 💾 State Management

### useToast Hook
```jsx
const { toasts, addToast, removeToast } = useToast();

// Add toast
addToast('Message', 'success', 3000);

// Types: success, error, warning, info
```

### useLocalStorage Hook
```jsx
const [settings, setSettings] = useLocalStorage('settings', {});
```

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Tailwind Config
Located in `tailwind.config.js`:
- Custom colors
- Custom animations
- Glass morphism utilities
- Extended theme

## 📱 Responsive Design

- **Mobile**: Sidebar collapses to hamburger menu
- **Tablet**: Stack layout with optimized spacing
- **Desktop**: Full sidebar with multi-column layouts
- **All devices**: Touch-friendly (44px minimum tap targets)

## 🎯 Best Practices

1. **Use Layout wrapper** for all pages:
   ```jsx
   <Layout>{content}</Layout>
   ```

2. **Import from index files** for cleaner imports:
   ```jsx
   import { Button, Card, Badge } from '@/components/ui';
   ```

3. **Use motion components** for animations:
   ```jsx
   import { motion } from 'framer-motion';
   ```

4. **Always use Lucide icons**:
   ```jsx
   import { Home, Settings } from 'lucide-react';
   ```

## 🐛 Troubleshooting

### Tailwind styles not working
- Clear `.next` folder and rebuild
- Ensure `tailwind.config.js` has correct content paths

### Icons not loading
- Install lucide-react: `npm install lucide-react`
- Import from `lucide-react`

### Animations not smooth
- Ensure framer-motion is installed
- Use `whileHover`, `whileTap`, `animate` props
- Set proper `transition` duration

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [Recharts Documentation](https://recharts.org)

## 📝 License

This project is built for IELTS Tracker. All rights reserved.

## 🤝 Contributing

For contributions, please follow the existing code style and design patterns.

---

**Built with ❤️ for IELTS learners worldwide**
