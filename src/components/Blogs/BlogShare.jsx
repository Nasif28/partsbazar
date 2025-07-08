import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const BlogShare = ({ blog }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const { title, author, excerpt, content } = blog;

  const getShareText = () => {
    const cleanContent = content.replace(/<[^>]*>?/gm, "");
    return `📝 ${title}\n\n👤 Author: ${
      author || "Unknown"
    }\n\n🔗 ${shareUrl}\n\n${excerpt}\n\n${cleanContent.substring(
      0,
      200
    )}...\n\nRead more at: ${shareUrl}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareText());
    toast.success("Blog content copied to clipboard!", {
      duration: 2000,
    });
  };

  const shareOnFacebook = () => {
    try {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(
          `Check out this blog post: ${title} by ${author || "Unknown"}`
        )}`,
        "_blank",
        "width=600,height=400"
      );
    } catch (error) {
      toast.error("Failed to share on Facebook");
    }
  };

  const shareOnTwitter = () => {
    try {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(
          `"${title}" by ${author || "Unknown"}\n\n${excerpt}\n\n`
        )}`,
        "_blank",
        "width=600,height=400"
      );
    } catch (error) {
      toast.error("Failed to share on Twitter");
    }
  };

  const shareOnLinkedIn = () => {
    try {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}&summary=${encodeURIComponent(
          `${title} | ${excerpt}`
        )}&title=${encodeURIComponent(title)}`,
        "_blank",
        "width=600,height=400"
      );
    } catch (error) {
      toast.error("Failed to share on LinkedIn");
    }
  };

  const shareViaEmail = () => {
    try {
      window.location.href = `mailto:?subject=${encodeURIComponent(
        `Check out this blog post: ${title}`
      )}&body=${encodeURIComponent(
        `Hi,\n\nI thought you might enjoy this blog post:\n\n${getShareText()}\n\nBest regards,`
      )}`;
    } catch (error) {
      toast.error("Failed to open email client");
    }
  };

  const shareOnWhatsApp = () => {
    try {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `Check out this blog post:\n\n${getShareText()}`
        )}`,
        "_blank"
      );
    } catch (error) {
      toast.error("Failed to share on WhatsApp");
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center mb-10">
      <span className="text-sm font-medium">Share:</span>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={shareOnFacebook}
            aria-label="Share on Facebook"
            className="cursor-pointer"
          >
            <Facebook className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Share on Facebook</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={shareOnTwitter}
            aria-label="Share on Twitter"
            className="cursor-pointer"
          >
            <Twitter className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Share on Twitter</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={shareOnLinkedIn}
            aria-label="Share on LinkedIn"
            className="cursor-pointer"
          >
            <Linkedin className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Share on LinkedIn</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={shareOnWhatsApp}
            aria-label="Share on WhatsApp"
            className="cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Share on WhatsApp</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={shareViaEmail}
            aria-label="Share via Email"
            className="cursor-pointer"
          >
            <Mail className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Send Email</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="outline"
            onClick={copyToClipboard}
            aria-label="Copy Clipboard"
            className="cursor-pointer"
          >
            <Copy className="h-4 w-4 text-primary" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Copy to Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BlogShare;
