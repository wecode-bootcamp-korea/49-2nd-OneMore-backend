const { AppDataSource } = require("./dataSource");

const signUp = async (email, password, nickname, phoneNumber) => {
  await AppDataSource.query(
    `INSERT INTO users (
        email, 
        password, 
        nickname, 
        phone_number
        ) VALUES (?, ?, ?, ?)`,
    [email, password, nickname, phoneNumber]
  );
};

const existingUser = async (email) => {
  const existingUser = await AppDataSource.query(
    `SELECT * 
    FROM users 
    WHERE email = ?`,
    [email]
  );
  return existingUser;
};

const findById = async (userId) => {
  const [user] = await AppDataSource.query(
    `SELECT 
      id, 
      subscription_state AS subscriptionState
    FROM users 
    WHERE id = ?`,
    [userId]
  );
  return user;
};

module.exports = {
  signUp,
  findById,
  existingUser,
};