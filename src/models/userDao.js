const { User } = require("../entity/userEntity");
const { AppDataSource } = require("./dataSource");

const signUp = async (email, password, nickname, phoneNumber) => {
  const createdUser = {
    email: email,
    password: password,
    nickname: nickname,
    phoneNumber: phoneNumber,
  };
  await AppDataSource.manager.save(User, createdUser);
  return createdUser
};

const existingUser = async (email) => {
  const existingUser = await AppDataSource.manager.findOne(User, { where: { email } });
  return existingUser;
};

const findById = async (userId) => {
  const user = await AppDataSource.manager.findOne(User,
    {
      select: {
        id: true,
        subscriptionState: true
      },
      where: {
        id: userId
      }
    }
  );
  return user
};

const findUserBySocial = async (socialUid, socialProvider) => {
  const foundUserBySocial = await AppDataSource.manager.findOne(User, {
    where: {
      socialUid,
      socialProvider
    },
    select: {
      id: true,
    }
  }
  );
  return foundUserBySocial;
};

const createUserBySocial = async (email, nickname, socialUid, socialProvider) => {
  const createdUserBySocial = {
    email: email,
    nickname: nickname,
    socialAccountUid: socialUid,
    socialAccountProvider: socialProvider
  };
  await AppDataSource.manager.save(User, createdUserBySocial);
  return createdUserBySocial
};

const updateUserBySocial = async (userId, socialUid, socialProvider) => {
  return await AppDataSource.manager.update(User, {id: userId}, 
    {
      socialAccountUid: socialUid,
      socialAccountProvider: socialProvider,
  });
};

module.exports = {
  signUp,
  findUserBySocial,
  createUserBySocial,
  updateUserBySocial,
  findById,
  existingUser,
};
