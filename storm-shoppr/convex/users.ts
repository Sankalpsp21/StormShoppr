import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("storeUser");
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    const user = await getUser(ctx, identity.nickname!);
    if (user !== null) {
      if (
        user.name !== identity.name ||
        user.username !== identity.nickname ||
        user.pictureUrl !== identity.pictureUrl ||
        user.tokenIdentifier !== identity.tokenIdentifier
      ) {
        await ctx.db.patch(user._id, {
          tokenIdentifier: identity.tokenIdentifier,
          name: identity.name,
          username: identity.nickname,
          pictureUrl: identity.pictureUrl,
        });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name!,
      username: identity.nickname!,
      pictureUrl: identity.pictureUrl!
    });
  },
});

export const get = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    return await getUser(ctx, args.username);
  },
});

export async function getUser(ctx: QueryCtx, username: string) {
  return await ctx.db
    .query("users")
    .withIndex("username", (q) => q.eq("username", username))
    .unique();
}

export const addCity = mutation({
  args: {
    city: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called addAddress without authentication present");
    }
    const user = await getUser(ctx, identity.nickname!);
    if (user === null) {
      throw new Error("User not found");
    }
    await ctx.db.patch(user._id, {
      city: args.city,
    });
  },
});
