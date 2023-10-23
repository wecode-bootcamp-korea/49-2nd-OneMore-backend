-- migrate:up
ALTER TABLE `routines`
ADD COLUMN `name` VARCHAR(20) NOT NULL

-- migrate:down
ALTER TABLE `routines`
DROP COLUMN `name`