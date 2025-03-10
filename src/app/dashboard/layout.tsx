import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import MainLayout from "@/components/dashboard/MainLayout";

export default async function DashboardLayout({children,}: {children: React.ReactNode;}) {


  const session = await getServerSession(authOptions);
  if (session) {
    // console.log(session)
  } else {
    console.log("Session not found");
  }
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
