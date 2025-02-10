
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  url: string;
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5 text-gray-500" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 p-2 border rounded bg-muted"
              />
              <Button onClick={handleCopy}>Copy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareButton;
