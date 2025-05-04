import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiTrendingUp, FiStar, FiTag, FiClock } from "react-icons/fi";
import { Category } from "@/src/types";
import apiClient from "@/src/services/apiClient";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/news/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const isActive = (path: string): boolean => {
    return router.pathname === path || router.asPath.startsWith(path);
  };

  return (
    <aside className="bg-gray-50 w-64 h-full hidden md:block border-r border-gray-200">
      <div className="h-full py-6 px-4 overflow-y-auto">
        <nav className="space-y-1">
          <Link
            href="/"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive("/")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <FiHome className="mr-3" /> Ana Sayfa
          </Link>

          <Link
            href="/latest"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive("/latest")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <FiClock className="mr-3" /> Son Haberler
          </Link>

          <Link
            href="/popular"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive("/popular")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <FiTrendingUp className="mr-3" /> Popüler Haberler
          </Link>

          <Link
            href="/saved"
            className={`flex items-center px-4 py-2 rounded-md ${
              isActive("/saved")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <FiStar className="mr-3" /> Kaydedilen Haberler
          </Link>
        </nav>

        <div className="mt-8">
          <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            KATEGORİLER
          </h3>

          <div className="mt-2 space-y-1">
            {loading ? (
              <div className="px-4 py-2 text-gray-500">Yükleniyor...</div>
            ) : categories.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">Kategori bulunamadı</div>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${
                    isActive(`/category/${category.slug}`)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <FiTag className="mr-3" /> {category.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
