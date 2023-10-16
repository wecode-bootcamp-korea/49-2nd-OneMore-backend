const { AppDataSource } = require("./dataSource");

const signUp = async (email, password, nickname, phoneNumber) => {
  await AppDataSource.query(
    `INSERT INTO users (
        email, 
        password, 
        nickname, 
        phone_number
        ) VALUES (?, ?, ?, ?)`,
    [email, password, nickname, phoneNumber])
};

const findByEmail = async (email) => {
  const [existingEmail] = await AppDataSource.query(
    `SELECT email 
    FROM users 
    WHERE email = ?`,
    [email])
  return existingEmail;
};

module.exports = {
  signUp,
  findByEmail,
};
