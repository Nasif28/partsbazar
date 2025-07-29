import { Facebook, Linkedin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialShare = ({ product }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${product.title} for ৳${product.discountPrice.toLocaleString()} - ${shareUrl}`;

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(product.title)}&summary=${encodeURIComponent(product.description)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.title)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        className="flex items-center"
        onClick={shareOnFacebook}
      >
        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
        Facebook
      </Button>

      <Button
        variant="outline"
        className="flex items-center"
        onClick={shareOnLinkedIn}
      >
        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        className="flex items-center"
        onClick={shareOnWhatsApp}
      >
        <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
        WhatsApp
      </Button>

      <Button
        variant="outline"
        className="flex items-center"
        onClick={shareOnTelegram}
      >
        <Send className="h-4 w-4 mr-2 text-blue-500" />
        Telegram
      </Button>
    </div>
  );
};

export default SocialShare;
