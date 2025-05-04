# Haber Uygulaması - Frontend

Bu proje, modern haber portalı uygulamasının frontend kısmıdır. Next.js, TypeScript ve TailwindCSS kullanılarak geliştirilmiştir.

## Özellikler

- 📱 Responsive tasarım (hem mobil hem masaüstü için uyumlu)
- 🔐 JWT tabanlı kimlik doğrulama sistemi
- 📰 Haber listeleme, filtreleme ve arama
- 🗂️ Kategori bazlı filtreleme
- 💬 Yorum sistemi
- 👍 Beğeni ve reaksiyon sistemi
- 🌙 Kullanıcı profil yönetimi

## Teknolojiler

- **Next.js**: React framework'ü
- **TypeScript**: Tip güvenliği için
- **TailwindCSS**: Stil ve UI bileşenleri için
- **React Hook Form**: Form yönetimi için
- **Zod**: Form validasyonu için
- **Axios**: API istekleri için
- **Day.js**: Tarih formatlama için
- **React Icons**: İkonlar için
- **React Toastify**: Bildirimler için

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. Depoyu klonlayın:
```bash
git clone https://github.com/kullaniciadi/haber-frontend.git
cd haber-frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme ortamında çalıştırın:
```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcıda açın:
```
http://localhost:3000
```

## Yapılandırma

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ayarlayın:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Proje Yapısı

```
/src
  /components        # Yeniden kullanılabilir bileşenler
    /layout          # Layout bileşenleri (Header, Footer, Sidebar)
    /news            # Haber ile ilgili bileşenler
    /comments        # Yorum bileşenleri
    /ui              # Genel UI bileşenleri
  /contexts          # Context API ile durum yönetimi
  /hooks             # Özel React hooks
  /pages             # Next.js sayfaları
  /services          # API servisleri
  /styles            # Global stiller
  /types             # TypeScript tipleri
  /utils             # Yardımcı fonksiyonlar
```

## Sayfalar

- `/` - Ana sayfa
- `/news/[id]` - Haber detay sayfası
- `/category/[slug]` - Kategori haberleri sayfası
- `/search` - Arama sonuçları sayfası
- `/auth/login` - Giriş sayfası
- `/auth/register` - Kayıt sayfası
- `/profile` - Kullanıcı profil sayfası

## API Entegrasyonu

Frontend, backend API'si ile iletişim kurmak için `apiClient.ts` servisini kullanır. Tüm API istekleri bu servis üzerinden yapılır.

```typescript
// Örnek API isteği
const response = await apiClient.get('/news');
```

## Deployment

Projeyi üretim ortamına deploy etmek için:

```bash
npm run build
npm run start
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Proje Sahibi - [@github_handle](https://github.com/github_handle)

Proje Linki: [https://github.com/github_handle/haber-frontend](https://github.com/github_handle/haber-frontend)
