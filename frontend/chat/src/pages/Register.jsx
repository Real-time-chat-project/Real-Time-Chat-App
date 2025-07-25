import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profile_image) {
      data.append("profile_image", formData.profile_image);
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}register/`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess(res.data.message || "Registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      const data = error.response?.data;
      if (data?.error) setError(data.error);
      else if (data?.message) setError(data.message);
      else setError("Registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f1] to-[#d0f0ff] flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/80 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Section */}
        <div className="bg-[#40b299] p-10 flex flex-col justify-center items-center text-white space-y-6">
          <h1 className="text-4xl font-bold text-center drop-shadow-xl">Welcome to Gupshup 👋</h1>
          <p className="text-lg text-center">Connect • Chat • Share</p>
          <img src="/images/talking-icon.svg" alt="Chat Icon" className="w-32 drop-shadow-md" />
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 bg-white/70">
          <h2 className="text-3xl font-bold text-center text-[#40b299] mb-6">Create Your Account</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {loading ? (
            <div className="flex flex-col items-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#40b299] border-solid mb-2"></div>
              <p className="text-[#40b299] font-semibold">Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40b299]"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40b299]"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40b299]"
                required
              />

              <div>
                <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[#40b299] file:text-white hover:file:bg-[#369f85]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#40b299] text-white py-3 rounded-xl font-semibold hover:bg-[#369f85] transition duration-300 shadow-md"
              >
                Register
              </button>
            </form>
          )}

          {!loading && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700">Already have an account?</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-2 text-[#40b299] font-semibold hover:underline"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
