import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}login/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.access && res.data?.refresh) {
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("username", res.data?.username);
        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        setError("Invalid response from server.");
        setLoading(false);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f1] to-[#d0f0ff] flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/80 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-[#40b299] p-10 flex flex-col justify-center items-center text-white space-y-6">
          <h1 className="text-4xl font-bold text-center drop-shadow-xl">Welcome Again 👋</h1>
          <p className="text-lg text-center">Gupshup Chat App</p>
          <img src="/images/talking-icon.svg" alt="Chat Icon" className="w-32 drop-shadow-md" />
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 bg-white/70">
          <h2 className="text-3xl font-bold text-center text-[#40b299] mb-6">Login to Your Account</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {loading ? (
            <div className="flex flex-col items-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#40b299] border-solid mb-2"></div>
              <p className="text-[#40b299] font-semibold">Redirecting to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#40b299]"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#40b299] text-white py-3 rounded-xl font-semibold hover:bg-[#369f85] transition duration-300 shadow-md"
              >
                Login
              </button>
            </form>
          )}

          {!loading && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700">New here?</p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 text-[#40b299] font-semibold hover:underline"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
