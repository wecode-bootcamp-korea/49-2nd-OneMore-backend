-- migrate:up
INSERT INTO `users`
    (`nickname`, `email`, `subscription_state`)
VALUES
    ('Park-KJ','rudwos6@naver.com',1),
    ('Hong-JS','jisu@naver.com',1),
    ('Sim-AY','AY@gmail.com',0),
    ('PMJ','soccer@yahoo.com',1),
    ('K-SW','software@samsung.com',1),
    ('PIK','pick@apple.com',0),
    ('DANA','DN@naver.com',1),
    ('SHJ','SHJ@daum.net',1),
    ('LSH','mentor@wecode.co.kr',0),
    ('wecoder','omg@naver.com',1);

INSERT INTO `routines`
    (`user_id`, `is_custom`, `name`)
VALUES
    (1,1,'2023-10-26의 루틴'),
    (2,0,'2023-10-25의 루틴'),
    (3,1,'하체만'),
    (4,0,'2023-10-24의 루틴'),
    (5,1,'상체만'),
    (6,0,'1987-05-09의 루틴'),
    (7,0,'1997-12-02의 루틴'),
    (8,1,'여기는 사우나인가'),
    (9,1,'죽었다 생각하고'),
    (10,1,'10/26 - 마무리');

INSERT INTO `exercise_categories`
    (`name`)
VALUES
    ('전신'),
    ('상체'),
    ('하체');

INSERT INTO `exercises`
    (`name`, `video_url`, `thumbnail_url`, `calories_used`, `description`, `is_premium`, `exercise_category`, `duration_in_seconds_per_set`, `counts_per_set`, `set_counts`, `equip_required`)
VALUES
    ('레그 레이즈','https://www.youtube.com/embed/tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',100,'당신도 복근 슈퍼스타',0,3,352,15,3,0),
    ('스쿼트','https://www.youtube.com/embed/q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',150,'Shut Up And Squat!!!!',0,3,700,20,3,0),
    ('바이시클 크런치','https://www.youtube.com/embed/-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',256,'하복부에 특히 좋아요',1,2,111,15,3,0),
    ('푸시 업','https://www.youtube.com/embed/-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',175,'실은 만능운동',0,2,257,17,6,0),
    ('달리기','https://www.youtube.com/embed/9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',300,'봄, 가을에 하기 좋아요',0,1,840,1,1,0),
    ('플랭크','https://www.youtube.com/embed/v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'시간이 안가요',1,1,268,1,1,0),
    ('백 인스텐션','https://www.youtube.com/embed/WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',33,'허리근육 예술',1,2,60,1,3,0),
    ('자전거 타기','https://www.youtube.com/embed/weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',1300,'살 빼는데 특효(허벅지 만들기도 특효)',0,1,1320,1,1,1),
    ('리버스 런지','https://www.youtube.com/embed/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',212,'힘든 값 합니다',1,1,56,12,3,0),
    ('버피','https://www.youtube.com/embed/Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',15000,'죽어봐라',1,1,714,100,1,0),
    ('덤벨 리프팅','https://www.youtube.com/embed/tObWHCnLkKg','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-ios-16-glyph/icons8-%E1%84%86%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5-%E1%84%8E%E1%85%B5%E1%84%85%E1%85%AD-90.png',256,'덤벨로 리프팅',0,2,352,15,3,1),
    ('점프 스쿼트','https://www.youtube.com/embed/q6hBSSfokzY','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-squats-ios-16-filled/icons8-squats-100.png',550,'Shut Up And Squat!!!! season-2',0,3,700,20,3,0),
    ('케틀벨 스윙','https://www.youtube.com/embed/-0sqJcNO098','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pilates-ios-16-glyph/icons8-pilates-90.png',652,'스윙 스윙 스윙 마 베이베',1,1,111,15,3,1),
    ('앵클 웨이트','https://www.youtube.com/embed/-_DUjHxgmWk','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-pushups-ios-16-glyph/icons8-pushups-90.png',350,'다리가 후달달',0,3,257,17,6,1),
    ('벽 밀기','https://www.youtube.com/embed/9CPrrmusOuQ','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-running-ios-16-filled/icons8-running-100.png',200,'벽을 부셔보아요',0,2,840,1,1,0),
    ('카플랭크','https://www.youtube.com/embed/v54Jtmi2BwU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-plank-ios-16-filled/icons8-plank-100.png',56,'중앙만 조져요',1,1,268,1,1,0),
    ('헬스 볼','https://www.youtube.com/embed/WhZ1Qzfp9So','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-%E1%84%83%E1%85%B1%E1%84%85%E1%85%A9-51.png',150,'공놀이',1,1,60,1,3,1),
    ('풀업 바','https://www.youtube.com/embed/weOd8r9JHdU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-cycling-ios-16-filled/icons8-cycling-100.png',365,'다양한 상체 운동',0,2,1320,1,1,1),
    ('스트레칭','https://www.youtube.com/embed/HiryqMG-qlU','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-stretching-ios-16-filled/icons8-stretching-100.png',50,'근육이 시원하게 풀립니다',0,1,56,12,3,0),
    ('물구나무 서서 푸시 업','https://www.youtube.com/embed/Uly8jUuscOw','https://one-more.s3.ap-northeast-2.amazonaws.com/icons8-jumping-ios-16-glyph/icons8-jumping-90.png',7500,'죽어봐라 part.2',1,1,714,100,1,0);

INSERT INTO `routine_exercises` 
    (`routine_id`, `exercise_id`, `completed`)
VALUES
    (1,1,1),
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
    (10,3,1),
    (2,11,1),
    (4,13,0),
    (8,17,0),
    (10,19,1),
    (1,12,0),
    (5,16,0),
    (7,18,1),
    (9,20,1),
    (9,11,0),
    (2,20,0),
    (7,13,1),
    (4,18,0),
    (5,15,1),
    (8,14,1),
    (1,19,0),
    (10,12,0);

INSERT INTO `social_account_providers`
    (`name`)
VALUES
    ('카카오'),
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