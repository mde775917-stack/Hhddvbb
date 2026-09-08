import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Bell,
  FileSpreadsheet,
  Image,
  GraduationCap,
  MessageSquare,
  Settings,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';

export const AdminDashboard: React.FC = () => {
  const {
    settings,
    programs,
    teachers,
    notices,
    results,
    gallery,
    applications,
    messages,
  } = useSiteData();

  const pendingApps = applications.filter((a) => a.status === 'PENDING').length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  const statCards = [
    {
      title: 'শিক্ষা কার্যক্রম',
      count: programs.length,
      icon: BookOpen,
      color: 'bg-emerald-500',
      path: '/admin/programs',
      desc: 'চলমান বিভাগ ও কোর্স',
    },
    {
      title: 'শিক্ষক সংখ্যা',
      count: teachers.length,
      icon: Users,
      color: 'bg-teal-500',
      path: '/admin/teachers',
      desc: 'তালিকাভুক্ত শিক্ষক',
    },
    {
      title: 'মোট নোটিশ',
      count: notices.length,
      icon: Bell,
      color: 'bg-blue-500',
      path: '/admin/notices',
      desc: 'প্রকাশিত বিজ্ঞপ্তি',
    },
    {
      title: 'ফলাফল ডাটা',
      count: results.length,
      icon: FileSpreadsheet,
      color: 'bg-amber-500',
      path: '/admin/results',
      desc: 'পরীক্ষার সংরক্ষিত রেকর্ড',
    },
    {
      title: 'গ্যালারি ছবি',
      count: gallery.length,
      icon: Image,
      color: 'bg-purple-500',
      path: '/admin/gallery',
      desc: 'ক্যাম্পাস ও অনুষ্ঠানের ছবি',
    },
    {
      title: 'ভর্তি আবেদন',
      count: applications.length,
      badge: pendingApps > 0 ? `${pendingApps} অপেক্ষমাণ` : undefined,
      icon: GraduationCap,
      color: 'bg-rose-500',
      path: '/admin/admissions',
      desc: 'অনলাইন ভর্তি ফরম',
    },
    {
      title: 'যোগাযোগ বার্তা',
      count: messages.length,
      badge: unreadMessages > 0 ? `${unreadMessages} নতুন` : undefined,
      icon: MessageSquare,
      color: 'bg-cyan-500',
      path: '/admin/messages',
      desc: 'দর্শনার্থীদের মেসেজ',
    },
  ];

  return (
    <AdminLayout activeTab="dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full w-max mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>নিরাপদ অ্যাডমিন কন্ট্রোল প্যানেল</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {settings.madrasaName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              প্রতিষ্ঠানের ওয়েবসাইট তথ্য, নোটিশ, শিক্ষক তালিকা ও ভর্তি আবেদন নিয়ন্ত্রণ করুন
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/settings"
              className="inline-flex items-center gap-1.5 bg-[#045D38] hover:bg-[#064E3B] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>সাইট সেটিংস</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.path}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">
                      {card.title}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 block">
                      {card.count}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl text-white ${card.color} shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">{card.desc}</span>
                  {card.badge ? (
                    <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {card.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#045D38] group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Action Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#045D38]" />
              প্রতিষ্ঠানের তথ্যের নির্ভুলতা নিশ্চিতকরণ
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
              ব্যবহারকারীর অনুরোধ মোতাবেক প্রতিষ্ঠানে কোনো কাল্পনিক শিক্ষক বা পরীক্ষার ভুয়া ফলাফল দেওয়া হয়নি। আপনি এই প্যানেল থেকে বাস্তব তথ্য যোগ করতে পারেন:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/admin/teachers"
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200"
              >
                + শিক্ষক তথ্য যোগ
              </Link>
              <Link
                to="/admin/notices"
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200"
              >
                + নতুন নোটিশ প্রকাশ
              </Link>
              <Link
                to="/admin/gallery"
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200"
              >
                + নতুন ছবি আপলোড
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ফায়ারবেস ক্লাউড ডেটা সিঙ্ক
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              আপনার প্রজেক্টের সাথে Firebase (Firestore, Auth, Storage) যুক্ত আছে। যেকোনো পরিবর্তন তাৎক্ষণিকভাবে ক্লাউডে এবং ব্রাউজারে সংরক্ষিত থাকে।
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-gray-700">
              Firebase Project: <strong>assimgjb</strong> | Storage: <strong>assimgjb.firebasestorage.app</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
