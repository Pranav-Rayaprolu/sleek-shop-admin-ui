// Constants
const TOKEN_KEY = 'sleekshop_auth_token';
const MOCK_EMAIL = 'admin@sleekshop.com';
const MOCK_PASSWORD = 'admin123';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

// Mock authentication functions
export const loginUser = async (credentials: LoginCredentials): Promise<{ token: string; user: AuthUser }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (credentials.email !== MOCK_EMAIL || credentials.password !== MOCK_PASSWORD) {
    throw new Error('Invalid email or password');
  }
  
  // Create a mock token and user
  const token = `mock_token_${Math.random().toString(36).substring(2)}`;
  const user: AuthUser = {
    id: 'user-1',
    name: 'Admin User',
    email: MOCK_EMAIL,
    role: 'Administrator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  };
  
  // Store in localStorage
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('user', JSON.stringify(user));
  
  return { token, user };
};

export const logoutUser = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('user');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getCurrentUser = (): AuthUser | null => {
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as AuthUser;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
}; 