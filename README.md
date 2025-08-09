## Mô tả chi tiết về source code

Dự án **VD_Restaurant Management System** gồm hai phần chính: **Frontend** (client) và **Backend** (server).

### 1. Cấu trúc thư mục

- `/client`: Mã nguồn giao diện người dùng, sử dụng React, Redux, Tailwind CSS.
  - `src/pages`: Các trang chính như Đăng nhập, Đặt bàn, Quản lý menu, v.v.
  - `src/components`: Các thành phần giao diện tái sử dụng (InputField, AuthButton, v.v.).
  - `src/services`: Giao tiếp API với backend (menuItemService.js, reservationService.js, ...).
  - `src/hooks`: Các custom hook cho truy vấn dữ liệu.
- `/server`: Mã nguồn backend, sử dụng Node.js, Express, Sequelize.
  - `/controllers`: Xử lý logic cho các API (userController, reservationController, ...).
  - `/models`: Định nghĩa các bảng dữ liệu (User, MenuItem, Reservation, ...).
  - `/routers`: Định nghĩa các route API.
  - `/middlewares`: Xác thực, phân quyền, xử lý lỗi.
  - `/config`: Cấu hình kết nối database, biến môi trường.

### 2. Chức năng chính

- **Khách hàng**: Xem thực đơn, tìm kiếm món ăn, đặt bàn, đặt món, quản lý thông tin cá nhân.
- **Quản trị viên/Nhân viên**: Quản lý món ăn, bàn, đơn đặt, người dùng, xem báo cáo thống kê.
- **Bảo mật**: Đăng nhập, phân quyền, xác thực JWT.
- **Responsive**: Giao diện tối ưu cho cả máy tính và di động.

### 3. Công nghệ sử dụng

- **Frontend**: React, Redux Toolkit, Tailwind CSS, React Router, Axios.
- **Backend**: Node.js, Express, Sequelize ORM, JWT, MySQL.
- **Khác**: Google OAuth, Cloudinary (quản lý ảnh), dotenv, bcrypt.

---

## Báo cáo kỹ thuật

### 1. Quy trình hoạt động

- Người dùng truy cập website, đăng ký/đăng nhập.
- Có thể xem thực đơn, tìm kiếm, lọc món ăn, đặt bàn trực tuyến.
- Đơn đặt bàn và đặt món được lưu vào database, quản trị viên có thể duyệt và quản lý.
- Hệ thống phân quyền: chỉ admin/staff mới truy cập được các chức năng quản trị.

### 2. Luồng dữ liệu

- **Frontend** gửi request qua Axios tới các endpoint của **Backend**.
- **Backend** xác thực token, xử lý logic, truy vấn database qua Sequelize, trả về kết quả JSON.
- **Frontend** nhận dữ liệu, cập nhật giao diện theo trạng thái.

### 3. Cách mở rộng

- Thêm chức năng thanh toán online, gửi email xác nhận, quản lý voucher/khuyến mãi.
- Tích hợp dashboard báo cáo nâng cao cho quản trị viên.

---

## Hướng dẫn sử dụng

### 1. Cài đặt

```bash
git clone https://github.com/Vincent2k3vd/VD_R.git
cd VD_R

# Cài đặt backend
cd server
npm install

# Cài đặt frontend
cd ../client
npm install

### 2. Cấu hình
Tạo file .env cho cả /server và /client theo mẫu .env.example.
Cấu hình các biến môi trường: kết nối MySQL, JWT_SECRET, Cloudinary, v.v.

### 3. Khởi động dự án

# Chạy backend
cd server
npm run dev

# Chạy frontend
cd ../client
npm start


Tác giả: Doan Van Du (Vincent)
Email: vandu030221@gmail.com
Video & Hình ảnh tại : https://drive.google.com/drive/folders/1ODqBAktWW4RgztbBVDIVWzlCL0vxckle?usp=sharing