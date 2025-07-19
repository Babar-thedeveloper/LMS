import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lmsLogo from "../assets/lms logo.png";

const illustrationUrl = "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"; // Example illustration

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    location: '',
    employeeId: '',
    password: '',
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Signed in successfully! Redirecting...");
    setTimeout(() => {
      setMessage("");
      navigate("/layout/admindashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
        {/* Illustration - fill left side, no space */}
        <div className="hidden md:block h-full w-full">
          <img
            src={illustrationUrl}
            alt="Teamwork"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
        </div>
        {/* Form */}
        <div className="flex flex-col justify-center p-8">
          <div className="flex flex-col items-center mb-6">
            {/* LMS Logo */}
            <img src={lmsLogo} alt="LMS Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain mb-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-105" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 tracking-wide text-center drop-shadow-lg animate-fade-in">Leave Management System</h1>
            <div className="text-lg md:text-xl font-semibold text-primary mb-4 tracking-wide text-center">Welcome Back!</div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              required
              className="input input-bordered input-primary w-full"
            />
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              onChange={handleChange}
              required
              className="input input-bordered input-primary w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="input input-bordered input-primary w-full"
            />
            <button
              type="submit"
              className="btn btn-primary w-full text-lg font-bold rounded-xl mt-2 transition-all duration-200 shadow-md hover:scale-105 focus:ring-4 focus:ring-primary/50 focus:outline-none animate-bounce-once"
            >
              Sign In
            </button>
          </form>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setIsLogin(!isLogin)}
              >
                Sign Up
              </button>
            </p>
          </div>
          {message && (
            <div className="alert alert-success mt-4 text-center">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
