import apiClient from "./apiClient";
import { ApiResponse, News, NewsQueryParams, Category } from "@/src/types";

const newsService = {
  /**
   * Tüm haberleri getir
   * @param params Sorgu parametreleri
   */
  async getAllNews(params?: NewsQueryParams): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get<ApiResponse<News[]>>("/news", {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haberler alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Belirli bir haberi getir
   * @param id Haber ID
   */
  async getNewsById(id: number): Promise<ApiResponse<News>> {
    try {
      const response = await apiClient.get<ApiResponse<News>>(`/news/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haber alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Haberleri arama
   * @param keyword Arama anahtar kelimesi
   * @param params Diğer sorgu parametreleri
   */
  async searchNews(
    keyword: string,
    params?: NewsQueryParams
  ): Promise<ApiResponse<News[]>> {
    try {
      const searchParams = { ...params, keyword };
      const response = await apiClient.get<ApiResponse<News[]>>("/news", {
        params: searchParams,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haberler aranırken bir hata oluştu",
      };
    }
  },

  /**
   * Kategoriye göre haberleri getir
   * @param category Kategori adı
   * @param params Diğer sorgu parametreleri
   */
  async getNewsByCategory(
    category: string,
    params?: NewsQueryParams
  ): Promise<ApiResponse<News[]>> {
    try {
      const categoryParams = { ...params, category };
      const response = await apiClient.get<ApiResponse<News[]>>("/news", {
        params: categoryParams,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message:
          error.message || "Kategoriye ait haberler alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Tüm kategorileri getir
   */
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>(
        "/categories"
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Kategoriler alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Yeni haber oluştur (admin için)
   * @param newsData Haber verileri
   */
  async createNews(newsData: Partial<News>): Promise<ApiResponse<News>> {
    try {
      const response = await apiClient.post<ApiResponse<News>>(
        "/news",
        newsData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haber oluşturulurken bir hata oluştu",
      };
    }
  },

  /**
   * Haberi güncelle (admin için)
   * @param id Haber ID
   * @param newsData Güncellenecek haber verileri
   */
  async updateNews(
    id: number,
    newsData: Partial<News>
  ): Promise<ApiResponse<News>> {
    try {
      const response = await apiClient.put<ApiResponse<News>>(
        `/news/${id}`,
        newsData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haber güncellenirken bir hata oluştu",
      };
    }
  },

  /**
   * Haberi sil (admin için)
   * @param id Haber ID
   */
  async deleteNews(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(`/news/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Haber silinirken bir hata oluştu",
      };
    }
  },

  /**
   * Harici haber API'sinden haberleri çekme (admin için)
   * @param params Çekme parametreleri
   */
  async fetchExternalNews(params?: {
    category?: string;
    country?: string;
    pageSize?: number;
  }): Promise<ApiResponse<News[]>> {
    try {
      const response = await apiClient.get<ApiResponse<News[]>>(
        "/news/fetch/external",
        { params }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Harici haberler çekilirken bir hata oluştu",
      };
    }
  },
};

export default newsService;
