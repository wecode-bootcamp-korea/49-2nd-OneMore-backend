-- migrate:up
CREATE TABLE `challenges` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `content` varchar(300) NOT NULL,
  `days` integer NOT NULL,
  `cover_image_url` varchar(2000),
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `user_challenges` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `challenge_id` integer NOT NULL,
  `complete_counts` integer NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);


ALTER TABLE `user_challenges` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `user_challenges` ADD FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`) ON DELETE CASCADE;



-- migrate:down
ALTER TABLE `user_challenges` DROP FOREIGN KEY `user_challenges_ibfk_1`;

ALTER TABLE `user_challenges` DROP FOREIGN KEY `user_challenges_ibfk_2`;

DROP TABLE `user_challenges`;

DROP TABLE `challenges`;

