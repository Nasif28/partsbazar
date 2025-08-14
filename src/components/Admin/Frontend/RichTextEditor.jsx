"use client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (!quillRef.current) return;

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    };

    // Initialize only once
    if (!quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        modules,
        theme: "snow",
        placeholder: placeholder || "Start typing...",
      });

      // Set initial value (only if provided)
      if (value) {
        quillInstance.current.root.innerHTML = value;
      }

      // Listen to changes
      quillInstance.current.on("text-change", () => {
        if (onChange) {
          onChange(quillInstance.current.root.innerHTML);
        }
      });
    }
  }, []);

  return (
    <div className="border overflow-hidden h-[calc(100vh-350px)] min-h-[400px]">
      <div ref={quillRef} className="h-full" />
    </div>
  );
};

export default RichTextEditor;
