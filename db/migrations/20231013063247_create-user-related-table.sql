-- migrate:up
CREATE TABLE `social_account_providers` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `addresses` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `address` varchar(300) NOT NULL,
  `detailedAddress` varchar(300) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `user_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `active_users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `token` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

ALTER TABLE `users` ADD FOREIGN KEY (`social_account_provider`) REFERENCES `social_account_providers` (`id`) ON DELETE SET NULL;

ALTER TABLE `addresses` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `active_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;


-- migrate:down

ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_ibfk_1`;

ALTER TABLE `active_users` DROP FOREIGN KEY `active_users_ibfk_1`;

DROP TABLE `social_account_providers`;

DROP TABLE `addresses`;

DROP TABLE `active_users`;

