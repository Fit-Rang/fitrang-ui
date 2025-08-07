import React from "react";
import { NavBar } from "./components/NavBar";
import { BottomBar } from "./components/BottomBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <NavBar />
      <BottomBar />
      <article className="h-screen flex items-center justify-center">
        {children}
      </article>
    </>
  );
}
