"use client";
import { cn } from "@/lib/utils";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogle } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api.js";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Register() {
  return (
    <GoogleOAuthProvider clientId="772509586103-5h4f5vu58sv9cqkon7jbq63m68nsoh5m.apps.googleusercontent.com">
      <Signup />
    </GoogleOAuthProvider>
  );
}

function Signup() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<number>(0);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [userOtp, setUserOtp] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    otp: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      otp: ''
    };
    let isValid = true;
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one symbol';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (showOtp && !userOtp) {
      newErrors.otp = 'OTP is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (validateForm()) {
      if (!showOtp) {
        const generatedOtp = generateOtp();
        setOtp(generatedOtp);
        setShowOtp(true);
        
        try {
          await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/users/send-otp`, {
            email: formData.email,
            otp: generatedOtp
          });
          console.log("OTP sent successfully");
        } catch (otpError) {
          console.error("Error sending OTP:", otpError);
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Failed to send OTP. Please try again.'
          }));
        }
      } else {
        if (parseInt(userOtp) === otp) {
          try {
            const response = await authService.register(
              formData
            );
            if (response) {
              console.log("Registration successful:", response);
              navigate("/auth/login");
            } else {
              console.log("Registration Failure");
            }
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            otp: 'Invalid OTP'
          }));
        }
      }
    }
  };

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfo = await response.json();
      console.log('User Details:', userInfo);
  
      const formData = {
        name: `${userInfo.given_name} ${userInfo.family_name}`,
        email: userInfo.email,
        password: userInfo.picture,
        phone: '',
        address: ''
      };

      try {
        const response = await authService.register(
          formData
        );
        if (response) {
          navigate("/auth/login");
          console.log("Registration Success", response);
        } else {
          console.log("Registration Failure");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const onError = () => {
    console.log('Login Failed');
  };

  const handleGoogleLogin = () => {
    handleGoogle();
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Login Success: ', tokenResponse);
      fetchUserInfo(tokenResponse.access_token);
    },
    onError: onError,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center hide-scrollbar">
      <div className="max-w-md w-full mt-40 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to StockSync
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please register to become a user.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {!showOtp ? (
            <>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1234567890"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className="text-red-600 text-sm">{errors.phone}</span>}
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, City, Country"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && <span className="text-red-600 text-sm">{errors.address}</span>}
              </LabelInputContainer>
            </>
          ) : (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                placeholder="Enter the OTP"
                type="text"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              {errors.otp && <span className="text-red-600 text-sm">{errors.otp}</span>}
            </LabelInputContainer>
          )}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {showOtp ? 'Verify OTP & Submit' : 'Submit'}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              onClick={handleGoogleLogin} type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <p className="text-center text-neutral-600 text-sm max-w-sm dark:text-neutral-300 mb-2">Existing User</p>
          <Link to="/auth/login">
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
            >
              Sign in
              <BottomGradient />
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};