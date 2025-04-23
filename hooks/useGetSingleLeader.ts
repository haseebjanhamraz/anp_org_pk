import { useState, useEffect } from "react";
import { LeadershipData } from "../types/leadership";
import { usePathname } from "next/navigation";

const useGetLeaderData = (): { leader: LeadershipData[]; loading: boolean } => {
  const id = usePathname().split("/").pop();
  const [loading, setLoading] = useState(true);
  const [leader, setLeaders] = useState<LeadershipData[]>([]);

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await fetch(`/api/leadership/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leadership");
        }
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leadership:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeader();
  }, [id]);

  return { leader, loading };
};

export default useGetLeaderData;
