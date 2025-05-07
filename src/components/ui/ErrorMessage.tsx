import React from "react";
import { useRouter } from "next/router";

interface ErrorMessageProps {
  title?: string;
  message: string;
  buttonText?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Bir hata oluştu",
  message,
  buttonText = "Ana Sayfaya Dön",
}) => {
  const router = useRouter();

  return (
    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-8 rounded-lg text-center">
      <h1 className="text-xl font-semibold mb-2">{title}</h1>
      <p>{message}</p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ErrorMessage;
