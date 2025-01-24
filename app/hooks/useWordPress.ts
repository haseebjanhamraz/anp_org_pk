const API_URL = "https://anp.com.pk/wp-json/wp/v2/";
const CATEGORY_NAME = "facebook-official-newsletter";

export default async function getPosts(page = 1, perPage = 10) {
  try {
    const response = await fetch(
      `${API_URL}posts?category_name=${CATEGORY_NAME}&page=${page}&per_page=${perPage}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // Fetch media details for each post and build the complete post object
    const postsWithDetails = await Promise.all(
      posts.map(async (post: any) => {
        let featuredImage = null;

        if (post.featured_media) {
          try {
            const mediaResponse = await fetch(
              `${API_URL}media/${post.featured_media}`
            );
            if (mediaResponse.ok) {
              const media = await mediaResponse.json();
              featuredImage = media.source_url;
            }
          } catch (mediaError) {
            console.error(
              `Failed to fetch media for post ${post.id}:`,
              mediaError
            );
          }
        }

        return {
          id: post.id,
          title: post.title.rendered,
          description: post.content.rendered,
          excerpt: post.excerpt.rendered,
          date: post.date,
          link: post.link,
          featuredImage,
        };
      })
    );

    return postsWithDetails;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}
