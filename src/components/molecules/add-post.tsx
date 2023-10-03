import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import useUIStore from "store/ui/ui-store";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

const formSchema = z.object({
  content: z.string().min(2).max(300, {
    message: "Content must be less than 300 characters",
  }),
  authorId: z.string().cuid().optional(),
});

const AddPost = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  // const [isSaved, setIsSaved] = useState(false);

  const { sidebarOpen } = useUIStore();

  const { data: session } = useSession();

  const postMutation = api.posts.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      authorId: session?.user?.id,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { content } = values;

    try {
      const authorId = session?.user?.id;
      if (!authorId) return;

      const data = { content, authorId };

      const mutation = postMutation.mutate(data);
      // setIsSaved(true);
      console.log(mutation);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setIsSaved(false);
  //   const delay = setTimeout(() => {
  //     const data = form.getValues();
  //     onSubmit(data);
  //   }, 2000);

  //   // Clear the previous timeout when the content input changes again
  //   return () => clearTimeout(delay);
  // }, [form.watch("content")]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={sidebarOpen ? "default" : "icon"}
          className="flex items-center gap-2 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {sidebarOpen && <span className="whitespace-nowrap">Add new</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write something...</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Hi" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="my-5 justify-between">
              <Button variant={"secondary"}>
                {/* {isSaved ? <p>Saved</p> : <p>Saving</p>} */}
                Save
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
