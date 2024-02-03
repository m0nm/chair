"use client";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent, Editor as EditorType } from "@tiptap/react";
import { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/app/_lib/utils";
import { Button } from "../ui/button";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Undo,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type IProps = {
  field: ControllerRenderProps<{ description: string }, "description">;
};

export const Editor = ({ field }: IProps) => {
  const editor = useEditor({
    content: field.value,
    onUpdate({ editor }) {
      field.onChange(editor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        code: false,
        blockquote: false,
        codeBlock: false,
        hardBreak: false,
        horizontalRule: false,
      }),
    ],
  });

  if (!editor) {
    return (
      <div className="grid h-[100px] grid-flow-col place-content-center gap-2">
        <div
          className="inline-block h-4 w-4 animate-spin self-center rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
        </div>
        loading text editor...
      </div>
    );
  }

  return (
    <div className="w-full border dark:border-gray-700">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

function MenuBar({ editor }: { editor: EditorType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center">
        {/* headings */}
        <div className="mr-1 w-40">
          <Select
            defaultValue="normal"
            onValueChange={(value) => {
              if (value == "normal") {
                editor.chain().focus().setParagraph().run();
              } else if (value == "heading-1") {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              } else if (value == "heading-2") {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              } else if (value == "heading-3") {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }
            }}
          >
            <SelectTrigger className="rounded-none">
              <SelectValue defaultValue={"normal"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="heading-1">Heading 1</SelectItem>
              <SelectItem value="heading-2">Heading 2</SelectItem>
              <SelectItem value="heading-3">Heading 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-0.5">
          {/* formating */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={cn(
              { "bg-gray-50 dark:bg-gray-700": editor.isActive("bold") },
              "rounded-none hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <Bold size={12} className="font-medium" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={cn(
              { "bg-gray-50 dark:bg-gray-700": editor.isActive("italic") },
              "rounded-none hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <Italic size={12} className="font-medium" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={cn(
              { "bg-gray-50 dark:bg-gray-700": editor.isActive("strike") },
              "rounded-none hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <Strikethrough size={12} className="font-medium" />
          </Button>

          <Button
            title="remove formatting"
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="rounded-none hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RemoveFormatting size={12} className="font-medium" />
          </Button>

          <Button
            title="bullet list"
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              {
                "bg-gray-50 dark:bg-gray-700": editor.isActive("bulletList"),
              },
              "rounded-none hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <List size={12} className="font-medium" />
          </Button>

          <Button
            title="ordered list"
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              {
                "bg-gray-50 dark:bg-gray-700": editor.isActive("orderedList"),
              },
              "rounded-none hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <ListOrdered size={12} className="font-medium" />
          </Button>
        </div>
      </div>

      {/* redo undo */}
      <div className="flex items-center">
        <Button
          title="undo"
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo size={12} className="font-medium" />
        </Button>

        <Button
          title="redo"
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo size={12} className="font-medium" />
        </Button>
      </div>
    </div>
  );
}
