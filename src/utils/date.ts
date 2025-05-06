import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

/**
 * Tarihi insan tarafından okunabilir rölatif zaman formatına dönüştürür
 * @param dateString Tarih string'i
 * @returns Formatlanmış tarih
 */
export const formatRelativeTime = (dateString: string) => {
  if (!dateString) return "";

  // Şu anki zamanı al
  const now = dayjs();
  // Haber zamanını al
  const newsDate = dayjs(dateString);

  // Eğer gelecek bir tarihse (muhtemelen saat dilimi veya saat ayarı sorunu)
  if (newsDate.isAfter(now)) {
    return "Az önce"; // Gelecek tarih ise "Az önce" göster
  }

  return newsDate.fromNow(); // Geçmiş tarih ise normal fromNow() kullan
};

/**
 * Tarihi tam formatta gösterir (ör. 23 Mayıs 2024, 15:30)
 * @param dateString Tarih string'i
 * @returns Formatlanmış tarih
 */
export const formatFullDate = (dateString: string) => {
  if (!dateString) return "";

  return dayjs(dateString).format("DD MMMM YYYY, HH:mm");
};
