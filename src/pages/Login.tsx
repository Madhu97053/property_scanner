import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If already logged in, redirect home
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex flex-col justify-center py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-md w-full px-4">
        <LoginModal isStandalone={true} />

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white p-3 border border-gray-100 shadow-xs">
            <Building2 className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-[11px] font-semibold text-gray-700">30+ Verified</p>
            <p className="text-[10px] text-gray-400">Properties</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-gray-100 shadow-xs">
            <ShieldCheck className="h-5 w-5 text-teal-600 mx-auto mb-1" />
            <p className="text-[11px] font-semibold text-gray-700">100% Secure</p>
            <p className="text-[10px] text-gray-400">OTP Auth</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-gray-100 shadow-xs">
            <Sparkles className="h-5 w-5 text-amber-500 mx-auto mb-1" />
            <p className="text-[11px] font-semibold text-gray-700">Multi-portal</p>
            <p className="text-[10px] text-gray-400">Price Compare</p>
          </div>
        </div>
      </div>
    </div>
  );
}
