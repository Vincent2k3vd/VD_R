import { Sparkles, Coffee, Lock } from "lucide-react";

const TABLE_TYPE_CONFIG = {
  standard: {
    name: "Tầng trệt",
    icon: Coffee,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-400",
    selectedColor: "bg-blue-500",
  },
  private: {
    name: "Phòng riêng",
    icon: Lock,
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    borderColor: "border-purple-400",
    selectedColor: "bg-purple-500",
  },
  outdoor: {
    name: "Sân thượng",
    icon: Sparkles,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    borderColor: "border-green-400",
    selectedColor: "bg-green-500",
  },
};

export default TABLE_TYPE_CONFIG;
