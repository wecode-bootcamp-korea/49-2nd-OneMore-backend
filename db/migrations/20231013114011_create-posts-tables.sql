-- migrate:up

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `author_id` integer NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `post_images` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(2000) NOT NULL,
  `post_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `post_replies` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `author_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  `content` varchar(1000),
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `post_likes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `post_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

ALTER TABLE `posts` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `post_images` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `post_replies` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `post_replies` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

ALTER TABLE `post_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `post_likes` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;



-- migrate:down

ALTER TABLE `posts` DROP FOREIGN KEY `posts_ibfk_1`;

ALTER TABLE `post_images` DROP FOREIGN KEY `post_images_ibfk_1`;

ALTER TABLE `post_replies` DROP FOREIGN KEY `post_replies_ibfk_1`;

ALTER TABLE `post_replies` DROP FOREIGN KEY `post_replies_ibfk_2`;

ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_ibfk_1`;

ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_ibfk_2`;

DROP TABLE `posts`;

DROP TABLE `post_images`;

DROP TABLE `post_replies`;

DROP TABLE `post_likes`;