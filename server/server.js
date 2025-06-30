const express = require('express');
const cors = require ("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const path = require('path');
const cookieParser = require('cookie-parser');

const authRouter = require ('./routers/authR.js');
const db = require('./models');

// Middleware
app.use(cors({
  origin: 'http://localhost:2102', 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publics', 'index.html'));
});

// All route
app.use('/api/auth', authRouter);

// Start server
const start = async () => {
  try {

    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('✅ Khởi tạo kết nối DB thành công.');

    const server = app.listen(port, () => {
      console.log(`🚀 Server đang chạy trên http://localhost:${port}`);
    });

    // Lắng nghe tín hiệu tắt server (Ctrl+C)
    process.on('SIGINT', async () => {
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