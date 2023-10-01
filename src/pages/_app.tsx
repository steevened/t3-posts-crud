import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/molecules/navbar";
import Tabbar from "~/components/molecules/tabbar";
import useUIStore from "store/ui/ui-store";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { sidebarOpen } = useUIStore();

  return (
    <SessionProvider session={session}>
      <Navbar />
      <Tabbar />
      <div
        className={`min-h-screen  pt-[45px] transition-all  ${
          sidebarOpen ? "pl-[182px]" : "pl-[55px]"
        }`}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
