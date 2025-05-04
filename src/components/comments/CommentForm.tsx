import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  initialValue?: string;
  buttonText?: string;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  initialValue = "",
  buttonText = "Gönder",
  placeholder = "Yorumunuzu buraya yazın...",
}) => {
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(content);
      setContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={4}
        required
        disabled={isSubmitting}
      />

      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-gray-500">
          {content.length === 0
            ? "Lütfen düşüncelerinizi paylaşın."
            : `${content.length} karakter`}
        </p>

        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
            isSubmitting || !content.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <FiSend className="mr-2" />
          )}
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
