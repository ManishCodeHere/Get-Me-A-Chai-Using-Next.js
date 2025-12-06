import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound, redirect } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Username = async ({ params }) => {
  // 🔒 Step 1: Check if the user is logged in (server-side)
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login"); // Immediately redirect before render
  }

  // 🔍 Step 2: Check if the username exists in DB
  await connectDb();
  const u = await User.findOne({ username: params.username });
  if (!u) {
    notFound();
  }

  // ✅ Step 3: Render the page if both checks pass
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  };
}
