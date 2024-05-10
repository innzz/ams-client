import { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="h-[100vh] flex flex-col">
      <Navbar />
      <section className="container flex-1">{children}</section>
    </main>
  );
};

export default RootLayout;
