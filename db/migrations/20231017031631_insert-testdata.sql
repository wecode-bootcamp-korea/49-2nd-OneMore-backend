-- migrate:up
INSERT INTO `users`(`nickname`, `email`, `subscription_state`)
VALUES ('Park-KJ','rudwos6@naver.com',1),
('Hong-JS','jisu@naver.com',1),
('Sim-AY','AY@gmail.com',0),
('PMJ','soccer@yahoo.com',1),
('K-SW','software@samsung.com',1),
('PIK','pick@apple.com',0),
('DANA','DN@naver.com',1),
('SHJ','SHJ@daum.net',1),
('LSH','mentor@wecode.co.kr',0),
('wecoder','omg@naver.com',1);

INSERT INTO `routines`(`user_id`, `is_custom`)
VALUES (1,1),
(2,0),
(3,1),
(4,0),
(5,1),
(6,0),
(7,0),
(8,1),
(9,1),
(10,1);

INSERT INTO `exercise_categories`(`name`)
VALUES ('전신'),
('상체'),
('하체'),
('유산소');

INSERT INTO `exercises`(`name`, `video_url`, `thumbnail_url`, `calories_used`, `description`, `is_premium`, `exercise_category`, `duration_in_seconds_per_set`, `counts_per_set`, `set_counts`)

VALUES ('Leg raise','https://www.youtube.com/watch?v=tObWHCnLkKg','https://terms.naver.com/imageDetail.naver?docId=938922&imageUrl=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F2009_000_1%2F20120315140501336_RYAG85YP7.jpg%2FWEIGHT_087_pic_2.jpg%3Ftype%3Dm4500_4500_fst%26wm%3DN',100,'레그 레이즈',0,3,352,15,3),
('Squat','https://www.youtube.com/watch?v=q6hBSSfokzY','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjhfNzQg%2FMDAxNjgyNjMxNTc3NDE3.yoM5npeBSs8-CqVI1K44aq5JtLEPeYA1ytYkxnKaEaAg.zF8Wzq_U2X83X7TSGdziIuolwmggaBZXaBu5Q_OPKMUg.JPEG.inssagym3%2Fa.jpg&type=sc960_832',150,'스쿼트',0,3,700,20,3),
('Bicycle Crunch','https://www.youtube.com/watch?v=-0sqJcNO098','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMDFfMjY2%2FMDAxNTA5NTMwODc4MjYw.4iWF5kjTV0Vk5NepYovWRDPPEVWP4nR4XbvI7NDB-hwg.mXnP2hjJkUE5DhdciCGntbcGUq7OGBH7iBk3B6VjCVkg.JPEG.chingyangn%2Fb5.jpg&type=sc960_832',256,'바이시클 크런치',1,2,111,15,3),
('Push Up','https://www.youtube.com/watch?v=-_DUjHxgmWk','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjFfMTI0%2FMDAxNjk1Mjg0MjE3MDc1.sJ77yv6IE3srA4SPDeJ859WVjrZZnNevYH5A5BJtBSYg.T2lV0O1O4EO898VPKmJ5RRSkjfsAM6pouG_hyb0pmwIg.PNG.gdind0420%2Fimage.png&type=sc960_832',175,'푸시 업',0,2,257,17,6),
('Running','https://www.youtube.com/watch?v=9CPrrmusOuQ','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTVfMTAz%2FMDAxNjc2NDMwNzE1OTQz.AONqot_moGXaoMZteCiTr4Q2QQZ5HpPBY-0ks3R5_lEg.-qzTc7WykgA6xoL5bpKcY3gPGiDuDHHjJGxoXThPSAQg.JPEG.swchoi624%2FIMG_8741.jpg&type=sc960_832',300,'달리기',0,4,840,1,1),
('Plank','https://www.youtube.com/watch?v=v54Jtmi2BwU','https://postfiles.pstatic.net/MjAyMzA1MTRfMTgz/MDAxNjg0MDM5Njk2Mzg0.jjfb82CtFmYJBM20VH5ezcmEa7MxxbC8CrFJD1tEdeYg.7s42r0hCSuEcsbkUbNMe3HL8FRdyxjRAZQjpg6ALdF4g.JPEG.shghwhd1/1684039695777.jpg?type=w966',56,'플랭크',1,1,268,1,1),
('Back Extension','https://www.youtube.com/watch?v=WhZ1Qzfp9So','https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Roman_chair_%28hyperextension%29_animation.gif/440px-Roman_chair_%28hyperextension%29_animation.gif',33,'백 인스텐션',1,2,60,1,3),
('Cycling','https://www.youtube.com/watch?v=weOd8r9JHdU','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMTdfMjkx%2FMDAxNjE1OTY0MDc5NTUy.f9lA_mr1Ssy2CmuFp7YIdNQWIL4dPpVHjtU6n4-0UtAg.r9uchKvkGwRE_yD98Oe283wvChKwoa5MH2nPqSZKLi8g.JPEG.robinkk0%2Ftrd032tg08221.jpg&type=sc960_832',1300,'자전거 타기',0,4,1320,1,1),
('Reverse Lunge','https://www.youtube.com/shorts/HiryqMG-qlU','https://postfiles.pstatic.net/MjAyMjA2MjJfMTU5/MDAxNjU1ODk5MDExNTE0.y-4XadJfWI_U9ziqCmkz0AOErHbk_Uwuz6l0cGnbdLQg.M2CR5alc64TSG1OWvCjS2WA-rtr3rL4jZ5amaICMS-gg.JPEG.wlazofl34/IMG_2445.jpg?type=w966',212,'리버스 런지',1,1,56,12,3),
('Burpee','https://www.youtube.com/watch?v=Uly8jUuscOw','https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDVfMzYg%2FMDAxNjYyMzc0MDI5Mjk3.8nHYkZq7zupRta5Am8oVpzvlCVCf5jblNMMzVfwVsjAg.D2l6nw3QWAXQ_QJ0eMwyfZJ8ad3PITayVTz3CDbTZVIg.PNG.yyeosuk%2F20220905_193332_3.png&type=sc960_832',15000,'버피',1,1,714,100,1);

INSERT INTO `routine_exercises`(`routine_id`, `exercise_id`, `completed`)
VALUES (1,1,1),
(2,3,1),
(3,5,0),
(4,4,1),
(5,7,1),
(6,9,0),
(7,2,1),
(8,6,0),
(9,10,1),
(10,8,0),
(1,1,0),
(1,3,1),
(3,5,1),
(4,4,1),
(4,7,0),
(4,9,1),
(6,2,0),
(6,4,1),
(6,6,1),
(6,9,1),
(5,1,0),
(2,8,1),
(7,6,1),
(7,7,0),
(8,2,1),
(8,6,1),
(9,10,1),
(9,1,1),
(10,8,0),
(10,6,0),
(10,3,1);


INSERT INTO `social_account_providers`(`name`)
VALUES ('카카오'),
('구글'),
('네이버'),
('페이스북');


-- migrate:down

TRUNCATE TABLE `users`;

TRUNCATE TABLE `routines`;

TRUNCATE TABLE `exercise_categories`;

TRUNCATE TABLE `exercises`;

TRUNCATE TABLE `routine_exercises`;

TRUNCATE TABLE `social_account_providers`;