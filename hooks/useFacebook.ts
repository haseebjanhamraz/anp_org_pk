import { useState, useEffect } from "react";

interface Post {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
}

export default function useFacebookPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const PAGE_ID = process.env.REACT_APP_PAGE_ID as string;
    const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN as string;
    const API_URL = `https://graph.facebook.com/v22.0/${PAGE_ID}/posts?access_token=${ACCESS_TOKEN}`;

    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, error, loading };
}
