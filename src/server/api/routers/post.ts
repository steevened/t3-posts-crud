import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post?.findMany({
      where: { published: true },
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
      const post = await opts.ctx.db.post.create({
        data: {
          content: opts.input.content,
          authorId: opts.input.authorId,
        },
      });
      return post;
    }),
});
