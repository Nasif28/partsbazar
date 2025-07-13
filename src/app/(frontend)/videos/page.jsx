"use client";

import { useDispatch, useSelector } from "react-redux";
import VideoCard from "@/components/Videos/VideoCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchVideos } from "@/redux/features/videoSlice";
import { useEffect } from "react";

export default function VideosPage() {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of videos covering the latest events, tutorials,
          and insights
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search videos..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="w-full h-80 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More Videos</Button>
      </div>
    </div>
  );
}
