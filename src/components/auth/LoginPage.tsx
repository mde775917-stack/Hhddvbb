import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  GraduationCap,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSiteData } from '../../hooks/useSiteData';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { settings } = useSiteData();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@assimgjb.edu.bd');
  const [password, setPassword] = useState('admin123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে সঠিক ইমেইল ও পাসওয়ার্ড প্রদান করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#022617] via-[#045D38] to-[#033621] flex flex-col justify-center items-center px-4 py-12">
      {/* Return to Home link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল ওয়েবসাইটে ফিরে যান</span>
        </Link>

        <span className="text-emerald-300 font-mono text-[11px]">EIIN: {settings.eiin}</span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/30">
        {/* Top Header */}
        <div className="bg-[#033621] p-6 sm:p-8 text-center text-white border-b-2 border-[#D4AF37]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#045D38] to-[#0D9488] border border-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Shield className="w-8 h-8 text-[#FDE047]" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {settings.madrasaName}
          </h2>
          <p className="text-xs text-emerald-300 mt-1">
            অফিসিয়াল অ্যাডমিন ও ব্যবস্থাপনা পোর্টাল
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#045D38] hover:bg-[#064E3B] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'যাচাই করা হচ্ছে...' : 'প্রবেশ করুন'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Info Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#045D38]">
              <CheckCircle2 className="w-4 h-4" />
              <span>ডিফল্ট অ্যাডমিন এক্সেস</span>
            </div>
            <p className="text-[11px] text-gray-600">
              ইমেইল: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-mono">admin@assimgjb.edu.bd</code>
              <br />
              পাসওয়ার্ড: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-mono">admin123456</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
