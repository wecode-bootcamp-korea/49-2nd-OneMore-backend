-- migrate:up

CREATE TABLE `subscription_orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `amount` int NOT NULL,
  `provider` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

ALTER TABLE `subscription_orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

-- migrate:down

ALTER TABLE `subscription_orders` DROP FOREIGN KEY `subscription_orders_ibfk_1`;

DROP TABLE `subscription_orders`;