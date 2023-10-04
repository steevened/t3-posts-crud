import { api } from "~/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const PostCard = ({
  content,
  authorId,
  createdAt,
}: {
  content: string;
  authorId: string;
  createdAt: Date;
}) => {
  const { data: user } = api.users.getById.useQuery({ id: authorId });
  return (
    <div className="flex items-center gap-2.5 rounded border p-2.5">
      <Avatar>
        <AvatarImage src={user?.image ?? ""} />
        <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className=" w-full space-y-2.5">
        <div className="flex justify-between">
          <h3 className="text-sm text-muted-foreground">@{user?.name}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};
