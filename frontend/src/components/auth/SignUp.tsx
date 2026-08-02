import { useEffect, useState } from "react";
import connection from "../../config/connection.config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: null as File | null,
    userName: "",
    email: "",
    password: "",
    github: "",
    linkedIn: "",
    experience: "",
    bio: "",
  });

  const [preview, setPreview] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");

    if (isLoggedIn && JSON.parse(isLoggedIn)) {
      navigate("/layout");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = new FormData();

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("github", formData.github);
      data.append("linkedIn", formData.linkedIn);
      data.append("experience", formData.experience);
      data.append("bio", formData.bio);

      const res = await connection.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);

      localStorage.setItem("userLoggedIn", JSON.stringify(true));

      navigate("/layout");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}

          <div className="flex flex-col items-center mb-10">
            <label htmlFor="avatar" className="cursor-pointer">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            </label>

            <input
              id="avatar"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />

            <p className="text-gray-500 mt-3">Upload Profile Picture</p>
          </div>

          {/* Inputs */}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Username</label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">Experience</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">GitHub</label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium">LinkedIn</label>

              <input
                type="url"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-medium">Bio</label>

              <textarea
                rows={5}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us something about yourself..."
                className="w-full mt-2 border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {message && (
            <p className="text-center text-red-500 mt-6">{message}</p>
          )}

          <button
            disabled={loading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
