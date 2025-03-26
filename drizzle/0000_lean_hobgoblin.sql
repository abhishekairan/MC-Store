CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`image` varchar(255),
	`discountId` int,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupon` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(255) NOT NULL,
	`amount` float NOT NULL,
	`type` varchar(1) NOT NULL,
	CONSTRAINT `coupon_id` PRIMARY KEY(`id`),
	CONSTRAINT `coupon_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `discount` (
	`id` int AUTO_INCREMENT NOT NULL,
	`amount` float NOT NULL,
	`type` varchar(1) NOT NULL,
	CONSTRAINT `discount_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`actionsId` int,
	`price` float NOT NULL,
	`discountId` int,
	`stock` int NOT NULL,
	`description` text,
	`image` varchar(255),
	`categoryId` int,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `server_action` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serverId` int,
	`command` text NOT NULL,
	CONSTRAINT `server_action_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `server` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`ip` varchar(255) NOT NULL,
	CONSTRAINT `server_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`siteName` varchar(255) NOT NULL,
	`siteLogo` varchar(255),
	`serverIp` varchar(255) NOT NULL,
	`pteroAppApi` text NOT NULL,
	`pteroClientApi` text NOT NULL,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int,
	`ign` varchar(255) NOT NULL,
	`productId` int,
	`quantity` int NOT NULL,
	`couponId` int,
	`amount` float NOT NULL,
	`date` date NOT NULL DEFAULT '2025-03-26',
	CONSTRAINT `transaction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`discordId` varchar(255) NOT NULL,
	`discordUsername` varchar(255) NOT NULL,
	`accessToken` text NOT NULL,
	`refreshToken` text NOT NULL,
	`minecraftUsername` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `voting_site` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL,
	CONSTRAINT `voting_site_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_discountId_discount_id_fk` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_actionsId_server_action_id_fk` FOREIGN KEY (`actionsId`) REFERENCES `server_action`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_discountId_discount_id_fk` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_categoryId_category_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `server_action` ADD CONSTRAINT `server_action_serverId_server_id_fk` FOREIGN KEY (`serverId`) REFERENCES `server`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_clientId_user_id_fk` FOREIGN KEY (`clientId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_productId_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_couponId_coupon_id_fk` FOREIGN KEY (`couponId`) REFERENCES `coupon`(`id`) ON DELETE no action ON UPDATE no action;