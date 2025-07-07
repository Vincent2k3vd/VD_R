import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import BookingForm from "../../components/booking/BookingForm";
import ContactInfo from "../../components/booking/ContactInfo";
import SpecialOffers from "../../components/booking/SpecialOffers";

import Reservation from "../../services/Reservation";

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const tableTypes = [
  {
    id: 1,
    name: "Bàn đôi lãng mạn",
    capacity: "2 người",
    price: "Miễn phí",
    icon: "💕",
  },
  {
    id: 2,
    name: "Bàn gia đình",
    capacity: "4-6 người",
    price: "Miễn phí",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 3,
    name: "Bàn VIP riêng tư",
    capacity: "8-10 người",
    price: "200.000đ",
    icon: "✨",
  },
  {
    id: 4,
    name: "Phòng tiệc lớn",
    capacity: "15+ người",
    price: "500.000đ",
    icon: "🎉",
  },
];

const menuItems = [
  { id: 1, name: "Phở bò đặc biệt", price: 75000 },
  { id: 2, name: "Gỏi cuốn tôm thịt", price: 40000 },
  { id: 3, name: "Cơm tấm sườn bì", price: 65000 },
  { id: 4, name: "Lẩu hải sản", price: 180000 },
];

const RestaurantBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderedItems, setOrderedItems] = useState({});
  const [tables, setTables] = useState([]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      alert("Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
    }, 2000);
  };

  const handleAddItem = (id) => {
    setOrderedItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveItem = (id) => {
    setOrderedItems((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id] -= 1;
      if (updated[id] <= 0) delete updated[id];
      return updated;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchTables = async () => {
      try {
        const data = await Reservation.showTable("available");
        const res = await Reservation.getMyReservations();
        if (isMounted) {
          setTables(data);
          console.log("Bàn còn trống:", data);
        }
        console.log(res);
      } catch (err) {
        if (isMounted) {
          alert(err.message);
        }
      }
    };

    fetchTables();

    // Cleanup function để tránh lỗi memory leak khi unmount component
    return () => {
      isMounted = false;
    };
  }, []);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Đang xử lý đặt bàn...
          </h3>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Đặt Bàn Trực Tuyến
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm ẩm thực tuyệt vời với không gian sang trọng và dịch vụ
            chuyên nghiệp
          </p>
          <div className="flex items-center justify-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-gray-600">(4.9/5 - 1,234 đánh giá)</span>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ContactInfo />
            <SpecialOffers />
            <div>
              <h2>Danh sách bàn còn trống</h2>
              <ul>
                {tables.map((table) => (
                  <li key={table.id}>
                    {table.name} - {table.type} ({table.capacity} chỗ) -{" "}
                    {table.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <BookingForm
            formData={formData}
            handleInputChange={handleInputChange}
            timeSlots={timeSlots}
            tableTypes={tableTypes}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            menuItems={menuItems}
            orderedItems={orderedItems}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantBooking;
