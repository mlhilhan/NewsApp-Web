import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiHome,
  FiTrendingUp,
  FiStar,
  FiTag,
  FiClock,
  FiCompass,
  FiX,
  FiBookmark,
  FiMenu,
  FiAlertCircle,
} from "react-icons/fi";
import { Category } from "@/src/types";
import newsService from "@/src/services/newsService";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await newsService.getAllCategories();
        if (response.success) {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      router.events.on("routeChangeStart", toggleSidebar);
    }

    return () => {
      router.events.off("routeChangeStart", toggleSidebar);
    };
  }, [isOpen, router.events, toggleSidebar]);

  const isActive = (path: string): boolean => {
    if (path === "/") {
      return router.pathname === "/";
    }

    return router.pathname.startsWith(path) && path !== "/";
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 w-72 shadow-xl transform transition-transform duration-300 md:sticky md:transform-none md:shadow-none md:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 md:hidden">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={toggleSidebar}
            >
              <span className="bg-blue-600 text-white p-1 rounded-md font-bold text-lg">
                TH
              </span>
              <span className="font-bold text-lg dark:text-white">
                Tek Haber
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label="Menüyü kapat"
            >
              <FiX size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 py-6 px-3 overflow-y-auto">
            <nav className="space-y-1">
              <Link
                href="/"
                className={`flex items-center px-4 py-2.5 rounded-xl ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
              >
                <FiHome className="mr-3" size={20} />
                Ana Sayfa
              </Link>

              <Link
                href="/breaking-news"
                className={`flex items-center px-4 py-2.5 rounded-xl ${
                  isActive("/breaking-news")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
              >
                <FiClock className="mr-3" size={20} />
                Son Dakika
              </Link>

              <Link
                href="/popular"
                className={`flex items-center px-4 py-2.5 rounded-xl ${
                  isActive("/popular")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
              >
                <FiTrendingUp className="mr-3" size={20} />
                Popüler
              </Link>

              {/* <Link
                href="/categories"
                className={`flex items-center px-4 py-2.5 rounded-xl ${
                  isActive("/categories")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
              >
                <FiCompass className="mr-3" size={20} />
                Keşfet
              </Link> */}

              <Link
                href="/saved"
                className={`flex items-center px-4 py-2.5 rounded-xl ${
                  isActive("/saved")
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
              >
                <FiBookmark className="mr-3" size={20} />
                Kaydedilenler
              </Link>
            </nav>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                KATEGORİLER
              </h3>

              <div className="mt-2 space-y-1">
                {loading ? (
                  <div className="px-4 py-2 text-gray-500 dark:text-gray-400 flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 animate-spin mr-2"></div>
                    Yükleniyor...
                  </div>
                ) : categories.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500 dark:text-gray-400 flex items-center">
                    <FiAlertCircle className="mr-2" />
                    Kategori bulunamadı
                  </div>
                ) : (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className={`flex items-center px-4 py-2 text-sm rounded-xl ${
                        isActive(`/category/${category.slug}`)
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      } transition`}
                    >
                      <FiTag className="mr-2.5" size={16} />
                      {category.name}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                İçerik Önerileri
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                Haber ve içerik önermek için bizimle iletişime geçin.
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 block text-center py-2 px-4 rounded-lg transition"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
