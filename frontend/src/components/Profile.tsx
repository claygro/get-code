import { useEffect, useState } from "react";
import connection from "../config/connection.config";

const Profile = () => {
  interface Profile {
    userName: string;
    email: string;
  }
  const [profile, setProfile] = useState<Profile>();
  async function getProfile() {
    try {
      const data = await connection.get("/profile/getProfile");
      setProfile(data.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
      }
    }
  }

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {profile?.userName?.charAt(0).toUpperCase()}
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              {profile?.userName}
            </h1>

            <p className="text-gray-500">{profile?.email}</p>
          </div>

          {/* Profile Info */}
          <div className="mt-8 space-y-4">
            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium text-gray-800">
                {profile?.userName}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-lg font-medium text-gray-800">
                {profile?.email}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>

            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
