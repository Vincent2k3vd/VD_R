const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const db = require('./models');
const authRouter = require('./routers/authRoutes');
const tableRouter = require('./routers/tableRoutes');
const menuItemRoutes = require('./routers/menuItemRoutes');
const reservationRoutes = require('./routers/reservationRoutes');
const userRouter = require('./routers/userRoutes'); // đổi tên rõ ràng
const { applySecurityMiddleware, errorHandler, notFoundHandler } = require('./middlewares/security');

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:2102',
  credentials: true,
}));

// Middleware
applySecurityMiddleware(app);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'publics')));

// Route test
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publics', 'index.html'));
});

// Routers
app.use('/api/auth', authRouter);
app.use('/api/tables', tableRouter);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRouter);

// Error handling
app.use(errorHandler);
app.use(notFoundHandler);

// Server
const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });

    console.log('✅ Kết nối DB thành công.');

    const server = app.listen(port, () => {
      console.log(`🚀 Server chạy tại http://localhost:${port}`);
    });

    process.on('SIGINT', async () => {
      await db.sequelize.close();
      server.close(() => {
        console.log('❌ Server đã tắt.');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Không thể kết nối DB:', error);
  }
};

start();
