import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Unique identifier from the auth provider
    tokenIdentifier: v.string(),
    name: v.string(),
    username: v.string(),
    pictureUrl: v.string(),
  })
    .index("tokenIdentifier", ["tokenIdentifier"])
    .index("username", ["username"])
});
