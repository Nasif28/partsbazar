"use client";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "@/components/Videos/VideoCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchVideos } from "@/redux/features/videoSlice";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/Global/PageHeader";

export default function VideosPage() {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.videos);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    let result = [...videos];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(term) ||
          video.description.toLowerCase().includes(term) ||
          video.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    if (filter !== "all") {
      result = result.filter((video) => video[filter] === true);
    }

    setFilteredVideos(result);
  }, [videos, searchTerm, filter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
  };

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Video Library"
        description="Browse our collection of videos covering the latest events,
            tutorials, and insights"
      />

      <section className="myContainer">
        <div className="container py-6 mx-auto">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-10 py-5"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-transparent"
                onClick={() => dispatch(setSearchTerm(""))}
              >
                <X size={16} />
              </Button>
            )} */}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 py-5"
                >
                  <Filter className="h-4 w-4" />
                  <span>
                    {filter === "all" && "All Videos"}
                    {filter === "isFeatured" && "Featured"}
                    {filter === "isTrending" && "Trending"}
                    {filter === "isPremium" && "Premium"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFilterSelect("all")}>
                  All Videos
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterSelect("isFeatured")}
                >
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterSelect("isTrending")}
                >
                  Trending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterSelect("isPremium")}
                >
                  Premium
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="w-full h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No videos found matching your criteria
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
