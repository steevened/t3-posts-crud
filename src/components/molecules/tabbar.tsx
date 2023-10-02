import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import useUIStore from "store/ui/ui-store";

const Tabbar: FC = ({}) => {
  const { sidebarOpen } = useUIStore();
  const router = useRouter();
  return (
    <nav
      className={`fixed right-0 top-0 grid w-full grid-cols-2 border-b  text-center transition-all ${
        sidebarOpen ? "sm:pl-[180.5px]" : "sm:pl-[52.5px]"
      }`}
    >
      <Link
        href={"/"}
        className={`border-r py-2.5 transition-all hover:bg-muted/60 ${
          router.pathname === "/" ? "bg-muted" : ""
        }`}
      >
        <h3 className="font-semibold">Feed</h3>
      </Link>
      <Link
        href={"/explore"}
        className={`border-r py-2.5 hover:bg-muted/60 ${
          router.pathname === "/explore" ? "bg-muted" : ""
        }`}
      >
        <h3 className="font-semibold">Explore</h3>
      </Link>
    </nav>
  );
};

export default Tabbar;
