import blogsData from "@/data/Blogs.json";

export const blogService = {
  // Simulate API calls with JSON data
  getAllBlogs: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(blogsData), 500);
    });
  },

  getBlogBySlug: (slug) => {
    return new Promise((resolve) => {
      const blog = blogsData.find((b) => b.slug === slug);
      setTimeout(() => resolve(blog), 300);
    });
  },

  getPopularBlogs: () => {
    return new Promise((resolve) => {
      const popularBlogs = blogsData.filter((blog) => blog.popular);
      setTimeout(() => resolve(popularBlogs), 300);
    });
  },

  // For production: Replace with real API calls
  /*
  getAllBlogs: async () => {
    const response = await axios.get('/api/blogs');
    return response.data;
  },
  
  getBlogBySlug: async (slug) => {
    const response = await axios.get(`/api/blogs/${slug}`);
    return response.data;
  },
  
  getPopularBlogs: async () => {
    const response = await axios.get('/api/blogs/popular');
    return response.data;
  },
  */
};
