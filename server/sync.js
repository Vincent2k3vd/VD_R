const sequelize = require('./config/database.js');
const models = require('./models/index.js');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối thành công.');

    await sequelize.sync({ alter: true });
    console.log('✅ Đồng bộ xong.');
  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await sequelize.close();  // Đóng kết nối sau cùng
    console.log('Đã đóng kết nối database.');
  }
};

module.exports = syncDatabase();

