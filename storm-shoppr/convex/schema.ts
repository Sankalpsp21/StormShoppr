import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
  })
    .index("id", ["id"]),

  users: defineTable({
    // Unique identifier from the auth provider
    tokenIdentifier: v.string(),
    name: v.string(),
    username: v.string(),
    pictureUrl: v.string(),
    city: v.optional(v.string()),
    products: v.optional(v.array(v.id("products"))),
    autoOrder: v.optional(v.boolean()),
  })
    .index("tokenIdentifier", ["tokenIdentifier"])
    .index("username", ["username"])
});
