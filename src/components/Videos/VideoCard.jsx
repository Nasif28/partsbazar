import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border">
      <Link
        href={`/videos/${video.id}`}
        className="block relative aspect-video"
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button size="icon" className="rounded-full w-14 h-14">
            <Play className="w-6 h-6" />
          </Button>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>

        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>{video.author}</span>
          <span>{video.viewCount} views</span>
        </div>

        <Button asChild className="w-full mt-4">
          <Link href={`/videos/${video.id}`}>Watch Video</Link>
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
