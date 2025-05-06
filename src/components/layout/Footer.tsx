// src/components/layout/Footer.tsx
import React from "react";
import Link from "next/link";
import {
  FiGithub,
  FiTwitter,
  FiMail,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo ve Hakkında */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="bg-blue-600 text-white p-1.5 rounded-md font-bold text-xl">
                  TH
                </span>
                <span className="font-extrabold text-xl dark:text-white">
                  Tek Haber
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Tek Haber, güncel haberleri tarafsız ve hızlı bir şekilde
                okuyucularına ulaştırmayı hedefleyen bir haber platformudur.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/tekhaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                  aria-label="Twitter"
                >
                  <FiTwitter size={20} />
                </a>
                <a
                  href="https://instagram.com/tekhaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                  aria-label="Instagram"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="https://youtube.com/tekhaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                  aria-label="YouTube"
                >
                  <FiYoutube size={20} />
                </a>
                <a
                  href="https://linkedin.com/company/tekhaber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Kategoriler */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Kategoriler
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/category/gundem"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Gündem
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/ekonomi"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Ekonomi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/spor"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Spor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/teknoloji"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Teknoloji
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/kultur-sanat"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Kültür-Sanat
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bağlantılar */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Hızlı Erişim
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/latest"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Son Dakika
                  </Link>
                </li>
                <li>
                  <Link
                    href="/popular"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Popüler Haberler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                İletişim
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiMail className="mr-2" />
                  <a
                    href="mailto:info@tekhaber.com"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    info@tekhaber.com
                  </a>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiTwitter className="mr-2" />
                  <a
                    href="https://twitter.com/tekhaber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    @tekhaber
                  </a>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiGithub className="mr-2" />
                  <a
                    href="https://github.com/tekhaber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    GitHub
                  </a>
                </li>
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                  >
                    İletişime Geç
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Tek Haber. Tüm hakları saklıdır.
            </div>
            <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Kullanım Koşulları
              </Link>
              <Link
                href="/privacy"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/cookies"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
