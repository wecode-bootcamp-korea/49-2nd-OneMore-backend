-- migrate:up

CREATE TABLE `articles` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `author_id` integer NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `cover_url` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `article_bookmarks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `article_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);


ALTER TABLE `articles` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `article_bookmarks` ADD FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

ALTER TABLE `article_bookmarks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;



-- migrate:down

ALTER TABLE `articles` DROP FOREIGN KEY `articles_ibfk_1`;

ALTER TABLE `article_bookmarks` DROP FOREIGN KEY `article_bookmarks_ibfk_1`;

ALTER TABLE `article_bookmarks` DROP FOREIGN KEY `article_bookmarks_ibfk_2`;

DROP TABLE `articles`;

DROP TABLE `article_bookmarks`;