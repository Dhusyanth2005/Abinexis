import React, { useState } from 'react';
import { 
  User, 
  ArrowLeft, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Edit3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about creating beautiful user experiences and solving complex problems.',
    joinDate: 'March 2022',
    avatar: null
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };
  const onNavigateToSettings = () => {
    // Logic to navigate to settings page
    navigate('/');
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] bg-clip-text text-transparent">
                Profile
              </h1>
              <p className="text-gray-400">Manage your personal information</p>
            </div>
          </div>
          <button
            onClick={onNavigateToSettings}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>back</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
          {/* Avatar Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center text-4xl font-bold text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-secondary)] transition-colors duration-200 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg">
                    <User className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span>{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg">
                    <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg">
                    <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg">
                    <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
                  <span>{profile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={tempProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all duration-200 resize-none"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300">
                {profile.bio}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;