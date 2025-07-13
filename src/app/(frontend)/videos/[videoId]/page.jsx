import { use } from 'react';
import VideoPlayer from '@/components/videos/VideoPlayer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getVideoPageData(params) {
  return {
    videoId: params.videoId
  };
}

export default function Page({ params }) {
  const { videoId } = use(getVideoPageData(params));

  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/videos">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Videos
        </Link>
      </Button>
      
      <VideoPlayer videoId={videoId} />
    </div>
  );
}