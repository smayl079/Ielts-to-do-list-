import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle login
      console.log('Login:', { email, password });
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your IELTS Tracker account"
      footerText="Don't have an account?"
      footerLink="/auth/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          icon={ArrowRight}
        >
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
