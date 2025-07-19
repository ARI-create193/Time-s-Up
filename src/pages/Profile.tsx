import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';

const mockUser = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  phone: '+1 234 567 890',
  address: '123 Luxury Ave, Watch City, 45678',
  dob: '1990-01-01',
  gender: 'Male',
};

const avatarList = [
  'M1.svg', 'M2.svg', 'M3.svg', 'M4.svg', 'M5.svg', 'M6.svg', 'M7.svg', 'M8.svg', 'M9.svg',
  'F1.svg', 'F2.svg', 'F3.svg', 'F4.svg', 'F5.svg', 'F6.svg', 'F7.svg', 'F8.svg', 'F9.svg',
];

const DARK_BLUE = 'bg-blue-900 hover:bg-blue-800 text-white';

const Profile: React.FC = () => {
  const { selectedAvatar, setSelectedAvatar } = useAuthStore();
  const [user, setUser] = useState({ ...mockUser });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setShowAvatarModal(false);
    // Here you would send the updated user data to your backend
  };

  const getAvatarPath = (avatar: string) => `/avatar/${avatar}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 py-10">
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto border border-primary">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center font-serif mb-2">Profile</h1>
        <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-8"></div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 w-full">
          {/* Avatar Section */}
          <div className="flex flex-col items-center lg:items-center w-full max-w-xs">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-xl mb-6 bg-gray-100 flex items-center justify-center" style={{ boxShadow: '0 0 0 8px #e0e7ff, 0 8px 32px 0 #3b82f680' }}>
              <img
                src={getAvatarPath(selectedAvatar)}
                alt="Avatar"
                className="object-cover w-full h-full"
                onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=User')}
              />
            </div>
            {editing && (
              <button
                type="button"
                className={`px-5 py-2 rounded-lg font-semibold shadow transition mb-2 ${DARK_BLUE}`}
                onClick={() => setShowAvatarModal(true)}
              >
                Change Avatar
              </button>
            )}
          </div>

          {/* User Details Section */}
          <div className="flex-1 w-full">
            <div className="bg-white/90 rounded-2xl shadow-xl p-6 border border-primary w-full">
              <form
                onSubmit={e => { e.preventDefault(); handleSave(); }}
              >
                <ul className="space-y-4 text-base text-gray-900 font-medium">
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Name:</span>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-48 transition"
                      />
                    ) : (
                      <span className="ml-2 font-serif">{user.name}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Email:</span>
                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-64 transition"
                      />
                    ) : (
                      <span className="ml-2 font-serif">{user.email}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Phone:</span>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-48 transition"
                      />
                    ) : (
                      <span className="ml-2 font-serif">{user.phone}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Address:</span>
                    {editing ? (
                      <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-72 transition"
                      />
                    ) : (
                      <span className="ml-2 font-serif">{user.address}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Date of Birth:</span>
                    {editing ? (
                      <input
                        type="date"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-44 transition"
                      />
                    ) : (
                      <span className="ml-2 font-serif">{user.dob}</span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-primary mr-3 align-middle"></span>
                    <span className="font-bold">Gender:</span>
                    {editing ? (
                      <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        className="ml-2 font-serif px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-base w-36 transition"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <span className="ml-2 font-serif">{user.gender}</span>
                    )}
                  </li>
                </ul>
                <div className="flex gap-4 mt-8 justify-center">
                  {editing ? (
                    <>
                      <button
                        type="submit"
                        className="px-8 py-2 rounded-lg font-semibold shadow transition text-white bg-primary hover:bg-blue-900 text-lg"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-8 py-2 rounded-lg font-semibold shadow transition bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg"
                        onClick={() => { setEditing(false); setUser({ ...mockUser }); setShowAvatarModal(false); }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="px-8 py-2 rounded-lg font-semibold shadow transition text-white bg-primary hover:bg-blue-900 text-lg"
                      onClick={() => { setEditing(true); setSaved(false); }}
                    >
                      Edit
                    </button>
                  )}
                  {saved && <span className="text-green-600 font-medium ml-4 self-center">Saved!</span>}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Avatar Modal */}
        {showAvatarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl p-8 shadow-2xl max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowAvatarModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Choose Your Avatar</h2>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {avatarList.map((avatar) => (
                  <button
                    key={avatar}
                    className={`rounded-full border-2 p-1 transition-all duration-200 ${
                      selectedAvatar === avatar
                        ? 'border-blue-500 ring-2 ring-blue-300'
                        : 'border-transparent hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedAvatar(avatar)}
                    aria-label={`Select avatar ${avatar}`}
                  >
                    <img
                      src={getAvatarPath(avatar)}
                      alt="Avatar option"
                      className="w-12 h-12 object-cover rounded-full"
                      onError={e => (e.currentTarget.src = 'https://ui-avatars.com/api/?name=User')}
                    />
                  </button>
                ))}
              </div>
              <button
                className={`w-full py-2 mt-2 rounded-lg font-semibold shadow transition ${DARK_BLUE}`}
                onClick={() => setShowAvatarModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 