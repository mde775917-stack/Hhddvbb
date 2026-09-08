import React, { useState } from 'react';
import {
  MessageSquare,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useSiteData } from '../../hooks/useSiteData';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const { messages, markMessageRead, removeMessage } = useSiteData();

  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      await markMessageRead(msg.id);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই বার্তাটি মুছে ফেলতে চান?')) return;
    try {
      await removeMessage(id);
      if (selectedMsg?.id === id) {
        setSelectedMsg(null);
      }
      setStatusMsg({ type: 'success', text: 'বার্তা মুছে ফেলা হয়েছে।' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg({ type: 'error', text: 'মুছে ফেলা ব্যর্থ হয়েছে।' });
    }
  };

  return (
    <AdminLayout activeTab="messages">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              যোগাযোগ বার্তা ও ইনবক্স
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              ওয়েবসাইটের কন্টাক্ট ফরম থেকে দর্শনার্থী ও অভিভাবকদের পাঠানো বার্তার তালিকা
            </p>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            মোট বার্তা: {messages.length} টি
          </div>
        </div>

        {statusMsg && (
          <div
            className={`p-4 rounded-xl flex items-center gap-2 text-sm font-medium ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 text-base">কোনো বার্তা পাওয়া যায়নি</h4>
            <p className="text-xs text-gray-500 mt-1">
              ওয়েবসাইটের "যোগাযোগ" পেজ থেকে কেউ বার্তা পাঠালে তা এখানে প্রদর্শিত হবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Messages List */}
            <div className="lg:col-span-6 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleOpenMessage(m)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedMsg?.id === m.id
                      ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                      : m.isRead
                      ? 'bg-white border-slate-200 hover:border-emerald-200'
                      : 'bg-white border-emerald-300 font-semibold shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {!m.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-gray-900">{m.name}</h4>
                      </div>
                      <p className="text-xs text-emerald-800 font-medium mt-0.5">{m.subject}</p>
                    </div>

                    <span className="text-[11px] text-gray-400 whitespace-nowrap font-mono">
                      {new Date(m.submittedAt).toLocaleDateString('bn-BD')}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Message Detail Panel */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[300px] flex flex-col justify-between">
              {selectedMsg ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{selectedMsg.name}</h3>
                      <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                        বিষয়: {selectedMsg.subject}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(selectedMsg.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Contact Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-500 block">মোবাইল</span>
                        <a
                          href={`tel:${selectedMsg.phone}`}
                          className="font-bold text-gray-900 hover:underline"
                        >
                          {selectedMsg.phone}
                        </a>
                      </div>
                    </div>

                    {selectedMsg.email && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-500 block">ইমেইল</span>
                          <a
                            href={`mailto:${selectedMsg.email}`}
                            className="font-bold text-gray-900 hover:underline truncate"
                          >
                            {selectedMsg.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-gray-500 block mb-2">বার্তা:</span>
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedMsg.message}
                    </p>
                  </div>

                  <div className="text-[11px] text-gray-400 text-right">
                    প্রেরণের সময়: {new Date(selectedMsg.submittedAt).toLocaleString('bn-BD')}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400 space-y-2">
                  <Mail className="w-10 h-10 mx-auto opacity-40" />
                  <p className="text-xs">বাম পাশের তালিকা থেকে যেকোনো বার্তার উপর ক্লিক করুন</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
