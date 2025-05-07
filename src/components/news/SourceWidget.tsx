import React from "react";

interface SourceWidgetProps {
  source?: string;
}

const SourceWidget: React.FC<SourceWidgetProps> = ({ source }) => {
  if (!source) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Kaynak
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{source}</p>
    </div>
  );
};

export default SourceWidget;
