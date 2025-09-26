// db/schema.js
import { mysqlTable, int, varchar, decimal, timestamp } from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 50 }).notNull(),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("100.00"), // start with $100
  createdAt: timestamp("created_at").defaultNow(),
});

// Bets table
export const bets = mysqlTable("bets", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  match: varchar("match", { length: 100 }).notNull(),
  selection: varchar("selection", { length: 50 }).notNull(),
  odds: decimal("odds", { precision: 5, scale: 2 }).notNull(),
  stake: decimal("stake", { precision: 10, scale: 2 }).notNull(),
  potentialWin: decimal("potential_win", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), 
  createdAt: timestamp("created_at").defaultNow(),
});
