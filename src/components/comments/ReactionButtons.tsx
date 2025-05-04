import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import commentService from "@/src/services/commentService";
import { ReactionType } from "@/src/types";
import { toast } from "react-toastify";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiSmile,
  FiFrown,
  FiAlertTriangle,
  FiMessageCircle,
} from "react-icons/fi";

interface ReactionButtonsProps {
  newsId: number;
}

interface Reaction {
  type: ReactionType;
  count: number;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ newsId }) => {
  const { isAuthenticated, user } = useAuth();
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [reactions, setReactions] = useState<
    { type: ReactionType; count: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Reaksiyon tanımları
  const reactionDefinitions: Record<ReactionType, Omit<Reaction, "count">> = {
    [ReactionType.LIKE]: {
      type: ReactionType.LIKE,
      icon: <FiThumbsUp />,
      label: "Beğen",
      color: "text-blue-600",
    },
    [ReactionType.DISLIKE]: {
      type: ReactionType.DISLIKE,
      icon: <FiThumbsDown />,
      label: "Beğenme",
      color: "text-gray-600",
    },
    [ReactionType.HAPPY]: {
      type: ReactionType.HAPPY,
      icon: <FiSmile />,
      label: "Mutlu",
      color: "text-yellow-500",
    },
    [ReactionType.ANGRY]: {
      type: ReactionType.ANGRY,
      icon: <FiAlertTriangle />,
      label: "Kızgın",
      color: "text-red-600",
    },
    [ReactionType.SAD]: {
      type: ReactionType.SAD,
      icon: <FiFrown />,
      label: "Üzgün",
      color: "text-purple-600",
    },
    [ReactionType.SURPRISED]: {
      type: ReactionType.SURPRISED,
      icon: <FiMessageCircle />,
      label: "Şaşkın",
      color: "text-green-600",
    },
  };

  // Reaksiyonları getir
  const fetchReactions = async () => {
    try {
      setLoading(true);
      const response = await commentService.getReactionsByNewsId(newsId);

      if (response.success) {
        setReactions(response.data || []);
      } else {
        console.error("Reaksiyonlar alınamadı:", response.message);
      }

      // Kullanıcı giriş yapmışsa, kullanıcının reaksiyonunu getir
      if (isAuthenticated) {
        const userReactionResponse =
          await commentService.getUserReactionByNewsId(newsId);
        if (userReactionResponse.success && userReactionResponse.data) {
          setUserReaction(userReactionResponse.data.type);
        } else {
          setUserReaction(null);
        }
      }
    } catch (error) {
      console.error("Reaksiyonları getirme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde reaksiyonları getir
  useEffect(() => {
    fetchReactions();
  }, [newsId, isAuthenticated]);

  // Reaksiyon ekle veya güncelle
  const handleReaction = async (type: ReactionType) => {
    if (!isAuthenticated) {
      toast.info("Reaksiyon eklemek için giriş yapmalısınız", {
        onClick: () => (window.location.href = "/auth/login"),
      });
      return;
    }

    try {
      const response = await commentService.addOrUpdateReaction(newsId, type);

      if (response.success) {
        // Aynı tip ise kaldır, farklı tip ise güncelle
        if (userReaction === type) {
          setUserReaction(null);
        } else {
          setUserReaction(type);
        }

        // Reaksiyonları yeniden yükle
        await fetchReactions();
      } else {
        toast.error(response.message || "Reaksiyon eklenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error("Reaksiyon eklenirken bir hata oluştu");
      console.error("Reaksiyon ekleme hatası:", error);
    }
  };

  // Tüm reaksiyonları görüntüle
  const getReactionButtons = () => {
    // Gösterilecek reaksiyonlar
    const displayedReactions: ReactionType[] = [
      ReactionType.LIKE,
      ReactionType.DISLIKE,
      ReactionType.HAPPY,
      ReactionType.ANGRY,
    ];

    return displayedReactions.map((type) => {
      const definition = reactionDefinitions[type];
      const count = reactions.find((r) => r.type === type)?.count || 0;
      const isActive = userReaction === type;

      return (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
            isActive
              ? `${definition.color} bg-gray-100`
              : "text-gray-600 hover:bg-gray-50"
          }`}
          disabled={loading}
          title={definition.label}
        >
          <span>{definition.icon}</span>
          <span>{count}</span>
        </button>
      );
    });
  };

  return <div className="flex space-x-2">{getReactionButtons()}</div>;
};

export default ReactionButtons;
