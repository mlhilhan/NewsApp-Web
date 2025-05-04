import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginCredentials, RegisterCredentials } from "@/src/types";
import authService from "@/src/services/authService";
import { useRouter } from "next/router";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Token kontrolü ve kullanıcı bilgilerini alma
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Token varsa, kullanıcı bilgilerini getir
          const userData = await authService.getProfile();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            // Token geçersiz, temizle
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Kullanıcı girişi
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(credentials);
      if (result.success && result.data) {
        localStorage.setItem("token", result.data.token);
        setUser(result.data.user);
        setIsAuthenticated(true);
        router.push("/");
      } else {
        setError(result.message || "Giriş başarısız");
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      setError(err.message || "Giriş sırasında bir hata oluştu");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı kaydı
  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.register(credentials);
      if (result.success && result.data) {
        localStorage.setItem("token", result.data.token);
        setUser(result.data.user);
        setIsAuthenticated(true);
        router.push("/");
      } else {
        setError(result.message || "Kayıt başarısız");
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      setError(err.message || "Kayıt sırasında bir hata oluştu");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Çıkış işlemi
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  // Hata temizleme
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
