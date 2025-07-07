const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require ("cors");
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const port = process.env.PORT;


const db = require('./models');
const authRouter = require ('./routers/authRoutes.js');
const reservationRouter = require ('./routers/reservationRoutes.js')
const { applySecurityMiddleware, errorHandler, notFoundHandler} = require('./middlewares/security');


app.use(cors({
  origin: 'http://localhost:2102',
  credentials: true,
}));



applySecurityMiddleware(app);


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'publics')));
// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'publics', 'index.html'));
});

// All route
app.use('/api/auth', authRouter);
app.use('/api/reservation', reservationRouter);


// Error handling middleware
app.use(errorHandler);  
app.use(notFoundHandler);

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