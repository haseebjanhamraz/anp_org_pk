"use client";
import { useParams } from "next/navigation";
export default function Page() {
  const params = useParams();
  const userId = params.id;

  const userData = fetch(`/api/users/${userId}`);

  return <div>UserId: {userId}</div>;
}
