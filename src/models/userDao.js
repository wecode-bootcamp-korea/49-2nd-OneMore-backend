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

//기존 소셜으로 가입한 회원이 있는 지 확인
const findUserBySocial = async (socialUid, socialProvider) => {
  const foundUserBySocial = await AppDataSource.query(
    `SELECT id
     FROM users
     WHERE social_account_uid = ? AND social_account_provider = ?`,
    [socialUid, socialProvider])
  return foundUserBySocial[0];
};

//소셜계정으로 회원가입하기
const createUserBySocial = async (email, nickname, socialUid, socialProvider) => {
  return await AppDataSource.query(
    `INSERT INTO users (
        email, 
        nickname, 
        social_account_uid, 
        social_account_provider
        ) VALUES (?, ?, ?, ?)`,
    [email, nickname, socialUid, socialProvider])
  // return createdUserBySocial[0];
};

//소셜계정으로 업데이트
const updateUserBySocial = async (socialUid, socialProvider, email) => {
  return await AppDataSource.query(
    ` UPDATE users
      SET socialUid = ?,
          socialProvider = ?
      WHERE email = ?`,
    [socialUid, socialProvider, email])
  // return updatedUserBySocial[0]
};


module.exports = {
  signUp,
  findByEmail,
  findUserBySocial,
  createUserBySocial,
  updateUserBySocial,
};
