import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const publishStateEnum = pgEnum("publish_state", ["draft", "review", "published", "archived"]);
export const notificationTypeEnum = pgEnum("notification_type", ["system", "billing", "registry", "security"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["trialing", "active", "past_due", "canceled"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    role: userRoleEnum("role").default("user").notNull(),
    onboardingComplete: boolean("onboarding_complete").default(false).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email), index("users_role_idx").on(table.role)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    token: varchar("token", { length: 512 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipAddress: varchar("ip_address", { length: 120 }),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [uniqueIndex("sessions_token_unique").on(table.token), index("sessions_user_id_idx").on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: varchar("account_id", { length: 320 }).notNull(),
    providerId: varchar("provider_id", { length: 120 }).notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
    scope: text("scope"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("accounts_user_id_idx").on(table.userId), uniqueIndex("accounts_provider_unique").on(table.providerId, table.accountId)],
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: varchar("identifier", { length: 320 }).notNull(),
    value: varchar("value", { length: 320 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const teams = pgTable(
  "teams",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    plan: varchar("plan", { length: 120 }).default("free").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("teams_slug_unique").on(table.slug)],
);

export const teamMembers = pgTable(
  "team_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 120 }).default("member").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("team_members_unique").on(table.teamId, table.userId)],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("categories_slug_unique").on(table.slug)],
);

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("tags_slug_unique").on(table.slug)],
);

export const registryItems = pgTable(
  "registry_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    description: text("description"),
    docs: text("docs"),
    sourcePath: text("source_path").notNull(),
    previewUrl: text("preview_url"),
    thumbnailUrl: text("thumbnail_url"),
    installCommand: text("install_command"),
    registryPath: text("registry_path").notNull(),
    state: publishStateEnum("state").default("draft").notNull(),
    version: varchar("version", { length: 40 }).default("0.1.0").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
    dependencies: jsonb("dependencies").$type<Record<string, string>>().default({}).notNull(),
    files: jsonb("files").$type<Array<{ path: string; type: string }>>().default([]).notNull(),
    featured: boolean("featured").default(false).notNull(),
    downloads: integer("downloads").default(0).notNull(),
    likesCount: integer("likes_count").default(0).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("registry_items_slug_unique").on(table.slug),
    index("registry_items_owner_idx").on(table.ownerId),
    index("registry_items_category_idx").on(table.categoryId),
    index("registry_items_state_idx").on(table.state),
  ],
);

export const registryItemTags = pgTable(
  "registry_item_tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [uniqueIndex("registry_item_tags_unique").on(table.registryItemId, table.tagId)],
);

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [uniqueIndex("favorites_unique").on(table.userId, table.registryItemId), index("favorites_user_idx").on(table.userId)],
);

export const collections = pgTable(
  "collections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    description: text("description"),
    isPublic: boolean("is_public").default(false).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("collections_slug_unique").on(table.slug), index("collections_user_idx").on(table.userId)],
);

export const collectionItems = pgTable(
  "collection_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    sortOrder: serial("sort_order"),
    ...timestamps,
  },
  (table) => [uniqueIndex("collection_items_unique").on(table.collectionId, table.registryItemId)],
);

export const componentVersions = pgTable(
  "component_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    version: varchar("version", { length: 40 }).notNull(),
    changelog: text("changelog"),
    manifest: jsonb("manifest").$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("component_versions_unique").on(table.registryItemId, table.version)],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "cascade" }),
    status: subscriptionStatusEnum("status").default("trialing").notNull(),
    planId: varchar("plan_id", { length: 160 }).notNull(),
    customerId: varchar("customer_id", { length: 160 }),
    subscriptionId: varchar("subscription_id", { length: 160 }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    ...timestamps,
  },
  (table) => [index("subscriptions_user_idx").on(table.userId), index("subscriptions_team_idx").on(table.teamId)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: notificationTypeEnum("type").default("system").notNull(),
    title: varchar("title", { length: 240 }).notNull(),
    body: text("body"),
    readAt: timestamp("read_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  (table) => [index("notifications_user_idx").on(table.userId), index("notifications_type_idx").on(table.type)],
);

export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
    action: varchar("action", { length: 180 }).notNull(),
    entityType: varchar("entity_type", { length: 120 }).notNull(),
    entityId: varchar("entity_id", { length: 120 }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
    ipAddress: varchar("ip_address", { length: 120 }),
    ...timestamps,
  },
  (table) => [index("activity_logs_actor_idx").on(table.actorId), index("activity_logs_entity_idx").on(table.entityType, table.entityId)],
);

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 160 }).notNull(),
    keyHash: varchar("key_hash", { length: 120 }).notNull(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [uniqueIndex("api_keys_hash_unique").on(table.keyHash), index("api_keys_user_idx").on(table.userId)],
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    ...timestamps,
  },
  (table) => [index("comments_item_idx").on(table.registryItemId), index("comments_user_idx").on(table.userId)],
);

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [uniqueIndex("likes_unique").on(table.userId, table.registryItemId)],
);

export const downloads = pgTable(
  "downloads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registryItemId: uuid("registry_item_id")
      .notNull()
      .references(() => registryItems.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    source: varchar("source", { length: 120 }).default("registry").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
    ...timestamps,
  },
  (table) => [index("downloads_item_idx").on(table.registryItemId), index("downloads_user_idx").on(table.userId)],
);

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  registryItems: many(registryItems),
  favorites: many(favorites),
  collections: many(collections),
  subscriptions: many(subscriptions),
  notifications: many(notifications),
  activityLogs: many(activityLogs),
  apiKeys: many(apiKeys),
  comments: many(comments),
  likes: many(likes),
  downloads: many(downloads),
}));

export const registryItemRelations = relations(registryItems, ({ one, many }) => ({
  owner: one(users, {
    fields: [registryItems.ownerId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [registryItems.categoryId],
    references: [categories.id],
  }),
  tags: many(registryItemTags),
  versions: many(componentVersions),
  favorites: many(favorites),
  comments: many(comments),
  likes: many(likes),
  downloads: many(downloads),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  registryItems: many(registryItems),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  registryItemTags: many(registryItemTags),
}));

export const registryItemTagRelations = relations(registryItemTags, ({ one }) => ({
  registryItem: one(registryItems, {
    fields: [registryItemTags.registryItemId],
    references: [registryItems.id],
  }),
  tag: one(tags, {
    fields: [registryItemTags.tagId],
    references: [tags.id],
  }),
}));

export const collectionRelations = relations(collections, ({ one, many }) => ({
  owner: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  items: many(collectionItems),
}));

export const collectionItemRelations = relations(collectionItems, ({ one }) => ({
  collection: one(collections, {
    fields: [collectionItems.collectionId],
    references: [collections.id],
  }),
  registryItem: one(registryItems, {
    fields: [collectionItems.registryItemId],
    references: [registryItems.id],
  }),
}));