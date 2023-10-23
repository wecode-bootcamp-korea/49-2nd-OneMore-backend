//  2차 MVP 완료 후, 완성....
// 진짜.... 이해가 안됩니다ㅜㅜㅜㅜㅜ
// const request = require("supertest");
// const nock = require("nock");
// const jwt = require("jsonwebtoken");

// const { app } = require("../../app");
// const { AppDataSource } = require("../../src/models/dataSource");

// describe("SocialLogin", () => {
//     const mockAccessToken = "mockAccessToken";
//     const mockRefreshToken = "mockRefreshToken";

//     beforeAll(async () => {
//         await AppDataSource.initialize();
//         await AppDataSource.query(
//             `
//             INSERT INTO social_account_providers (
//               name
//             ) VALUES ("kakao");
//             `
//         );
//         await AppDataSource.query(
//             `
//             INSERT INTO users (
//               email,
//               nickname,
//               social_account_uid,
//               social_account_provider
//             ) VALUES ("test1@test.com", "test1", 130613, 1)
            
//             `
//         );
//         nock("https://kauth.kakao.com").post("/oauth/token").reply(201, {
//             access_token: mockAccessToken,
//             refresh_token: mockRefreshToken
//         });
//         nock("https://kapi.kakao.com")
//             .get("/v2/user/me")
//             .query({
//                 access_token: mockAccessToken,
//                 refresh_token: mockRefreshToken
//             })
//             .reply(201, {
//                 id: 130613,
//                 kakao_account: {
//                     email: "test1@test.com",
//                     nickname: "test1",
//                 },
//             });
//     });
//     afterAll(async () => {
//         await AppDataSource.query("SET FOREIGN_KEY_CHECKS=0");
//         await AppDataSource.query(`TRUNCATE social_account_providers`);
//         await AppDataSource.query(`TRUNCATE users`);
//         await AppDataSource.query("SET FOREIGN_KEY_CHECKS=1");
//         await AppDataSource.destroy();
//     });

//     test("SUCCESS: socialLogin", async () => {
//         await request(app)
//             .get("/users/oauth/kakao")
//             .query({
//                 mockAccessToken,
//                 mockRefreshToken
//             })
//             .expect(302);

//         const redirect = await request(app)
//             .get("/users/oauth/kakao/callback") 
//             .expect(201); 

//         expect(redirect.body.message).toEqual("LOGIN_SUCCESS");
//         expect(redirect.body.accessToken).toEqual(mockAccessToken);
//         expect(redirect.body.refreshToken).toEqual(mockRefreshToken);
//         expect(redirect.body.nickname).toEqual("test1");
//     });
// });