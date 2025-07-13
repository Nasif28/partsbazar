import videosData from "@/data/videos.json";

export const videoApi = {
  getVideos: async () => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(videosData);
      }, 500);
    });
  },

  getVideoById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const video = videosData.find((v) => v.id === id);
        if (video) {
          resolve(video);
        } else {
          reject(new Error("Video not found"));
        }
      }, 500);
    });
  },

  getRelatedVideos: async (currentVideoId, count = 4) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter out current video and get random videos
        const related = videosData
          .filter((v) => v.id !== currentVideoId)
          .sort(() => 0.5 - Math.random())
          .slice(0, count);
        resolve(related);
      }, 500);
    });
  },
};
