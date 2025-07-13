"use client";

import VideoCarousel from "@/components/Videos/VideoCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/features/videoSlice";
import { useEffect } from "react";

export default function VideoSlider() {
  const dispatch = useDispatch();
  const { featuredVideos, trendingVideos } = useSelector(
    (state) => state.videos
  );

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <main className="flex flex-col">
      {/* Featured Videos */}
      <section className="py-6 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Videos</h2>
            <Button variant="link" asChild>
              <Link href="/videos">See All Videos</Link>
            </Button>
          </div>
          <VideoCarousel title="" videos={featuredVideos} />
        </div>
      </section>

      {/* Trending Videos */}
      <section className="py-6 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Button variant="link" asChild>
              <Link href="/videos">See All Videos</Link>
            </Button>
          </div>
          <VideoCarousel title="" videos={trendingVideos} />
        </div>
      </section>
    </main>
  );
}
