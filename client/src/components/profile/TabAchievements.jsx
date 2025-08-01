import React from "react";
import { Award } from "lucide-react";

const TabAchievements = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Award />
        <h2 className="text-lg font-semibold">Thành tích</h2>
      </div>
      <p>Chức năng này đang được phát triển...</p>
    </div>
  );
};

export default TabAchievements;
