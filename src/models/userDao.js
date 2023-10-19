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
  const { existingUser } = await AppDataSource.query(
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
    [userId])
  return user;
};

const findUserBySocial = async (socialUid, socialProvider) => {
  const foundUserBySocial = await AppDataSource.query(
    `SELECT id
     FROM users
     WHERE social_account_uid = ? AND social_account_provider = ?`,
    [socialUid, socialProvider])
  return foundUserBySocial[0];
};

const createUserBySocial = async (email, nickname, socialUid, socialProvider) => {
  return await AppDataSource.query(
    `INSERT INTO users (
        email, 
        nickname, 
        social_account_uid, 
        social_account_provider
        ) VALUES (?, ?, ?, ?)`,
    [email, nickname, socialUid, socialProvider])
};

const updateUserBySocial = async (socialUid, socialProvider, email) => {
  return await AppDataSource.query(
    ` UPDATE users
      SET socialUid = ?,
          socialProvider = ?
      WHERE email = ?`,
    [socialUid, socialProvider, email])
};


module.exports = {
  signUp,
  // findByEmail,
  findUserBySocial,
  createUserBySocial,
  updateUserBySocial,
  findById,
  existingUser,
};
