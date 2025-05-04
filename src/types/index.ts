// Kullanıcı Tipleri
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  preference?: UserPreference;
}

export interface UserPreference {
  userId: number;
  notificationEnabled: boolean;
  theme: "light" | "dark";
  preferredCategories: string[];
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

// Haber Tipleri
export interface News {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  source?: string;
  author?: string;
  category?: string;
  publishedAt: string;
  externalId?: string;
  createdAt: string;
  updatedAt: string;
  categories?: Category[];
  comments?: Comment[];
  reactions?: ReactionCount[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export interface NewsQueryParams {
  category?: string;
  author?: string;
  source?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
}

// Yorum Tipleri
export interface Comment {
  id: number;
  content: string;
  userId: number;
  newsId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  news?: News;
}

export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
  ANGRY = "angry",
  HAPPY = "happy",
  SAD = "sad",
  SURPRISED = "surprised",
}

export interface Reaction {
  id: number;
  userId: number;
  newsId: number;
  type: ReactionType;
  createdAt: string;
}

export interface ReactionCount {
  type: ReactionType;
  count: number;
}

// API Yanıt Tipleri
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
