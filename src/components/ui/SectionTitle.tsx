import React from "react";
import {
  FiClock,
  FiTrendingUp,
  FiStar,
  FiCompass,
  FiBookmark,
  FiAlertCircle,
  FiCalendar,
} from "react-icons/fi";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  icon?:
    | "clock"
    | "trending"
    | "star"
    | "compass"
    | "bookmark"
    | "alert"
    | "calendar"
    | "none";
  description?: string;
  actionText?: string;
  actionUrl?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon = "none",
  description,
  actionText,
  actionUrl,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "clock":
        return <FiClock className="text-blue-600 mr-2" size={24} />;
      case "trending":
        return <FiTrendingUp className="text-blue-600 mr-2" size={24} />;
      case "star":
        return <FiStar className="text-blue-600 mr-2" size={24} />;
      case "compass":
        return <FiCompass className="text-blue-600 mr-2" size={24} />;
      case "bookmark":
        return <FiBookmark className="text-blue-600 mr-2" size={24} />;
      case "alert":
        return <FiAlertCircle className="text-blue-600 mr-2" size={24} />;
      case "calendar":
        return <FiCalendar className="text-blue-600 mr-2" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div className="flex items-center">
        {icon !== "none" && getIcon()}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {actionText && actionUrl && (
        <Link
          href={actionUrl}
          className="mt-2 md:mt-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-medium transition-colors"
        >
          {actionText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
