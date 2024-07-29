import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Add additional sign-up logic here, such as sending data to your backend

    alert('Registration successful! Redirecting to login page.');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-full max-w-md absolute top-20 p-2">
        <CardHeader className="mb--5">
          <CardTitle className="text-lg">Welcome! 👋🏻</CardTitle>
          <CardDescription className="text-sm top-20">Let's create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="text-sm"
              autoFocus
            />
            <span className="text-xs text-gray-500">Never shown to the public.</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username" className="text-sm">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={20}
              placeholder="Choose a unique username"
              className="text-sm"
            />
            <span className="text-xs text-gray-500">Unique, no spaces, short.</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="text-sm"
            />
            <span className="text-xs text-gray-500">At least 10 characters.</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm">Password Again</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="text-sm"
            />
          </div>
          {/* <div className="space-y-1">
            <Label htmlFor="name" className="text-sm">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name (optional)"
              className="text-sm"
            />
            <span className="text-xs text-gray-500">Your full name (optional).</span>
          </div> */}
        </CardContent>
        <Button className="w-full" onClick={handleSignUp}>Sign Up</Button>
        <div className="text-center text-xs text-gray-500">
          By registering, you agree to the <a href="/privacy" className="text-blue-500" target="_blank" rel="noopener noreferrer">privacy policy</a> and <a href="/tos" className="text-blue-500" target="_blank" rel="noopener noreferrer">terms of service</a>.
        </div>
        <div className="text-center text-xs">
          Already have an account? <Button variant="link" onClick={() => navigate('/login')}>Log In</Button>
        </div>
        {/* <CardFooter className="flex flex-col items-center space-y-1"> */}
        {/* </CardFooter> */}
      </Card>
    </div>
  );
};

export default Register;
