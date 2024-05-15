import { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";
import ClockProvider from "@/context/ClockProvider";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="h-[100vh] flex flex-col">
      <Navbar />
      <ClockProvider>
        <section className="container flex-1">{children}</section>
      </ClockProvider>
    </main>
  );
};

export default RootLayout;
