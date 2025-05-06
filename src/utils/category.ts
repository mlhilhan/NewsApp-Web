/**
 * Kategori slug'ını okunabilir formata dönüştürür
 * @param slug Kategori slug'ı
 * @returns okunabilir kategori adı
 */
export const getCategoryName = (slug?: string) => {
  if (!slug) return "";

  const categoryMap: Record<string, string> = {
    "breaking-news": "Son Dakika",
    gundem: "Gündem",
    ekonomi: "Ekonomi",
    dunya: "Dünya",
    politika: "Politika",
    spor: "Spor",
    teknoloji: "Teknoloji",
    "kultur-sanat": "Kültür-Sanat",
    saglik: "Sağlık",
    yasam: "Yaşam",
    bilim: "Bilim",
    egitim: "Eğitim",
    cevre: "Çevre",
    "is-dunyasi": "İş Dünyası",
  };

  return categoryMap[slug] || slug;
};

/**
 * Kategori adından slug oluşturur
 * @param name Kategori adı
 * @returns Slug
 */
export const getCategorySlug = (name?: string) => {
  if (!name) return "";

  const slugMap: Record<string, string> = {
    "Son Dakika": "breaking-news",
    Gündem: "gundem",
    Ekonomi: "ekonomi",
    Dünya: "dunya",
    Politika: "politika",
    Spor: "spor",
    Teknoloji: "teknoloji",
    "Kültür-Sanat": "kultur-sanat",
    Sağlık: "saglik",
    Yaşam: "yasam",
    Bilim: "bilim",
    Eğitim: "egitim",
    Çevre: "cevre",
    "İş Dünyası": "is-dunyasi",
  };

  return (
    slugMap[name] ||
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[ğ]/g, "g")
      .replace(/[ü]/g, "u")
      .replace(/[ş]/g, "s")
      .replace(/[ı]/g, "i")
      .replace(/[ö]/g, "o")
      .replace(/[ç]/g, "c")
  );
};
