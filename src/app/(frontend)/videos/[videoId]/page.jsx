"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share, ThumbsUp, Bookmark, Play } from "lucide-react";
import Link from "next/link";
import { fetchVideoById, fetchVideos } from "@/redux/features/videoSlice";
import { useParams } from "next/navigation";

const VideoDetailsPage = () => {
  const params = useParams();
  const videoId = params.videoId;
  const dispatch = useDispatch();
  const { currentVideo, loading, videos } = useSelector(
    (state) => state.videos
  );
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchVideoById(videoId));
    dispatch(fetchVideos());
  }, [dispatch, videoId]);

  useEffect(() => {
    if (videos.length > 0 && videoId) {
      const related = videos
        .filter((v) => v.id !== videoId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setRelatedVideos(related);
    }
  }, [videos, videoId]);

  if (loading || !currentVideo) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full aspect-video rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="myContainer">
      <div className="container min-h-screen mx-auto pageP">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{currentVideo.title}</h1>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border-2 border-dashed">
                    <Image
                      src={currentVideo.thumbnail}
                      alt={currentVideo.author}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <a
                      href="https://www.youtube.com/@multibrandworkshopltd4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3 className="font-semibold">{currentVideo.author}</h3>
                    </a>

                    <p className="text-sm text-muted-foreground">
                      {currentVideo.viewCount} views •{" "}
                      {new Date(currentVideo.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <ThumbsUp size={16} />
                    <span>{currentVideo.likeCount}</span>
                  </Button>

                  <Button variant="outline" className="gap-2">
                    <Share size={16} />
                    Share
                  </Button>

                  <Button variant="outline">
                    <Bookmark size={16} />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="whitespace-pre-line">
                  {currentVideo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Related Videos */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.id}`}
                  className="block group"
                >
                  <div className="flex gap-3 bg-secondary p-2 rounded-lg hover:bg-secondary/80 transition">
                    <div className="flex-shrink-0 relative w-40 aspect-video rounded-md overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div>
                      <h1 className="font-semibold line-clamp-2 group-hover:text-primary">
                        {video.title}
                      </h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        {video.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {video.viewCount} views
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VideoDetailsPage;
