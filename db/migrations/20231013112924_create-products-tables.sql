-- migrate:up

CREATE TABLE `products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `cover_image_url` varchar(2000) NOT NULL,
  `description` varchar(1000),
  `price` integer NOT NULL,
  `member_discount_rate` float NOT NULL DEFAULT 0,
  `subcategory_id` integer NOT NULL,
  `stock_amount` integer NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `product_categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `product_subcategories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `category_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `product_images` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(2000) NOT NULL,
  `product_id` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `carts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `product_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `product_orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `address` varchar(300) NOT NULL,
  `detailed_address` varchar(300) NOT NULL,
  `receiver_name` varchar(100) NOT NULL,
  `receiver_phone_number` varchar(100) NOT NULL,
  `sender_name` varchar(100),
  `delivery_message` varchar(100),
  `amount` int NOT NULL,
  `provider` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `ordered_items` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer NOT NULL,
  `order_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);


ALTER TABLE `product_subcategories` ADD FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `products` ADD FOREIGN KEY (`subcategory_id`) REFERENCES `product_subcategories` (`id`) ON DELETE CASCADE;

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `carts` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `product_orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

ALTER TABLE `ordered_items` ADD FOREIGN KEY (`order_id`) REFERENCES `product_orders` (`id`) ON DELETE CASCADE;

ALTER TABLE `ordered_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;


-- migrate:down

ALTER TABLE `product_subcategories` DROP FOREIGN KEY `product_subcategories_ibfk_1`;

ALTER TABLE `products` DROP FOREIGN KEY `products_ibfk_1`;

ALTER TABLE `product_images` DROP FOREIGN KEY `product_images_ibfk_1`;

ALTER TABLE `carts` DROP FOREIGN KEY `carts_ibfk_1`;

ALTER TABLE `carts` DROP FOREIGN KEY `carts_ibfk_2`;

ALTER TABLE `product_orders` DROP FOREIGN KEY `product_orders_ibfk_1`;

ALTER TABLE `ordered_items` DROP FOREIGN KEY `ordered_items_ibfk_1`;

ALTER TABLE `ordered_items` DROP FOREIGN KEY `ordered_items_ibfk_2`;

DROP TABLE `product_categories`;

DROP TABLE `product_subcategories`;

DROP TABLE `products`;

DROP TABLE `product_images`;

DROP TABLE `carts`;

DROP TABLE `product_orders`;

DROP TABLE `ordered_items`;

