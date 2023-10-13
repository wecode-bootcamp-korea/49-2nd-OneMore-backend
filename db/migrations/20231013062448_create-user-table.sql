-- migrate:up
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255),
  `phone_number` varchar(255),
  `subscription_state` tinyint(1) NOT NULL,
  `social_account_provider` int,
  `social_acount_uid` varchar(500),
  `profile_image` varchar(2000),
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

-- migrate:down
DROP TABLE `users`;
