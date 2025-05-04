import {
  LoginCredentials,
  RegisterCredentials,
  User,
  AuthResponse,
} from "@/src/types";
import apiClient from "./apiClient";

const authService = {
  /**
   * Kullanıcı girişi
   * @param credentials Giriş bilgileri
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Giriş yapılırken bir hata oluştu",
      };
    }
  },

  /**
   * Kullanıcı kaydı
   * @param credentials Kayıt bilgileri
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Kayıt olurken bir hata oluştu",
      };
    }
  },

  /**
   * Kullanıcı profili bilgilerini getir
   */
  async getProfile(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: User }>(
        "/auth/profile"
      );
      return response.data.success ? response.data.data : null;
    } catch (error) {
      console.error("Profil bilgileri alınamadı:", error);
      return null;
    }
  },

  /**
   * Kullanıcı profil bilgilerini güncelle
   * @param userData Güncellenecek kullanıcı verileri
   */
  async updateProfile(
    userData: Partial<User>
  ): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        message: string;
        data: User;
      }>("/auth/profile", userData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Profil güncellenirken bir hata oluştu",
      };
    }
  },

  /**
   * Kullanıcı şifresini değiştir
   * @param currentPassword Mevcut şifre
   * @param newPassword Yeni şifre
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.put<{
        success: boolean;
        message: string;
      }>("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Şifre değiştirilirken bir hata oluştu",
      };
    }
  },
};

export default authService;
