import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUIStore from "store/ui/ui-store";
import * as z from "zod";
import { api } from "~/utils/api";
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

const formSchema = z.object({
  content: z.string().min(2).max(300, {
    message: "Content must be less than 300 characters",
  }),
  authorId: z.string().cuid().optional(),
});

const AddPost = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { sidebarOpen } = useUIStore();

  const { data: session } = useSession();

  const cxt = api.useContext();

  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      void cxt.posts.getAll.invalidate();
      void cxt.posts.getDrafts.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { content } = values;

    try {
      mutate({
        content,
      });
      // setIsSaved(true);
      setIsOpen(!isOpen);
      form.reset();
      // console.log(mutation);
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

  if (!session?.user?.id) {
    return (
      <Button
        variant={"outline"}
        size={sidebarOpen ? "default" : "icon"}
        className="flex items-center gap-2 transition-all"
        onClick={() => void signIn()}
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
    );
  }

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
              <Button type="button" variant={"secondary"} disabled={isLoading}>
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
