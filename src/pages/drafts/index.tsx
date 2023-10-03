import { PostCard } from "~/components/molecules/post-card";
import { api } from "~/utils/api";

export default function Page() {
  const { data: posts } = api.posts.getDrafts.useQuery();

  console.log(posts);

  return (
    <main>
      <div className="mx-auto my-6 w-full max-w-lg">
        <ul className="space-y-5">
          {posts?.map((post) => (
            <li key={post.id}>
              <PostCard
                content={post.content}
                authorId={post.authorId}
                createdAt={post.createdAt}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
