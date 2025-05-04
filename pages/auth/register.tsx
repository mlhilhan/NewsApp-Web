import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/src/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserPlus,
  FiAlertCircle,
} from "react-icons/fi";

// Form şema doğrulaması
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
      .max(50, "Kullanıcı adı en fazla 50 karakter olabilir")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Kullanıcı adı sadece harf, rakam ve alt çizgi (_) içerebilir"
      ),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register: registerUser,
    error: authError,
    clearError,
    isAuthenticated,
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form gönderme işlemi
  const onSubmit = async (data: RegisterFormValues) => {
    clearError();
    setIsSubmitting(true);

    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // Kayıt başarılıysa yönlendir (AuthContext içinde zaten bu işlemi yapıyor)
    } catch (error) {
      console.error("Kayıt işlemi sırasında hata:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Kayıt Ol - Haber Uygulaması</title>
        <meta
          name="description"
          content="Yeni bir hesap oluşturun ve güncel haberlere erişin"
        />
      </Head>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            <FiUserPlus className="inline-block mr-2" />
            Kayıt Ol
          </h1>

          {/* Hata mesajı */}
          {authError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-start">
              <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          {/* Kayıt formu */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Kullanıcı adı alanı */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="kullanici_adi"
                  disabled={isSubmitting}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* E-posta alanı */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="ornek@email.com"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Şifre alanı */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="******"
                  disabled={isSubmitting}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Şifre tekrar alanı */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Şifre Tekrar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`w-full pl-10 pr-3 py-2 rounded-md border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="******"
                  disabled={isSubmitting}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Kayıt butonu */}
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Kaydediliyor...
                </>
              ) : (
                "Kayıt Ol"
              )}
            </button>
          </form>

          {/* Kullanım şartları */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Kayıt olarak,{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Kullanım Şartları
            </Link>{" "}
            ve{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Gizlilik Politikası
            </Link>
            'nı kabul etmiş olursunuz.
          </div>

          {/* Giriş sayfasına yönlendirme */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Zaten bir hesabınız var mı?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
