import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LetterPullup from '@/components/magicui/letter-pullup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check email and show alert message before navigating
    if (email === 'admin@gmail.com') {
      alert('Welcome Admin! Redirecting to the Admin Dashboard.');
      navigate('/admin/dashboard');
    } else {
      alert('Login successful! Redirecting to your Dashboard.');
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-1/4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-2x1">
            <LetterPullup words={"Hello, Who's this?"} delay={0.05} />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="email"
                placeholder="Enter your unique name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          {/* You might not need a separate button for login if the form has a submit button */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
