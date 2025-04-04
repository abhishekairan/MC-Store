ALTER TABLE `category` DROP FOREIGN KEY `category_discountId_discount_id_fk`;
--> statement-breakpoint
ALTER TABLE `product` DROP FOREIGN KEY `product_discountId_discount_id_fk`;
--> statement-breakpoint
ALTER TABLE `product` DROP FOREIGN KEY `product_categoryId_category_id_fk`;
--> statement-breakpoint
ALTER TABLE `server_action` DROP FOREIGN KEY `server_action_serverId_server_id_fk`;
--> statement-breakpoint
ALTER TABLE `server_action` DROP FOREIGN KEY `server_action_product_product_id_fk`;
--> statement-breakpoint
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_clientId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_productId_product_id_fk`;
--> statement-breakpoint
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_couponId_coupon_id_fk`;
--> statement-breakpoint
ALTER TABLE `server_action` MODIFY COLUMN `product` int;--> statement-breakpoint
ALTER TABLE `transaction` MODIFY COLUMN `date` date NOT NULL DEFAULT '2025-04-04';--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_discountId_discount_id_fk` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_discountId_discount_id_fk` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_categoryId_category_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_action` ADD CONSTRAINT `server_action_serverId_server_id_fk` FOREIGN KEY (`serverId`) REFERENCES `server`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_action` ADD CONSTRAINT `server_action_product_product_id_fk` FOREIGN KEY (`product`) REFERENCES `product`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_clientId_user_id_fk` FOREIGN KEY (`clientId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_productId_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_couponId_coupon_id_fk` FOREIGN KEY (`couponId`) REFERENCES `coupon`(`id`) ON DELETE cascade ON UPDATE no action;