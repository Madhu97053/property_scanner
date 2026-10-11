import React, { useState, useEffect, useRef } from 'react';
import {
  X, ScanLine, User as UserIcon, Mail, Phone, KeyRound,
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalone?: boolean; // For standalone /login page
}

export default function LoginModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  isStandalone = false,
}: LoginModalProps) {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const isOpen = propIsOpen !== undefined ? propIsOpen : isLoginModalOpen;
  const handleClose = propOnClose || closeLoginModal;

  const [step, setStep] = useState<'info' | 'otp' | 'success'>('info');
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('info');
      setError('');
      setOtp(['', '', '', '', '', '']);
    }
  }, [isOpen]);

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Close on Escape key
  useEffect(() => {
    if (isStandalone) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (isOpen) document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, isStandalone]);

  if (!isOpen && !isStandalone) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!identifier.trim()) {
      setError(
        authMethod === 'mobile'
          ? 'Please enter your 10-digit mobile number'
          : 'Please enter your email address'
      );
      return;
    }

    if (authMethod === 'mobile') {
      const cleaned = identifier.replace(/\D/g, '');
      if (cleaned.length < 10) {
        setError('Please enter a valid 10-digit Indian mobile number');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last entered character if multiple typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For demo, accept 123456 or any 6 digits
      setStep('success');
      setTimeout(() => {
        login(name.trim(), identifier.trim(), authMethod);
        if (!isStandalone) handleClose();
      }, 1200);
    }, 700);
  };

  const fillDemoOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setError('');
  };

  const modalBody = (
    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
      {/* Top Banner decoration */}
      <div className="bg-gradient-to-r from-navy-700 via-navy-600 to-blue-700 px-6 pt-7 pb-6 text-white relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-8 top-4 opacity-10">
          <ScanLine className="w-24 h-24" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-inner">
              <ScanLine className="h-5 w-5 text-teal-300" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight">
                Property<span className="text-teal-300">Scanner</span>
              </span>
              <p className="text-xs text-white/70">Compare India's Top Real Estate</p>
            </div>
          </div>

          {!isStandalone && (
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-display text-2xl font-bold">
            {step === 'otp'
              ? 'Verify with OTP'
              : step === 'success'
              ? 'Welcome Aboard!'
              : 'Sign In / Register'}
          </h2>
          <p className="text-xs text-white/75 mt-1">
            {step === 'otp'
              ? `Enter the 6-digit code sent to ${identifier}`
              : step === 'success'
              ? 'You have successfully signed in'
              : 'Access saved properties, platform comparisons & price alerts'}
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Info & Identifier */}
        {step === 'info' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Method switch tabs */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-2">
              <button
                type="button"
                onClick={() => { setAuthMethod('mobile'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  authMethod === 'mobile'
                    ? 'bg-white text-navy-600 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Phone className="h-3.5 w-3.5" /> Mobile Number
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('email'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                  authMethod === 'email'
                    ? 'bg-white text-navy-600 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Mail className="h-3.5 w-3.5" /> Email Address
              </button>
            </div>

            {/* Name Field */}
            <div>
              <label className="label-field flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-gray-400" /> Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Madhuteja"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-10"
                  autoFocus
                />
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Identifier Field */}
            {authMethod === 'mobile' ? (
              <div>
                <label className="label-field flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-gray-400" /> Mobile Number
                </label>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
                  <div className="flex items-center gap-1.5 bg-gray-50 border-r border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 select-none">
                    <span className="text-base leading-none">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2.5 text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="label-field flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gray-400" /> Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="input-field pl-10"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 border border-red-200 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 text-sm font-semibold"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Sending OTP...
                </>
              ) : (
                <>
                  <span>Send OTP</span> <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                By continuing, you agree to Property Scanner's{' '}
                <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>OTP sent to: <strong className="text-gray-800">{authMethod === 'mobile' ? `+91 ${identifier}` : identifier}</strong></span>
              <button
                type="button"
                onClick={() => setStep('info')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Change
              </button>
            </div>

            {/* 6 Digit OTP inputs */}
            <div>
              <label className="label-field flex items-center gap-1.5 mb-2">
                <KeyRound className="h-3.5 w-3.5 text-gray-400" /> Enter 6-Digit OTP
              </label>
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="h-12 w-11 sm:h-12 sm:w-12 text-center text-xl font-bold rounded-xl border border-gray-200 bg-white text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                ))}
              </div>
            </div>

            {/* Demo Helper Callout */}
            <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200/80 p-2.5 text-xs text-amber-800">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Demo OTP: <strong>123456</strong></span>
              </div>
              <button
                type="button"
                onClick={fillDemoOtp}
                className="rounded-lg bg-white px-2.5 py-1 font-semibold text-amber-700 shadow-xs border border-amber-300 hover:bg-amber-100 transition-colors"
              >
                Auto-fill OTP
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 border border-red-200 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Verify & Continue
                </>
              )}
            </button>

            {/* Resend OTP */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setStep('info')}
                className="text-gray-500 hover:text-gray-800"
              >
                &larr; Back to edit details
              </button>
              {resendTimer > 0 ? (
                <span className="text-gray-400">Resend in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setResendTimer(30)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )}

        {/* Step 3: Success Animation */}
        {step === 'success' && (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 mb-4 animate-scale-in">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy-600">
              Welcome, {name}!
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              You are now signed in to Property Scanner.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (isStandalone) {
    return <div className="w-full flex justify-center py-6 px-4">{modalBody}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Modal Dialog */}
      <div className="relative z-10 w-full flex justify-center">
        {modalBody}
      </div>
    </div>
  );
}
