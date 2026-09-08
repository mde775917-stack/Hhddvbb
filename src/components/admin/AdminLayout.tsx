import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Info,
  BookOpen,
  Users,
  UserCheck,
  Bell,
  FileSpreadsheet,
  Image,
  Video,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSiteData } from '../../hooks/useSiteData';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab = 'dashboard' }) => {
  const { logout, adminEmail } = useAuth();
  const { settings, applications, messages } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingApps = applications.filter((a) => a.status === 'PENDING').length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  const menuItems = [
    { id: 'dashboard', name: 'ড্যাশবোর্ড সারসংক্ষেপ', path: '/admin', icon: LayoutDashboard },
    { id: 'settings', name: 'প্রাতিষ্ঠানিক সেটিংস', path: '/admin/settings', icon: Settings },
    { id: 'about', name: 'আমাদের সম্পর্কে', path: '/admin/about', icon: Info },
    { id: 'programs', name: 'শিক্ষা কার্যক্রম', path: '/admin/programs', icon: BookOpen },
    { id: 'teachers', name: 'শিক্ষক ব্যবস্থাপনা', path: '/admin/teachers', icon: Users },
    { id: 'principal', name: 'অধ্যক্ষের তথ্য ও বাণী', path: '/admin/principal', icon: UserCheck },
    { id: 'notices', name: 'নোটিশ বোর্ড', path: '/admin/notices', icon: Bell },
    { id: 'results', name: 'ফলাফল ব্যবস্থাপনা', path: '/admin/results', icon: FileSpreadsheet },
    { id: 'gallery', name: 'ফটো গ্যালারি', path: '/admin/gallery', icon: Image },
    { id: 'videos', name: 'ভিডিও গ্যালারি', path: '/admin/videos', icon: Video },
    {
      id: 'admissions',
      name: 'ভর্তি আবেদন ও তথ্য',
      path: '/admin/admissions',
      icon: GraduationCap,
      badge: pendingApps > 0 ? pendingApps : undefined,
    },
    {
      id: 'messages',
      name: 'যোগাযোগ বার্তা',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#045D38] text-white h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-emerald-800 text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <Shield className="w-6 h-6 text-[#FDE047]" />
            <span className="truncate max-w-[200px] sm:max-w-none">
              মাদরাসা অ্যাডমিন প্যানেল
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>মূল ওয়েবসাইট</span>
          </Link>

          <div className="hidden md:block text-right">
            <span className="text-emerald-200 text-[11px] block">লগইনকৃত অ্যাডমিন</span>
            <span className="font-semibold text-white text-xs">{adminEmail || 'অ্যাডমিন'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 bg-red-600/90 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-4 space-y-1">
          <div className="pb-3 mb-2 border-b border-slate-100">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3">
              ব্যবস্থাপনা মেনু
            </h4>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isCurrent =
                location.pathname === item.path ||
                (item.path !== '/admin' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-[#045D38] text-white font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-slate-50 hover:text-[#045D38]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#FDE047]' : 'text-gray-500'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isCurrent ? 'bg-[#FDE047] text-slate-900' : 'bg-red-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden flex">
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            <div className="relative w-72 bg-white h-full p-4 flex flex-col z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-2">
                <span className="font-bold text-sm text-[#045D38]">অ্যাডমিন মেনু</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isCurrent
                          ? 'bg-[#045D38] text-white font-semibold'
                          : 'text-gray-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#FDE047]' : 'text-gray-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
