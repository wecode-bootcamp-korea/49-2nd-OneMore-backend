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

VALUES ('레그 레이즈','https://www.youtube.com/embed/tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'당신도 복근 슈퍼스타',0,3,352,15,3),
('스쿼트','https://www.youtube.com/embed/q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'Shut Up And Squat!!!!',0,3,700,20,3),
('바이시클 크런치','https://www.youtube.com/embed/-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'하복부에 특히 좋아요',1,2,111,15,3),
('푸시 업','https://www.youtube.com/embed/-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'실은 만능운동',0,2,257,17,6),
('달리기','https://www.youtube.com/embed/9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'봄, 가을에 하기 좋아요',0,4,840,1,1),
('플랭크','https://www.youtube.com/embed/v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'시간이 안가요',1,1,268,1,1),
('백 인스텐션','https://www.youtube.com/embed/WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'허리근육 예술',1,2,60,1,3),
('자전거 타기','https://www.youtube.com/embed/weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'살 빼는데 특효(허벅지 만들기도 특효)',0,4,1320,1,1),
('리버스 런지','https://www.youtube.com/embed/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'힘든 값 합니다',1,1,56,12,3),
('버피','https://www.youtube.com/embed/Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'죽어봐라',1,1,714,100,1);

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