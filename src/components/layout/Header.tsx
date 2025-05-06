// src/components/layout/Header.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSearch,
  FiMoon,
  FiSun,
  FiBell,
  FiBookmark,
  FiSettings,
} from "react-icons/fi";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  toggleSidebar,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Kaydırma olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex items-center">
            {/* Mobil Menü Butonu */}
            <button
              onClick={toggleSidebar}
              className="mr-3 md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Menüyü aç"
            >
              <FiMenu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-blue-600 text-white p-1.5 rounded-md font-bold text-xl">
                TH
              </span>
              <span className="font-extrabold text-xl dark:text-white">
                Tek Haber
              </span>
            </Link>
          </div>

          {/* Ana Navigasyon */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                router.pathname === "/"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/categories"
              className={`font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                router.pathname === "/categories"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Kategoriler
            </Link>
            <Link
              href="/latest"
              className={`font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                router.pathname === "/latest"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Son Dakika
            </Link>
            <Link
              href="/popular"
              className={`font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                router.pathname === "/popular"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Popüler
            </Link>
          </nav>

          {/* Sağ Kısım */}
          <div className="flex items-center space-x-3">
            {/* Arama Butonu */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Arama"
            >
              <FiSearch size={20} />
            </button>

            {/* Tema Değiştirme */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Açık moda geç" : "Karanlık moda geç"}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Kullanıcı Menüsü */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 pr-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user?.username.charAt(0).toUpperCase() || "K"}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {user?.username}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-40 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiUser className="mr-3 text-gray-600 dark:text-gray-400" />
                      Profil
                    </Link>
                    <Link
                      href="/bookmarks"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiBookmark className="mr-3 text-gray-600 dark:text-gray-400" />
                      Kaydedilenler
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiBookmark className="mr-3 text-gray-600 dark:text-gray-400" />
                      Kaydedilenler
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiBell className="mr-3 text-gray-600 dark:text-gray-400" />
                      Bildirimler
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <FiSettings className="mr-3 text-gray-600 dark:text-gray-400" />
                      Ayarlar
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg
                          className="mr-3 text-gray-600 dark:text-gray-400 w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          ></path>
                        </svg>
                        Yönetim Paneli
                      </Link>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiLogOut className="mr-3" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-block text-sm px-4 py-2 leading-none border rounded text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600 transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition-colors"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arama Paneli */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-40 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Haberlerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 dark:text-white"
              autoFocus
            />
            <FiSearch
              className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400"
              size={20}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
            >
              Ara
            </button>
          </form>
          <button
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Aramayı kapat"
          >
            <FiX size={20} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
