import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const TopInfoBar = () => (
  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>Hotline: 1900-1234</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>123 Đường ABC, Q1</span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>10:00 - 22:00</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Facebook className="w-4 h-4 hover:text-black cursor-pointer" />
        <Instagram className="w-4 h-4 hover:text-black cursor-pointer" />
        <Youtube className="w-4 h-4 hover:text-black cursor-pointer" />
      </div>
    </div>
  </div>
);

export default TopInfoBar;
