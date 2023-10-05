import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post?.findMany({
      take: 100,
      where: { published: true },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  getDrafts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post?.findMany({
      where: { published: false },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async (opts) => {
      return await opts.ctx.db.post.findUnique({
        where: {
          id: opts.input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const post = await opts.ctx.db.post.create({
        data: {
          content: opts.input.content,
          authorId: opts.ctx.session.user.id,
        },
      });
      return post;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        content: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const post = await opts.ctx.db.post.update({
        where: {
          id: opts.input.id,
        },
        data: {
          content: opts.input.content,
        },
      });
      return post;
    }),

  publish: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async (opts) => {
      const post = await opts.ctx.db.post.update({
        where: {
          id: opts.input.id,
        },
        data: {
          published: true,
        },
      });
      return post;
    }),
});
