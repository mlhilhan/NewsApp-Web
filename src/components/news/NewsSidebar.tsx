import React from "react";
import { News } from "@/src/types";
import RelatedNewsSidebar from "./RelatedNewsSidebar";
import CategoryWidget from "./CategoryWidget";
import SourceWidget from "./SourceWidget";

interface NewsSidebarProps {
  news: News;
  relatedNews: News[];
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({ news, relatedNews }) => {
  return (
    <div className="space-y-6">
      <RelatedNewsSidebar relatedNews={relatedNews} />
      <CategoryWidget category={news.category} />
      <SourceWidget source={news.source} />
    </div>
  );
};

export default NewsSidebar;
