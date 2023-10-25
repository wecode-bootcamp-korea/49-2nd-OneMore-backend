const axios = require('axios');
const utils = require("../utils");
const { subscriptionService } = require("../services");

const subscribePayment = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { imp_uid } = req.body;

        //key error check
        if (!imp_uid) utils.throwError(400, 'KEY_ERROR_UID');

        // 액세스 토큰(access token) 발급 받기(by 포트원)
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: process.env.IMP_KEY,
                imp_secret: process.env.IMP_SECRET
            }
        });
        const { access_token } = getToken.data.response;

        //프론트에서 보내준 imp_uid와 access_token을 가지고 유저의 결제정보 불러오기
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`,
            method: "GET",
            headers: { "Authorization": access_token }
        });

        //필요한 유저의 결제정보 가져오기
        const { amount, pg_provider } = getPaymentData.data.response;

        //에러 처리하기
        if (!amount) utils.throwError(400, 'KEY_ERROR_AMOUNT');
        if (amount != 3900) utils.throwError(400, 'IS_NOT_AMOUNT');
        if (!pg_provider) utils.throwError(400, 'KEY_ERROR_PROVIDER');

        //함수 호출
        const getSubscription = await subscriptionService.createSubscription(userId, amount, pg_provider);
        return res.status(201).json({
            message: 'SUCESS_SUBSCRIPTION_AND_PAYMENT',
            getSubscription: getSubscription
        });
    } catch (error) {
        console.log(error)
        next(error);
    };
};

module.exports = { subscribePayment };