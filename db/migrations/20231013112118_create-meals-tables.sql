-- migrate:up

CREATE TABLE `meals` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `meal_image_url` varchar(2000),
  `cooking_time_in_minute` integer,
  `description` varchar(1000),
  `is_vegan` tinyint(1),
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `nutrients` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `meal_id` integer NOT NULL,
  `calories` integer DEFAULT 0,
  `sodium` integer DEFAULT 0,
  `carb` integer DEFAULT 0,
  `unsat_fat` integer DEFAULT 0,
  `sat_fat` integer DEFAULT 0,
  `protein` integer DEFAULT 0,
  `sugar` integer DEFAULT 0,
  `cholesterol` integer DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `meals_allergens` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `meal_id` integer NOT NULL,
  `allergen_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `allergens` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `icon_url` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `meal_plans` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `days` integer NOT NULL,
  `breakfast` tinyint(1) NOT NULL,
  `lunch` tinyint(1) NOT NULL,
  `dinner` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `meals_in_plans` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `meal_plan_id` integer NOT NULL,
  `meal_id` integer NOT NULL,
  `sequence` integer,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

ALTER TABLE `meals_in_plans` ADD UNIQUE KEY(`meal_plan_id`, `sequence`);

ALTER TABLE `nutrients` ADD FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE CASCADE;

ALTER TABLE `meals_allergens` ADD FOREIGN KEY (`allergen_id`) REFERENCES `allergens` (`id`) ON DELETE CASCADE;

ALTER TABLE `meals_allergens` ADD FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE CASCADE;

ALTER TABLE `meals_in_plans` ADD FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE CASCADE;

ALTER TABLE `meals_in_plans` ADD FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE CASCADE;

ALTER TABLE `meal_plans` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;



-- migrate:down

ALTER TABLE `nutrients` DROP FOREIGN KEY `nutrients_ibfk_1`;

ALTER TABLE `meals_allergens` DROP FOREIGN KEY `meals_allergens_ibfk_1`;

ALTER TABLE `meals_allergens` DROP FOREIGN KEY `meals_allergens_ibfk_2`;

ALTER TABLE `meals_in_plans` DROP FOREIGN KEY `meals_in_plans_ibfk_1`;

ALTER TABLE `meals_in_plans` DROP FOREIGN KEY `meals_in_plans_ibfk_2`;

ALTER TABLE `meal_plans` DROP FOREIGN KEY `meal_plans_ibfk_1`;

DROP TABLE `meals`;
DROP TABLE `meals_in_plans`;
DROP TABLE `meal_plans`;
DROP TABLE `meals_allergens`;
DROP TABLE `nutrients`;
DROP TABLE `allergens`;