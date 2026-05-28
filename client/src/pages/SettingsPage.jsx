import React from 'react';
import { PhoneCall, ContactRound, Mail, MapPin, UserEdit, LogOut, ChevronRight } from 'lucide-react';

function SettingsSection({ title, children }) {
  return (
    <div className="w-full mb-8 animate-fade-in-up">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.15em] mb-4 px-2">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function SettingsCard({ icon, iconColor, bgOpacity = "bg-white/5", title, description, children, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`w-full p-4 ${bgOpacity} border border-white/5 rounded-2xl flex flex-col gap-4 transition-all hover:bg-white/10 cursor-pointer active:scale-[0.99]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor}`}>
              {icon}
            </div>
          )}
          <div>
            <h4 className="text-white font-bold">{title}</h4>
            {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </div>
      {children && (
        <div className="pt-2 flex flex-col gap-2 border-t border-white/5">
          {children}
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="px-5 py-8 flex flex-col items-center min-h-screen pb-24">
      
      {/* Page Header */}
      <div className="w-full flex justify-between items-end mb-8 px-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your campus profile</p>
        </div>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <UserEdit className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      {/* Profile Summary Card */}
      <div className="w-full p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-10 animate-fade-in-up">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-full h-full rounded-full object-cover bg-[#1e293b]"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#1e293b] rounded-full" />
        </div>
        
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-white truncate">Elizar Y. Ayuyang</h2>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">BSIT3R</span>
            <span className="text-gray-400 text-sm">Student • 20yo</span>
          </div>
        </div>
      </div>

      {/* Account Sections */}
      <SettingsSection title="Personal Information">
        <SettingsCard 
          icon={<PhoneCall className="w-5 h-5" />} 
          iconColor="bg-blue-500/20 text-blue-500"
          title="Contact Details"
          description="Your primary contact methods"
        >
          <InfoRow icon={PhoneCall} label="0912-345-6789" />
          <InfoRow icon={Mail} label="elizar.ayuyang@up.edu.ph" />
          <InfoRow icon={MapPin} label="Quezon City, Philippines" />
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Emergency Contact">
        <SettingsCard 
          icon={<ContactRound className="w-5 h-5" />} 
          iconColor="bg-green-500/20 text-green-500"
          title="Guardian Details"
          description="Emergency point of contact"
        >
          <InfoRow icon={UserEdit} label="Father Ayuyang (Parent)" />
          <InfoRow icon={PhoneCall} label="0998-765-4321" />
          <InfoRow icon={Mail} label="guardian@email.com" />
        </SettingsCard>
      </SettingsSection>

      {/* App Actions */}
      <div className="w-full flex flex-col gap-3 mt-4">
        <button className="w-full py-4 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl font-bold transition-all active:scale-[0.98]">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
        <p className="text-center text-gray-600 text-[10px] font-medium uppercase tracking-widest mt-4">
          Campus Companion v1.0.4
        </p>
      </div>

    </div>
  );
}

export default SettingsPage;
