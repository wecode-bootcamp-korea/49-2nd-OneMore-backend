-- migrate:up
ALTER TABLE exercises ADD COLUMN equip_required TINYINT(1) NOT NULL DEFAULT 0;

-- migrate:down

ALTER TABLE exercises DROP COLUMN equip_required;