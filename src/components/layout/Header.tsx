import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from "next/router";
import { FiMenu, FiX, FiUser, FiLogOut, FiSearch } from "react-icons/fi";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Haber Uygulaması
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`hover:text-blue-200 ${
                router.pathname === "/" ? "font-semibold" : ""
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/categories"
              className={`hover:text-blue-200 ${
                router.pathname === "/categories" ? "font-semibold" : ""
              }`}
            >
              Kategoriler
            </Link>
            <Link
              href="/latest"
              className={`hover:text-blue-200 ${
                router.pathname === "/latest" ? "font-semibold" : ""
              }`}
            >
              Son Haberler
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Haber ara..."
                className="px-4 py-1 pr-8 rounded text-gray-800 text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiSearch />
              </button>
            </form>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-200">
                  <FiUser />
                  <span>{user?.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Yönetim Paneli
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/login"
                  className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100"
                >
                  Giriş
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-700 px-4 py-1 rounded hover:bg-blue-800"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Haber ara..."
                  className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <FiSearch />
                </button>
              </div>
            </form>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="py-2 hover:bg-blue-500 px-2 rounded">
                Ana Sayfa
              </Link>
              <Link
                href="/categories"
                className="py-2 hover:bg-blue-500 px-2 rounded"
              >
                Kategoriler
              </Link>
              <Link
                href="/latest"
                className="py-2 hover:bg-blue-500 px-2 rounded"
              >
                Son Haberler
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="py-2 hover:bg-blue-500 px-2 rounded flex items-center"
                  >
                    <FiUser className="mr-2" /> Profil
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="py-2 hover:bg-blue-500 px-2 rounded"
                    >
                      Yönetim Paneli
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="py-2 hover:bg-blue-500 px-2 rounded text-left flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-blue-500">
                  <Link
                    href="/auth/login"
                    className="bg-white text-blue-600 py-2 rounded hover:bg-blue-100 text-center"
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-blue-700 py-2 rounded hover:bg-blue-800 text-center"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
