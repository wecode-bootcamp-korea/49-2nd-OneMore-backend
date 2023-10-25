const KakaoStrategy = require("passport-kakao").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

//token 발행 함수
const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });
  return { accessToken, refreshToken };
};

//kakaoStrategy
const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.kakao_account.email;
    const nickname = profile._json.kakao_account.profile.nickname;
    const socialUid = profile.id;
    const socialProvider = 1;
    try {
      // 소셜 로그인 계정 유/무 확인
      const exisitingUserBySocial = await userDao.findUserBySocial(
        socialUid,
        socialProvider
      );
      if (exisitingUserBySocial) {
        const { accessToken, refreshToken } = await generateTokens(
          exisitingUserBySocial.id
        );
        return done(null, { accessToken, refreshToken, nickname }); // => 소셜 계정이 있는 경우 토큰 발행
      }
      // 기존 email 유/무 확인
      const [exisitingUserByEmail] = await userDao.existingUser(email);
      if (exisitingUserByEmail) {
        await userDao.updateUserBySocial(userId, socialUid, socialProvider);
        const { accessToken, refreshToken } = await generateTokens(
          exisitingUserByEmail.id
        );
        return done(null, { accessToken, refreshToken, nickname }); // => 소셜계정 업데이트 후, 토큰 발행
      } else {
        const createdUserBySocial = await userDao.createUserBySocial(
          email,
          nickname,
          socialUid,
          socialProvider
        );
        const { accessToken, refreshToken } = await generateTokens(
          createdUserBySocial.id
        );
        return done(null, { accessToken, refreshToken, nickname }); // => 소셜유저 생성 후, 토큰 발행
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const socialUid = profile.id;
    const socialProvider = 2;
    const email = profile._json.email;
    const nickname = profile._json.name;
    try {
      const exisitingUserBySocial = await userDao.findUserBySocial(
        socialUid,
        socialProvider
      );
      if (exisitingUserBySocial) {
        //============== 소셜 로그인을 이미 했으면 토큰 발급
        const { accessToken, refreshToken } = await generateTokens(
          exisitingUserBySocial.id
        );
        return cb(null, { accessToken, refreshToken, nickname }); // => 소셜 계정이 있는 경우 토큰 발행
      }
      const [exisitingUserByEmail] = await userDao.existingUser(email);
      if (exisitingUserByEmail) {
        //============== 등록된 이메일이 있으면 소셜 정보 저장
        const userId = exisitingUserByEmail.id;
        await userDao.updateUserBySocial(userId, socialUid, socialProvider);
        const { accessToken, refreshToken } = await generateTokens(
          exisitingUserByEmail.id
        );
        return cb(null, { accessToken, refreshToken, nickname });
      } else {
        //============== 이메일이 없으면 소셜 로그인으로 회원가입 및 토큰 발급
        const createdUserBySocial = await userDao.createUserBySocial(
          email,
          nickname,
          socialUid,
          socialProvider
        );
        const { accessToken, refreshToken } = await generateTokens(
          createdUserBySocial.id
        );
        return cb(null, { accessToken, refreshToken, nickname }); // => 소셜유저 생성 후, 토큰 발행
      }
    } catch (error) {
      console.log(error);
      cb(error);
    }
  }
);

module.exports = {
  kakaoStrategy,
  googleStrategy,
};
