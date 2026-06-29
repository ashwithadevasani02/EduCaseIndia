import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, LogOut, UserPlus } from 'lucide-react';
import Button from '../components/Button';

const Account = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('registeredUser');
    return userData ? JSON.parse(userData) : null;
  });

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, avatar: reader.result };
        setUser(updatedUser);
        localStorage.setItem('registeredUser', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    setUser(null);
    navigate('/');
  };

  // If no user exists, show the Empty State
  if (!user) {
    return (
      <div className="flex-1 flex flex-col justify-center p-6 bg-[#F8F9FA] animate-fade-in text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#E1D5FF] text-[#6C25FF] flex items-center justify-center mb-4">
            <UserPlus className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">No Account Found</h2>
          <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
            It looks like you aren't registered yet. Create an account to set up your profile and configure settings.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/register')}
          >
            Register Now
          </Button>
        </div>
      </div>
    );
  }

  const initials = getInitials(user.name);

  return (
    <div className="flex-1 flex flex-col bg-white animate-fade-in">
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-left text-base font-semibold text-[#1E293B]">
          Account Settings
        </h2>
      </div>

      {/* Profile Info block with Light Grey background matching screenshot */}
      <div className="bg-[#F8F9FA] p-5 pb-6">
        <div className="flex items-center gap-4 text-left">
          {/* Avatar Container */}
          <div className="relative w-20 h-20 shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border border-gray-200"
              />
            ) : user.name === 'Marry Doe' ? (
              // Use default Unsplash image for Marry Doe to match XD design perfectly
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Marry Doe"
                className="w-20 h-20 rounded-full object-cover border border-gray-200"
              />
            ) : (
              // Generate circular avatar using initials
              <div className="w-20 h-20 rounded-full bg-[#6C25FF] text-white flex items-center justify-center text-2xl font-bold select-none shadow-inner border border-[#5B1BE0]">
                {initials}
              </div>
            )}
            
            {/* Camera Overlaid Trigger */}
            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-[#6C25FF] text-white p-1.5 rounded-full border-2 border-white hover:bg-[#5B1BE0] transition-colors cursor-pointer focus:outline-none shadow"
              aria-label="Upload profile image"
            >
              <Camera className="h-3 w-3" />
            </button>
          </div>

          {/* Name & Email Details */}
          <div className="overflow-hidden">
            <h3 className="text-[17px] font-bold text-[#1E293B] truncate leading-snug">
              {user.name}
            </h3>
            <p className="text-xs font-semibold text-[#64748B] truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Profile Description */}
        <p className="text-left text-xs font-medium text-[#64748B] mt-5 leading-relaxed">
          {user.description}
        </p>
      </div>

      {/* Dashed Separator Line */}
      <div className="border-t border-dashed border-[#CBCBCB]" />

      {/* Action panel (Bottom content area) */}
      <div className="flex-1 bg-white p-6 flex flex-col justify-end">
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="!py-3 flex items-center justify-center gap-2 border border-dashed border-[#BCA4FF]"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Account;
