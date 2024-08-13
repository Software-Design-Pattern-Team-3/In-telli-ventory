import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogle } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api.jsx";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface Errors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  otp: string;
}

export function Register() {
  return (
    <GoogleOAuthProvider clientId="772509586103-5h4f5vu58sv9cqkon7jbq63m68nsoh5m.apps.googleusercontent.com">
      <Signup />
    </GoogleOAuthProvider>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<number>(0);
  const [userOtp, setUserOtp] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    otp: ''
  });

  const validateForm = () => {
    const newErrors: Errors = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      otp: ''
    };
    let isValid = true;
    
    if (!formData.firstname) {
      newErrors.firstname = 'First name is required';
      isValid = false;
    }
    if (!formData.lastname) {
      newErrors.lastname = 'Last name is required';
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
    }
    if (showOtp && !userOtp) {
      newErrors.otp = 'OTP is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (!showOtp) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/email`, {
            params: { email: formData.email }
          });
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Email already exists. Please login.'
          }));
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
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
            console.error("Error checking email existence:", error);
            setErrors(prevErrors => ({
              ...prevErrors,
              email: 'An error occurred. Please try again.'
            }));
          }
        }
      } else {
        if (parseInt(userOtp) === otp) {
          setLoading(true);
          try {
            const response = await authService.register(
              formData.firstname,
              formData.lastname,
              formData.email,
              formData.password
            );
            console.log("Registration successful:", response);
            navigate("/auth/login");
          } catch (error) {
            console.error("Registration failed:", error);
            setErrors(prevErrors => ({
              ...prevErrors,
              otp: 'Registration failed. Please try again.'
            }));
          } finally {
            setLoading(false);
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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        
        const googleUser = userInfo.data;
        
        try {
          const response = await authService.register(
            googleUser.given_name,
            googleUser.family_name,
            googleUser.email,
            googleUser.sub // Using Google's sub as a password
          );
          console.log("Google registration successful:", response);
          navigate("/auth/login");
        } catch (error) {
          console.error("Google registration failed:", error);
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Google registration failed. Please try again.'
          }));
        }
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: () => {
      console.log('Google Login Failed');
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Google login failed. Please try again.'
      }));
    },
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
    <div className="h-screen w-screen flex justify-center items-center">
  <Card className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl">Create an account</CardTitle>
      <CardDescription>Enter your details below to create your account</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit}>
        {!showOtp ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  type="text"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                {errors.firstname && <span className="text-red-600 text-sm">{errors.firstname}</span>}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  type="text"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
                {errors.lastname && <span className="text-red-600 text-sm">{errors.lastname}</span>}
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mt-4">
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
            <LabelInputContainer className="mt-4">
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
          </>
        ) : (
          <LabelInputContainer className="mt-4">
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
        <Button
          className="mt-6 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : (showOtp ? "Verify OTP & Register" : "Register")}
        </Button>
      </form>
    </CardContent>
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <CardFooter>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => handleGoogleLogin()}
      >
        <IconBrandGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </CardFooter>
    <div className="mt-4 text-center text-sm">
      Already have an account?{" "}
      <Link to="/auth/login" className="underline">
        Sign in
      </Link>
    </div>
  </Card>
</div>
  );
}

const LabelInputContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {children}
    </div>
  );
};

export default Register;