/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "tekhaber.com", "api.tekhaber.com"],
    // Haber resimlerinin geldiği diğer kaynaklar
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Performans optimizasyonları
  swcMinify: true,
  compiler: {
    // Kullanılmayan kodları çıkar
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Internationalized Routing
  i18n: {
    locales: ["tr"],
    defaultLocale: "tr",
  },
};

module.exports = nextConfig;
