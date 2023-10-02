import { createTRPCRouter, publicProcedure } from "../trpc";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.post?.findMany({
      where: { published: true },
    });
  }),
});
