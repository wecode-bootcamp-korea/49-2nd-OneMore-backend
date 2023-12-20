const { AppDataSource } = require("./dataSource");

const signUp = async (email, password, nickname, phoneNumber) => {
  await AppDataSource.query(
    `INSERT INTO users (
        email, 
        password, 
        nickname, 
        phoneNumber
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
      subscriptionState AS subscriptionState
    FROM users 
    WHERE id = ?`,
    [userId]
  );
  return user;
};

const findUserBySocial = async (socialUid, socialProvider) => {
  const [foundUserBySocial] = await AppDataSource.query(
    `SELECT id
     FROM users
     WHERE socialAccountUid = ? AND socialAccountProvider = ?`,
    [socialUid, socialProvider])
  return foundUserBySocial;
};

const createUserBySocial = async (email, nickname, socialUid, socialProvider) => {
  return await AppDataSource.query(
    `INSERT INTO users (
        email, 
        nickname, 
        socialAccountUid, 
        socialAccountProvider
        ) VALUES (?, ?, ?, ?)`,
    [email, nickname, socialUid, socialProvider])
};

const updateUserBySocial = async (userId, socialUid, socialProvider) => {
  return await AppDataSource.query(
    ` UPDATE users
      SET socialAccountUid = ?,
      socialAccountProvider= ?
      WHERE id = ?`,
    [socialUid, socialProvider, userId])
};

module.exports = {
  signUp,
  findUserBySocial,
  createUserBySocial,
  updateUserBySocial,
  findById,
  existingUser,
};