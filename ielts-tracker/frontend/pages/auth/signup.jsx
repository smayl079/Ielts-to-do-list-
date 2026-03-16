import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColor =
    strength === 0
      ? 'danger'
      : strength === 1
      ? 'warning'
      : strength === 2
      ? 'warning'
      : strength === 3
      ? 'success'
      : 'success';

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors ${
              i < strength ? `bg-${strengthColor}` : 'bg-border'
            }`}
          />
        ))}
      </div>
      {password && (
        <Badge variant={strengthColor} size="sm">
          {strengthText[strength]}
        </Badge>
      )}
    </div>
  );
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Signup:', formData);
    }
  };

  return (
    <AuthCard
      title="Get Started"
      subtitle="Create your IELTS Tracker account to begin your journey"
      footerText="Already have an account?"
      footerLink="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            icon={Lock}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {formData.password && (
            <div className="mt-2">
              <PasswordStrengthMeter password={formData.password} />
            </div>
          )}
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

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            icon={Lock}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded border-border bg-surface checked:bg-primary accent-primary cursor-pointer"
          />
          <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && <p className="text-danger text-sm">{errors.terms}</p>}

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          icon={ArrowRight}
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
};

export default SignupPage;
