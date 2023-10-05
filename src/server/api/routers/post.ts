import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { useSession } from "next-auth/react";
import { TRPCError } from "@trpc/server";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post?.findMany({
      take: 100,
      where: { published: true },
    });
  }),
  getDrafts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.post?.findMany({
      where: { published: false },
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
        authorId: z.string().cuid(),
      }),
    )
    .mutation(async (opts) => {
      const session = useSession();
      if (!session ?? !session.data)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a post",
        });
      const post = await opts.ctx.db.post.create({
        data: {
          content: opts.input.content,
          authorId: session.data?.user.id,
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
