CREATE TABLE `companyInfo` (
	`id` integer PRIMARY KEY NOT NULL,
	`residential_phone` text DEFAULT '(000) 000-0000' NOT NULL,
	`commercial_phone` text DEFAULT '(000) 000-0000' NOT NULL,
	`email` text DEFAULT 'something@hello.com' NOT NULL,
	`hours` text DEFAULT '{"monday":[8,17],"tuesday":[8,17],"wednesday":[8,17],"thursday":[8,17],"friday":[8,17],"saturday":[9,14],"sunday":[0,0]}' NOT NULL,
	`service_areas` text DEFAULT '[]' NOT NULL,
	`service_areas_geojson` text DEFAULT '{"type":"FeatureCollection","bounds":[0,0,0,0],"features":[]}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contactInquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text NOT NULL,
	`service` text,
	`frequency` text,
	`location` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `marketingCampaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_core` integer DEFAULT 0 NOT NULL,
	`display_color` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`text` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trafficSources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_agent` text NOT NULL,
	`source` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`source`) REFERENCES `marketingCampaigns`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text,
	`password` text,
	`access_token` text,
	`refresh_token` text,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_user_index` ON `accounts` (`user`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`user` text NOT NULL,
	FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `session_user_index` ON `sessions` (`user`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`role` text NOT NULL,
	`notification_preferences` text DEFAULT '{"inquiries":true}' NOT NULL,
	CONSTRAINT "valid_notification_preferences" CHECK(json_valid("users"."notification_preferences"))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);