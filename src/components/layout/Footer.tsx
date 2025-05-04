import React from "react";
import Link from "next/link";
import { FiGithub, FiTwitter, FiMail } from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hakkımızda */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
            <p className="text-gray-300 text-sm">
              Haber Uygulaması, güncel haberleri kullanıcılarına sunmak ve
              interaktif bir haber deneyimi sağlamak için kurulmuştur.
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/gundem"
                  className="text-gray-300 hover:text-white"
                >
                  Gündem
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ekonomi"
                  className="text-gray-300 hover:text-white"
                >
                  Ekonomi
                </Link>
              </li>
              <li>
                <Link
                  href="/category/spor"
                  className="text-gray-300 hover:text-white"
                >
                  Spor
                </Link>
              </li>
              <li>
                <Link
                  href="/category/teknoloji"
                  className="text-gray-300 hover:text-white"
                >
                  Teknoloji
                </Link>
              </li>
              <li>
                <Link
                  href="/category/kultur-sanat"
                  className="text-gray-300 hover:text-white"
                >
                  Kültür-Sanat
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Erişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-gray-300 hover:text-white">
                  Son Haberler
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-gray-300 hover:text-white"
                >
                  Popüler Haberler
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white"
                >
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FiMail className="mr-2" />
                <a
                  href="mailto:info@haberuygulamasi.com"
                  className="text-gray-300 hover:text-white"
                >
                  info@haberuygulamasi.com
                </a>
              </li>
              <li className="flex items-center">
                <FiTwitter className="mr-2" />
                <a
                  href="https://twitter.com/haberuygulamasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  @haberuygulamasi
                </a>
              </li>
              <li className="flex items-center">
                <FiGithub className="mr-2" />
                <a
                  href="https://github.com/haberuygulamasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Haber Uygulaması. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
