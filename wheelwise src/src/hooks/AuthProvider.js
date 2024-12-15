import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const updateUserState = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const data = await response.json();
      const userData = { ...data, token: data.token };
      updateUserState(userData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logout successful');
      navigate('/login');
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'profilePhoto') {
          formData.append(key, value);
        }
      });

      if (updatedData.profilePhoto && updatedData.profilePhoto instanceof File) {
        formData.append('profilePhoto', updatedData.profilePhoto);
      }

      const response = await fetch('http://localhost:8080/api/user/update-profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const data = await response.json();
      const updatedUser = data.user;

      updateUserState({
        firstName: updatedUser.firstname,
        lastName: updatedUser.lastname,
        contactNo: updatedUser.contactNo,
        address: updatedUser.address,
        licenseUrl: updatedUser.licenseUrl,
        profilePhotoUrl: updatedUser.profilePhotoUrl || user.profilePhotoUrl,
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(`Profile update failed: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);