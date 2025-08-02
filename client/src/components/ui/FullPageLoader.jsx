import React from "react";
import { Loader2 } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
        <p className="mt-4 text-white text-sm">Đang xử lý, vui lòng chờ...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
