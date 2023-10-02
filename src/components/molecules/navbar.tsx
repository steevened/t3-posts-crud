import { useSession, signIn, signOut } from "next-auth/react";
import { type FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useUIStore from "store/ui/ui-store";
import AddPost from "./add-post";

// interface navbarProps {}

const Navbar: FC = ({}) => {
  const { data: sessionData } = useSession();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  //   console.log(sessionData);

  return (
    <header className="antialiased">
      <nav className="fixed z-30 bg-background px-2 py-2.5 text-foreground max-sm:bottom-0  max-sm:w-full max-sm:border-t sm:h-full sm:border-r">
        <div className="flex h-full items-center justify-between sm:flex-col">
          <div
            className={`flex gap-2 transition-all duration-200  ${
              sidebarOpen ? "flex-row-reverse" : "flex-col"
            }`}
          >
            <div className="max-sm:hidden">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant={"outline"}
                size={"icon"}
                className="transition-all"
              >
                {sidebarOpen ? (
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
                      d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                    />
                  </svg>
                ) : (
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
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                )}
              </Button>
            </div>
            <AddPost />
          </div>
          <div className="">
            {sessionData ? (
              <div>
                {sessionData?.user?.image && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="flex h-full w-full items-start gap-1 p-2"
                      >
                        <Avatar>
                          <AvatarImage src={sessionData?.user?.image} />
                        </Avatar>
                        {sidebarOpen && (
                          <div className="h-full text-start">
                            <p className="text-muted-foreground">
                              @{sessionData.user.name}
                            </p>
                            <p className="">
                              {sessionData.user.email?.slice(0, 11)}
                              {"..."}
                            </p>
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Button
                          variant={"outline"}
                          onClick={() => void signOut()}
                          className="w-full"
                        >
                          Sign Out
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ) : (
              <div>
                <Button
                  variant={"outline"}
                  size={sidebarOpen ? "default" : "icon"}
                  onClick={() => void signIn()}
                  className="flex items-center gap-2 transition-all"
                >
                  {sidebarOpen && (
                    <span className="whitespace-nowrap">Sign In</span>
                  )}
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
