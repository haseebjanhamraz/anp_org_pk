"use client";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import DashboardPage from "../components/dashboard/admin/DashboardPage";
import SubscriberDashboardPage from "../components/dashboard/subscriber/SubscriberDashboardPage";
export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/login')
    }
})
  return (
    <>
    {session.user?.role === "admin" || session.user?.role === "editor" ? <DashboardPage/> : <SubscriberDashboardPage/>}
    </>
  );
}
