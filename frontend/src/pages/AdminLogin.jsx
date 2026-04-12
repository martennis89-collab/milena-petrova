import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogIn } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        username,
        password
      });

      // Store token in localStorage
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_expires_at', response.data.expires_at);

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login min-h-screen bg-gradient-to-b from-[#F5F1EB] to-white flex items-center justify-center px-6">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8C7A6B]/20 mb-4">
              <LogIn className="w-8 h-8 text-[#8C7A6B]" />
            </div>
            <h1 className="font-serif text-3xl text-[#2C2C2C] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-[#4A4A4A]">
              milenapetrova.bg
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[#2C2C2C] mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#2C2C2C] mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8C7A6B] hover:bg-[#6F6154] text-white py-6 text-lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#8C7A6B]">
            <p>Default credentials:</p>
            <p>Username: <strong>admin</strong></p>
            <p>Password: <strong>admin123</strong></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
