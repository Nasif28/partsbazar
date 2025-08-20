"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/features/videoSlice";
import { useEffect } from "react";
import SectionHeader from "../Global/SectionHeader";
import SectionSlider from "../Global/SectionSlider";
import VideoCard from "../Videos/VideoCard";

export default function VideoSlider() {
  const dispatch = useDispatch();
  const { featuredVideos, loading } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <main className="secP">
      <div className="myContainer">
        <div className="container mx-auto">
          <SectionHeader
            title="Featured Videos"
            href="/videos"
            linkText="All Videos"
          />

          <SectionSlider
            items={featuredVideos}
            loading={loading}
            itemClassName="lg:basis-1/4 md:basis-1/3 basis-1/2"
            renderItem={(video) => <VideoCard video={video} />}
          />
        </div>
      </div>
    </main>
  );
}
