"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchVideos } from "@/redux/features/videoSlice";

const VideoCarousel = ({ title, videos }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-64 h-72 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem
              key={video.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <VideoCard video={video} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
