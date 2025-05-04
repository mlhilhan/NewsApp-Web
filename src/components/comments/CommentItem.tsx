import React, { useState } from "react";
import { Comment } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";
import { FiEdit2, FiTrash2, FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface CommentItemProps {
  comment: Comment;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onUpdate,
  onDelete,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const isOwner = user && user.id === comment.userId;
  const isAdmin = user && user.role === "admin";
  const canModify = isOwner || isAdmin;

  const formattedDate = comment.createdAt
    ? dayjs(comment.createdAt).fromNow()
    : "";

  const handleUpdate = () => {
    if (editedContent.trim() !== "") {
      onUpdate(comment.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowConfirmDelete(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          {/* Kullanıcı avatarı (ilk harfi gösteren daire) */}
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            {comment.user?.username.charAt(0).toUpperCase() || "K"}
          </div>

          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-medium text-gray-800">
                {comment.user?.username || "Kullanıcı"}
              </h4>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-xs text-gray-500 flex items-center">
                <FiClock className="mr-1" size={12} />
                {formattedDate}
              </span>
            </div>

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-gray-700">{comment.content}</p>
            )}
          </div>
        </div>

        {/* Düzenleme ve Silme Düğmeleri */}
        {canModify && !isEditing && (
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-600 rounded"
              title="Düzenle"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1 text-gray-500 hover:text-red-600 rounded"
              title="Sil"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Silme Onay Modal */}
      {showConfirmDelete && (
        <div className="mt-3 bg-red-50 border border-red-100 p-3 rounded-md">
          <p className="text-red-700 text-sm mb-2">
            Bu yorumu silmek istediğinizden emin misiniz?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-3 py-1 text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
            >
              İptal
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-700 rounded"
            >
              Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
