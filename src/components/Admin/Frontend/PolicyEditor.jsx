"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/Global/TiptapEditor";

const PolicyEditor = ({ policyName, onSave, isCreating = false }) => {
  const [title, setTitle] = useState(policyName);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (policyName) {
      setIsLoading(true);
      // In real app, this would be an API call
      setTimeout(() => {
        setContent(
          `<h1>${policyName}</h1><p>This is the content for your ${policyName} page. Edit this text to customize your policy.</p><p>You can use the editor to format text, add lists, links, and more.</p>`
        );
        setIsLoading(false);
      }, 500);
    } else {
      setContent("");
    }
  }, [policyName]);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="overflow-hidden flex flex-col h-full">
      <div className="pb-2 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5" />
          {isCreating ? (
            <div className="flex-1">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter policy title"
                className="text-lg font-semibold border-none shadow-none focus-visible:ring-0"
              />
            </div>
          ) : (
            <h2 className="text-lg font-semibold">{title}</h2>
          )}
        </div>

        <div className="flex gap-4">
          <Button variant="outline">
            <X className="w-4 h-4" /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start typing your policy..."
          />
        )}
      </div>

      <div className="p-2 border-t text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default PolicyEditor;
