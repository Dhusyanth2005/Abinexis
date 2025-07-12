import React, { useState } from 'react';
import { 
  MapPin, 
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
  const [settings, setSettings] = useState({
    security: {
      loginAlerts: true
    }
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      phone: '+1 (555) 123-4567',
      isActive: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Business Ave, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      phone: '+1 (555) 987-6543',
      isActive: false
    }
  ]);

  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState('security');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.city) {
      const address = {
        id: addresses.length + 1,
        ...newAddress,
        isActive: false
      };
      setAddresses(prev => [...prev, address]);
      setNewAddress({
        type: 'Home',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
      });
      setShowAddAddressForm(false);
    }
  };

  const handleSetActiveAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isActive: addr.id === id
    })));
  };

  const handleRemoveAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleAddressInputChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };
    const onNavigateToProfile = () => {
        navigate('/');
    }
  const sections = [
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'addresses', label: 'Addresses', icon: MapPin }
  ];

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
        checked ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]' : 'bg-gray-600'
      }`}
    >
      <div
        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-200 ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToProfile}
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400">Manage your security and addresses</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <nav className="space-y-2">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-[var(--brand-primary)]">Security</h2>
                    <div className="space-y-4">
                      <div className="py-3 border-b border-gray-800">
                        <h3 className="font-medium mb-2">Change Password</h3>
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Current Password"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent pr-12"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                          <button className="px-4 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200">
                            Update Password
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h3 className="font-medium">Login Alerts</h3>
                          <p className="text-sm text-gray-400">Get notified of new logins</p>
                        </div>
                        <Toggle
                          checked={settings.security.loginAlerts}
                          onChange={() => handleToggle('security', 'loginAlerts')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[var(--brand-primary)]">Addresses</h2>
                    <button
                      onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  {/* Add Address Form */}
                  {showAddAddressForm && (
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="font-medium mb-4">Add New Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => handleAddressInputChange('type', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => handleAddressInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                          <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => handleAddressInputChange('address', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => handleAddressInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => handleAddressInputChange('state', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">ZIP Code</label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) => handleAddressInputChange('zipCode', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={newAddress.phone}
                            onChange={(e) => handleAddressInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-4">
                        <button
                          onClick={() => setShowAddAddressForm(false)}
                          className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          className="px-4 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Address List */}
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          address.isActive 
                            ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/10' 
                            : 'border-gray-700 bg-gray-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                address.isActive 
                                  ? 'bg-[var(--brand-primary)] text-white' 
                                  : 'bg-gray-700 text-gray-300'
                              }`}>
                                {address.type}
                              </span>
                              {address.isActive && (
                                <span className="flex items-center space-x-1 text-xs text-[var(--brand-primary)]">
                                  <Check className="w-3 h-3" />
                                  <span>Active</span>
                                </span>
                              )}
                            </div>
                            <h3 className="font-medium">{address.name}</h3>
                            <p className="text-gray-400 text-sm">{address.address}</p>
                            <p className="text-gray-400 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                            <p className="text-gray-400 text-sm">{address.phone}</p>
                          </div>
                          <div className="flex space-x-2">
                            {!address.isActive && (
                              <button
                                onClick={() => handleSetActiveAddress(address.id)}
                                className="px-3 py-1 text-xs bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] rounded-lg transition-colors duration-200"
                              >
                                Set Active
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveAddress(address.id)}
                              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-accent)] rounded-lg transition-all duration-200 transform hover:scale-105">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;