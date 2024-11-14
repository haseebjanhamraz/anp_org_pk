import React from "react";
import AdminDashboard from "./AdminDashboard";
import SubscriberDashboard from "./SubscriberDashboard";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "admin" || user?.role === "editor" ? (
        <AdminDashboard />
      ) : (
        <SubscriberDashboard />
      )}
    </>
  );
}

export default Dashboard;
