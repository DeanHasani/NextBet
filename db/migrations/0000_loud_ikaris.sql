CREATE TABLE `bets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`match` varchar(100) NOT NULL,
	`selection` varchar(50) NOT NULL,
	`odds` decimal(5,2) NOT NULL,
	`stake` decimal(10,2) NOT NULL,
	`potential_win` decimal(10,2) NOT NULL,
	`status` varchar(20) DEFAULT 'pending',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `bets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`balance` decimal(10,2) DEFAULT '100.00',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
