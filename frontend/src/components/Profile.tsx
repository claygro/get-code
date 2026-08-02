import React, { useEffect, useState } from "react";
import connection from "../config/connection.config";

interface ProfileData {
  _id?: string;
  avatar?: string;
  userName: string;
  email: string;
  github?: string;
  linkedIn?: string;
  bio?: string;
  experience?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<ProfileData>({
    userName: "",
    email: "",
    github: "",
    linkedIn: "",
    bio: "",
    experience: "",
    avatar: "",
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>("");

  async function getProfile() {
    try {
      setLoading(true);
      const res = await connection.get("/profile/getProfile");
      const data: ProfileData = res.data;
      setProfile(data);
      setUpdatedProfile(data);
      if (data.avatar) setPreviewAvatar(data.avatar);
    } catch (error: unknown) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // If uploading an image via FormData, construct it here:
      // const formData = new FormData();
      // Object.entries(updatedProfile).forEach(([key, val]) => formData.append(key, val));
      // if (imageFile) formData.append("avatar", imageFile);
      // await connection.put("/profile/updateProfile", formData);

      await connection.put("/profile/updateProfile", {
        ...updatedProfile,
        avatar: previewAvatar,
      });

      await getProfile();
      setIsUpdate(false);
    } catch (error: any) {
      console.error(`Failed to update profile: ${error.message}`);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setUpdatedProfile(profile);
      setPreviewAvatar(profile.avatar || "");
    }
    setIsUpdate(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 transition-all">
        {/* Header */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
          Profile
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-500 shadow-md">
                {profile?.userName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {isUpdate && (
              <label
                htmlFor="avatar-upload"
                className="mt-2 block text-center text-xs text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Change Photo
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <h1 className="mt-3 text-2xl font-bold text-gray-800 text-center">
            {profile?.userName}
          </h1>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>

        {/* Profile Information */}
        <div className="mt-8 space-y-4">
          {/* Username */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Username
            </label>
            {isUpdate ? (
              <input
                value={updatedProfile.userName}
                onChange={handleChange}
                name="userName"
                type="text"
                placeholder="Enter username"
                className="w-full mt-1 bg-transparent text-gray-800 font-medium outline-none border-b border-blue-500 focus:border-blue-700 py-1"
              />
            ) : (
              <p className="text-base font-medium text-gray-800 mt-1">
                {profile?.userName || "N/A"}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>
            {isUpdate ? (
              <input
                value={updatedProfile.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 bg-transparent text-gray-800 font-medium outline-none border-b border-blue-500 focus:border-blue-700 py-1"
              />
            ) : (
              <p className="text-base font-medium text-gray-800 mt-1">
                {profile?.email || "N/A"}
              </p>
            )}
          </div>

          {/* GitHub & LinkedIn Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                GitHub
              </label>
              {isUpdate ? (
                <input
                  value={updatedProfile.github}
                  onChange={handleChange}
                  name="github"
                  type="text"
                  placeholder="https://github.com/..."
                  className="w-full mt-1 bg-transparent text-gray-800 font-medium text-sm outline-none border-b border-blue-500 py-1"
                />
              ) : (
                <a
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline truncate block mt-1"
                >
                  {profile?.github
                    ? profile.github.replace("https://", "")
                    : "N/A"}
                </a>
              )}
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                LinkedIn
              </label>
              {isUpdate ? (
                <input
                  value={updatedProfile.linkedIn}
                  onChange={handleChange}
                  name="linkedIn"
                  type="text"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full mt-1 bg-transparent text-gray-800 font-medium text-sm outline-none border-b border-blue-500 py-1"
                />
              ) : (
                <a
                  href={profile?.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline truncate block mt-1"
                >
                  {profile?.linkedIn
                    ? profile.linkedIn.replace("https://", "")
                    : "N/A"}
                </a>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Experience
            </label>
            {isUpdate ? (
              <input
                value={updatedProfile.experience}
                onChange={handleChange}
                name="experience"
                type="text"
                placeholder="e.g. 2.5 Years"
                className="w-full mt-1 bg-transparent text-gray-800 font-medium outline-none border-b border-blue-500 py-1"
              />
            ) : (
              <p className="text-base font-medium text-gray-800 mt-1">
                {profile?.experience ? `${profile.experience} Years` : "N/A"}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Bio
            </label>
            {isUpdate ? (
              <textarea
                value={updatedProfile.bio}
                onChange={handleChange}
                name="bio"
                rows={3}
                placeholder="Write a short bio..."
                className="w-full mt-1 bg-transparent text-gray-800 font-medium outline-none border border-gray-300 rounded-xl p-2 text-sm focus:border-blue-500"
              />
            ) : (
              <p className="text-sm font-medium text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
                {profile?.bio || "No bio available."}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          {isUpdate ? (
            <>
              <button
                onClick={handleUpdateProfile}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl font-semibold transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsUpdate(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Edit Profile
              </button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all">
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
