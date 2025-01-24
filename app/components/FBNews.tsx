"use client";

import React from "react";
import useFacebookPosts from "../hooks/useFacebook"; // Adjust the import path as needed

function FacebookFeed() {
  const { posts, error, loading } = useFacebookPosts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Facebook Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.message ? <p>{post.message}</p> : <p>{post.story}</p>}
            <p>Posted on: {new Date(post.created_time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacebookFeed;
