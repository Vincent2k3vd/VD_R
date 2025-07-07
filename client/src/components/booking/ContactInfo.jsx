import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactInfo = () => (
  <div className="bg-white rounded-3xl shadow-2xl p-6 border border-amber-100">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin liên hệ</h3>
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="bg-amber-100 p-2 rounded-lg">
          <MapPin className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Địa chỉ</p>
          <p className="text-gray-600">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <Phone className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Điện thoại</p>
          <p className="text-gray-600">0123 456 789</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Email</p>
          <p className="text-gray-600">info@nhahangdeluxe.com</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Clock className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">Giờ mở cửa</p>
          <p className="text-gray-600">11:00 - 14:00 | 18:00 - 22:00</p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfo;
