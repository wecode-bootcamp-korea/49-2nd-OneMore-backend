-- migrate:up
ALTER TABLE `addresses` MODIFY COLUMN `zip_code` varchar(10) NOT NULL;
ALTER TABLE `exercises` RENAME COLUMN `setCounts` TO `set_counts`;

-- migrate:down

ALTER TABLE `addresses` MODIFY COLUMN `zip_code` integer NOT NULL;
ALTER TABLE `exercises` RENAME COLUMN `set_counts` TO `setCounts`;