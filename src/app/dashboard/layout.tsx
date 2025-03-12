import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import MainLayout from "@/components/dashboard/MainLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session && !session.user.isAdmin) {
    // Redirect to home page if the user is not an admin
    redirect('/');
    return null; // Return null to prevent rendering
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
