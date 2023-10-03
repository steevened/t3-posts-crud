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
import { useRouter } from "next/router";

// interface navbarProps {}

const Navbar: FC = ({}) => {
  const { data: sessionData } = useSession();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const router = useRouter();

  //   console.log(sessionData);

  return (
    <header className="antialiased">
      <nav className="fixed z-30 bg-background px-2 py-2.5 text-foreground max-sm:bottom-0  max-sm:w-full max-sm:border-t sm:h-full sm:border-r">
        <div className="flex h-full items-center justify-between sm:flex-col">
          <div className="flex flex-col gap-2">
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
              <div>
                <AddPost />
              </div>
            </div>
            <div className="w-full">
              {sessionData ? (
                <Button
                  variant={
                    router.pathname === "/drafts" ? "secondary" : "outline"
                  }
                  size={sidebarOpen ? "default" : "icon"}
                  onClick={() => void router.push("/drafts")}
                  className={`flex w-full items-center gap-2 transition-all ${
                    sidebarOpen ? "justify-start" : "justify-center"
                  }`}
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
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>

                  {sidebarOpen && (
                    <span className="whitespace-nowrap">Drafts</span>
                  )}
                </Button>
              ) : (
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
                  {sidebarOpen && (
                    <span className="whitespace-nowrap">Add new</span>
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="sm:w-full ">
            {sessionData ? (
              <>
                {sessionData?.user?.image && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="flex h-full w-full justify-start gap-2 p-1"
                      >
                        <Avatar>
                          <AvatarImage src={sessionData?.user?.image} />
                        </Avatar>
                        {sidebarOpen && (
                          <div className="h-full text-start">
                            <p className="text-muted-foreground">
                              @{sessionData.user.name}
                            </p>
                            <span>
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
                                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                              </svg>
                            </span>
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
              </>
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
