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

VALUES ('Leg raise','https://www.youtube.com/watch?v=tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'레그 레이즈',0,3,352,15,3),
('Squat','https://www.youtube.com/watch?v=q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'스쿼트',0,3,700,20,3),
('Bicycle Crunch','https://www.youtube.com/watch?v=-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'바이시클 크런치',1,2,111,15,3),
('Push Up','https://www.youtube.com/watch?v=-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'푸시 업',0,2,257,17,6),
('Running','https://www.youtube.com/watch?v=9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'달리기',0,4,840,1,1),
('Plank','https://www.youtube.com/watch?v=v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'플랭크',1,1,268,1,1),
('Back Extension','https://www.youtube.com/watch?v=WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'백 인스텐션',1,2,60,1,3),
('Cycling','https://www.youtube.com/watch?v=weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'자전거 타기',0,4,1320,1,1),
('Reverse Lunge','https://www.youtube.com/shorts/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'리버스 런지',1,1,56,12,3),
('Burpee','https://www.youtube.com/watch?v=Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'버피',1,1,714,100,1);

INSERT INTO `routine_exercises`(`routine_id`, `exercise_id`, `completed`)
VALUES (1,1,1),
(2,3,1),
(4,5,0),
(4,4,1),
(5,7,1),
(6,9,0),
(7,2,1),
(8,6,0),
(9,10,1),
(10,8,0),
(1,2,0),
(1,3,1),
(3,5,1),
(4,8,1),
(4,7,0),
(4,9,1),
(6,2,0),
(6,4,1),
(6,6,1),
(6,10,1),
(5,1,0),
(2,8,1),
(7,6,1),
(7,7,0),
(8,2,1),
(8,7,1),
(9,5,1),
(9,1,1),
(10,2,0),
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