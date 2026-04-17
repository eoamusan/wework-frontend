"use client";

import { useEffect, useRef, useState } from "react";

import {
  AlignLeft,
  Bold,
  Eraser,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";

import { cn } from "@wew/lib/utils";

type ApplicationCoverLetterEditorProps = {
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

function ToolbarButton({
  active = false,
  icon: Icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: typeof Bold;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-[0.8rem] border transition",
        active
          ? "border-accent-blue bg-[#efe6fd] text-accent-blue shadow-[0_8px_20px_rgba(51,0,201,0.10)]"
          : "border-[#e6e1f0] bg-white text-secondary hover:bg-[#f8f5ff]",
      )}
      onClick={onClick}
      type="button"
    >
      <Icon className="size-4" />
    </button>
  );
}

function runEditorCommand(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function ApplicationCoverLetterEditor({
  error,
  onChange,
  value,
}: ApplicationCoverLetterEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [activeFormats, setActiveFormats] = useState({
    blockquote: false,
    bold: false,
    heading1: false,
    heading2: false,
    italic: false,
    orderedList: false,
    paragraph: true,
    underline: false,
    unorderedList: false,
  });

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (editorRef.current.innerHTML === value) {
      return;
    }

    editorRef.current.innerHTML = value;
  }, [value]);

  useEffect(() => {
    const updateActiveFormats = () => {
      const editor = editorRef.current;
      const selection = window.getSelection();

      if (!editor || !selection || selection.rangeCount === 0) {
        return;
      }

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const anchorNode =
        container.nodeType === Node.TEXT_NODE ? container.parentNode : container;

      if (!(anchorNode instanceof HTMLElement) || !editor.contains(anchorNode)) {
        return;
      }

      const blockElement = anchorNode.closest("h1, h2, p, blockquote, li");
      const blockTag = blockElement?.tagName.toLowerCase();
      const listParentTag = anchorNode.closest("ul, ol")?.tagName.toLowerCase();

      setActiveFormats({
        blockquote: blockTag === "blockquote",
        bold: document.queryCommandState("bold"),
        heading1: blockTag === "h1",
        heading2: blockTag === "h2",
        italic: document.queryCommandState("italic"),
        orderedList: document.queryCommandState("insertOrderedList") || listParentTag === "ol",
        paragraph: !blockTag || blockTag === "p",
        underline: document.queryCommandState("underline"),
        unorderedList:
          document.queryCommandState("insertUnorderedList") || listParentTag === "ul",
      });
    };

    document.addEventListener("selectionchange", updateActiveFormats);

    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
    };
  }, []);

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const handleCommand = (command: string, commandValue?: string) => {
    focusEditor();
    runEditorCommand(command, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  };

  const handleInsertLink = () => {
    focusEditor();

    const url = window.prompt("Enter link URL");

    if (!url) {
      return;
    }

    const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    runEditorCommand("createLink", normalizedUrl);
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-[0.9rem] border border-[#eceaf5] bg-[#fcfbff] p-3">
        <ToolbarButton icon={Undo2} label="Undo" onClick={() => handleCommand("undo")} />
        <ToolbarButton icon={Redo2} label="Redo" onClick={() => handleCommand("redo")} />
        <ToolbarButton
          active={activeFormats.bold}
          icon={Bold}
          label="Bold"
          onClick={() => handleCommand("bold")}
        />
        <ToolbarButton
          active={activeFormats.italic}
          icon={Italic}
          label="Italic"
          onClick={() => handleCommand("italic")}
        />
        <ToolbarButton
          active={activeFormats.underline}
          icon={Underline}
          label="Underline"
          onClick={() => handleCommand("underline")}
        />
        <ToolbarButton
          active={activeFormats.heading1}
          icon={Heading1}
          label="Heading 1"
          onClick={() => handleCommand("formatBlock", "<h1>")}
        />
        <ToolbarButton
          active={activeFormats.heading2}
          icon={Heading2}
          label="Heading 2"
          onClick={() => handleCommand("formatBlock", "<h2>")}
        />
        <ToolbarButton
          active={activeFormats.paragraph}
          icon={AlignLeft}
          label="Paragraph"
          onClick={() => handleCommand("formatBlock", "<p>")}
        />
        <ToolbarButton
          active={activeFormats.unorderedList}
          icon={List}
          label="Bullet list"
          onClick={() => handleCommand("insertUnorderedList")}
        />
        <ToolbarButton
          active={activeFormats.orderedList}
          icon={ListOrdered}
          label="Numbered list"
          onClick={() => handleCommand("insertOrderedList")}
        />
        <ToolbarButton
          active={activeFormats.blockquote}
          icon={Quote}
          label="Blockquote"
          onClick={() => handleCommand("formatBlock", "<blockquote>")}
        />
        <ToolbarButton icon={Link2} label="Insert link" onClick={handleInsertLink} />
        <ToolbarButton
          icon={Eraser}
          label="Clear formatting"
          onClick={() => handleCommand("removeFormat")}
        />
      </div>

      <div
        className={cn(
          "min-h-[220px] rounded-[1rem] border border-[#e2e2e2] px-4 py-4 text-[0.95rem] text-dark-soft outline-none transition empty:text-[#9a9a9a] focus-visible:ring-2 focus-visible:ring-accent-blue/15 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d9cdf8] [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc",
          error ? "border-[#ffb8b8]" : "",
        )}
        contentEditable
        data-placeholder="Write your cover letter here. Introduce yourself, explain why you are a fit, and highlight relevant experience."
        onBlur={(event) => onChange(event.currentTarget.innerHTML)}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        ref={editorRef}
        suppressContentEditableWarning
      />
      {!value ? (
        <p className="text-sm text-[#9a9a9a]">
          Write your cover letter here. Introduce yourself, explain why you are a fit, and highlight relevant experience.
        </p>
      ) : null}
    </div>
  );
}
