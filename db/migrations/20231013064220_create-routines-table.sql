-- migrate:up

CREATE TABLE `routines` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `is_custom` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `routine_exercises` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `routine_id` integer NOT NULL,
  `exercise_id` integer NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `exercises` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `video_url` varchar(2000) NOT NULL,
  `thumbnail_url` varchar(2000) NOT NULL,
  `calories_used` integer,
  `description` varchar(1000),
  `is_premium` tinyint(1) NOT NULL,
  `exercise_category` integer NOT NULL,
  `duration_in_seconds_per_set` integer NOT NULL,
  `counts_per_set` integer DEFAULT 1,
  `set_counts` integer NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `exercise_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

ALTER TABLE `routine_exercises` ADD FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`) ON DELETE CASCADE;

ALTER TABLE `routine_exercises` ADD FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE;

ALTER TABLE `exercises` ADD FOREIGN KEY (`exercise_category`) REFERENCES `exercise_categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `routines` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- migrate:down

ALTER TABLE `routine_exercises` DROP FOREIGN KEY `routine_exercises_ibfk_1`;

ALTER TABLE `routine_exercises` DROP FOREIGN KEY `routine_exercises_ibfk_2`;

ALTER TABLE `exercises` DROP FOREIGN KEY `exercises_ibfk_1`;

ALTER TABLE `routines` DROP FOREIGN KEY `routines_ibfk_1`;

DROP TABLE `routine_exercises`;

DROP TABLE `exercises`;

DROP TABLE `routines`;