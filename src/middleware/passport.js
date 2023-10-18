const KakaoStrategy = require("passport-kakao").Strategy;
const jwt = require("jsonwebtoken");

const { userDao } = require("../models");

//token 함수
const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" })
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
  return { accessToken, refreshToken }
}

//kakaoStrayegy
const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("kakaoprofile: ", profile)
    const email = profile._json.kakao_account.email;
    const nickname = profile._json.kakao_account.profile.nickname;
    const socialUid = profile.id;
    const socialProvider = 1;
  try{
    // 소셜 로그인 계정 유/무 확인
    const exisitingUserBySocial = await userDao.findUserBySocial(socialUid, socialProvider);
    console.log("exisitingUserBySocial: ", exisitingUserBySocial)
    if (exisitingUserBySocial) {
      const { accessToken, refreshToken } = await generateTokens(exisitingUserBySocial.id);
      console.log("generateTokens: ", accessToken, refreshToken)
      return done(null, { accessToken, refreshToken });  // => 소셜 계정이 있는 경우 토큰 발행
    }
    // 기존 email 유/무 확인
    const exisitingUserByEmail = await userDao.findByEmail(email);
    console.log("exisitingUserByEmail: ", exisitingUserByEmail)
    if (exisitingUserByEmail) {
      await userDao.updateUserBySocial(socialUid, socialProvider, email)
      const { accessToken, refreshToken } = await generateTokens(exisitingUserByEmail.id);
      return done(null, { accessToken, refreshToken }); // => 소셜계정 업데이트 후, 토큰 발행
    } else {
      const createdUserBySocial = await userDao.createUserBySocial(email, nickname, socialUid, socialProvider)
      console.log("createdUserBySocial: ", createdUserBySocial)
      const { accessToken, refreshToken } = await generateTokens(createdUserBySocial.id);
      return done(null, { accessToken, refreshToken }); // => 소셜유저 생성 후, 토큰 발행  
    }
  }catch(error){
    console.log(error)
    done(error)
  }

  }
);

//passport.use("kakao", kakaoStrategy); //==> userRouter에서 사용
module.exports = {
  kakaoStrategy,
}


