import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch, 
    reset 
  } = useForm();
  
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('✅ Registration successful:', result.message);
        reset();
        navigate('/login');
      } else {
        console.error('❌ Registration failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="max-w-md w-full bg-white shadow-md rounded p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { 
              required: "Name is required", 
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters are allowed" }
            })}
            className={`mt-1 block w-full p-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your Gmail"
            {...register("email", { 
              required: "Email is required",
              pattern: { 
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, 
                message: "Only Gmail addresses are allowed (e.g., example@gmail.com)" 
              }
            })}
            className={`mt-1 block w-full p-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Mobile Number Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            {...register("mobile", { 
              required: "Mobile number is required", 
              pattern: { 
                value: /^[0-9]{10}$/, 
                message: "Enter a valid 10-digit mobile number" 
              }
            })}
            className={`mt-1 block w-full p-2 border ${
              errors.mobile ? 'border-red-500' : 'border-gray-300'
            } rounded focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { 
                required: "Password is required", 
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message: "Password must include uppercase, lowercase, number, special character, and be at least 8 characters"
                }
              })}
              className={`mt-1 block w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", { 
                required: "Please confirm your password", 
                validate: (value) => value === watch('password') || "Passwords do not match"
              })}
              className={`mt-1 block w-full p-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-white"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
