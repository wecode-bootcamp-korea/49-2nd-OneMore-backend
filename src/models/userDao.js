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

const findUserBySocial = async (socialAccountUid, socialAccountProvider) => {
  const foundUserBySocial = await AppDataSource.manager.findOne(User, {
    where: {
      socialAccountUid,
      socialAccountProvider
    },
    select: {
      id: true,
    }
  }
  );
  return foundUserBySocial;
};

const createUserBySocial = async (email, nickname, socialAccountUid, socialAccountProvider) => {
  const createdUserBySocial = {
    email: email,
    nickname: nickname,
    socialAccountUid: socialAccountUid,
    socialAccountProvider: socialAccountProvider
  };
  await AppDataSource.manager.save(User, createdUserBySocial);
  return createdUserBySocial
};

const updateUserBySocial = async (userId, socialAccountUid, socialAccountProvider) => {
  return await AppDataSource.manager.update(User, { id: userId },
    {
      socialAccountUid: socialAccountUid,
      socialAccountProvider: socialAccountProvider,
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
