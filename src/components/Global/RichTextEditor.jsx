"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  Code,
  Highlighter,
  Quote,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  CheckSquare,
  ChevronDown,
  Type,
  ListChecks,
  Pilcrow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing here...",
  className,
}) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [headingsOpen, setHeadingsOpen] = useState(false);
  const [listsOpen, setListsOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary hover:underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "bg-yellow-200 dark:bg-yellow-800",
        },
      }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start my-1",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            handleImageUpload(file);
            return true;
          }
        }
        return false;
      },
      attributes: {
        class: "focus:outline-none min-h-[300px] p-4",
      },
    },
    immediatelyRender: false,
  });

  const handleImageUpload = (file) => {
    if (!editor) return;

    // Create a blob URL for the uploaded image
    const blobUrl = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: blobUrl }).run();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
    // Reset input to allow selecting same file again
    e.target.value = null;
  };

  // Function to check active alignment
  const isAlignActive = (alignment) => {
    return editor?.isActive({ textAlign: alignment }) || false;
  };

  // Close dropdowns when editor loses focus
  useEffect(() => {
    if (!editor) return;

    const handleBlur = () => {
      setHeadingsOpen(false);
      setListsOpen(false);
    };

    editor.on("blur", handleBlur);
    return () => {
      editor.off("blur", handleBlur);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "w-full border rounded-lg overflow-hidden bg-card text-card-foreground",
        className,
        dragOver ? "ring-2 ring-primary" : ""
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
      }}
    >
      {/* Toolbar */}
      <div className="border-b p-1.5 flex flex-wrap items-center gap-1 bg-muted/50">
        {/* History Group */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <Undo className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Text Formatting Group */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-muted" : ""}
            >
              <Bold className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-muted" : ""}
            >
              <Italic className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "bg-muted" : ""}
            >
              <Underline className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Underline</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "bg-muted" : ""}
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strikethrough</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "bg-muted" : ""}
            >
              <Highlighter className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Highlight</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "bg-muted" : ""}
            >
              <Code className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Inline Code</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive("subscript") ? "bg-muted" : ""}
            >
              <SubscriptIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Subscript</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive("superscript") ? "bg-muted" : ""}
            >
              <SuperscriptIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Superscript</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Headings Dropdown */}
        <DropdownMenu open={headingsOpen} onOpenChange={setHeadingsOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Type className="w-4 h-4 mr-1" />
                  Headings
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Text Formatting</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().setParagraph().run();
                setHeadingsOpen(false);
              }}
              className={editor.isActive("paragraph") ? "bg-accent" : ""}
            >
              <Pilcrow className="w-4 h-4 mr-2" /> Paragraph
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""
              }
            >
              <Heading1 className="w-4 h-4 mr-2" /> Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""
              }
            >
              <Heading2 className="w-4 h-4 mr-2" /> Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""
              }
            >
              <Heading3 className="w-4 h-4 mr-2" /> Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 4 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 4 }) ? "bg-accent" : ""
              }
            >
              <Heading4 className="w-4 h-4 mr-2" /> Heading 4
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 5 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 5 }) ? "bg-accent" : ""
              }
            >
              <Heading5 className="w-4 h-4 mr-2" /> Heading 5
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 6 }).run();
                setHeadingsOpen(false);
              }}
              className={
                editor.isActive("heading", { level: 6 }) ? "bg-accent" : ""
              }
            >
              <Heading6 className="w-4 h-4 mr-2" /> Heading 6
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Lists Dropdown */}
        <DropdownMenu open={listsOpen} onOpenChange={setListsOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <List className="w-4 h-4 mr-1" />
                  Lists
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Lists</TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
                setListsOpen(false);
              }}
              className={editor.isActive("bulletList") ? "bg-accent" : ""}
            >
              <List className="w-4 h-4 mr-2" /> Bullet List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleOrderedList().run();
                setListsOpen(false);
              }}
              className={editor.isActive("orderedList") ? "bg-accent" : ""}
            >
              <ListOrdered className="w-4 h-4 mr-2" /> Numbered List
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                editor.chain().focus().toggleTaskList().run();
                setListsOpen(false);
              }}
              className={editor.isActive("taskList") ? "bg-accent" : ""}
            >
              <ListChecks className="w-4 h-4 mr-2" /> Task List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Alignment Group */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={isAlignActive("left") ? "bg-muted" : ""}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={isAlignActive("center") ? "bg-muted" : ""}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Center</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={isAlignActive("right") ? "bg-muted" : ""}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align Right</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={isAlignActive("justify") ? "bg-muted" : ""}
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Justify</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Blocks Group */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "bg-muted" : ""}
            >
              <Quote className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "bg-muted" : ""}
            >
              <Code className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code Block</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="!h-6 mx-1" />

        {/* Links & Media Group */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const previousUrl = editor.getAttributes("link").href;
                const url = window.prompt("URL", previousUrl || "https://");

                if (url === null) return;
                if (url === "") {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                  return;
                }

                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }}
              className={editor.isActive("link") ? "bg-muted" : ""}
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Link</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-4 h-4" />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Insert Image</TooltipContent>
        </Tooltip>
      </div>

      {/* Editor Content */}
      <div className="relative">
        {dragOver && (
          <div className="absolute inset-0 bg-primary/10 z-10 flex items-center justify-center border-2 border-dashed border-primary rounded-lg m-2">
            <div className="bg-background p-4 rounded-lg border shadow-lg">
              Drop image to upload
            </div>
          </div>
        )}
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert max-w-none min-h-[300px] h-[calc(100vh-320px)] overflow-y-auto"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
