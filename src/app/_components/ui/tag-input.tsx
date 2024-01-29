import React from "react";
import { Badge } from "./badge";
import { Input } from "./input";
import { cn } from "@/app/_lib/utils";
import { XIcon } from "lucide-react";

type IProps = React.HtmlHTMLAttributes<HTMLInputElement> & {
  defaultTags?: string[];
  className?: string;
  badgeClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onTagsChange: (tags: string[]) => void;
};

export const TagInput = ({
  defaultTags = [],
  className,
  badgeClassName,
  disabled,
  readOnly = false,
  onTagsChange,
  ...inputProps
}: IProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [tags, setTags] = React.useState(defaultTags);

  function handleUnselect(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const value = inputRef.current?.value;
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (value) {
        if (tags.findIndex((t) => t === value) !== -1) return; // ignore duplicates
        setTags([...tags, value]);
        onTagsChange(tags);
        inputRef.current.value = "";
      }
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    } else if (e.key === "Backspace" || e.key === "Delete") {
      if (value === "" && tags.length > 0) {
        handleUnselect(tags[tags.length - 1]);
      }
    }
    return;
  }

  return (
    <div
      className={cn(
        "group rounded-md border border-input p-1 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <div className="flex flex-wrap gap-0.5">
        {tags.map((option) => {
          return (
            <Badge
              variant={"secondary"}
              key={option}
              data-disabled={disabled}
              className={cn(
                "scale-95 rounded-sm text-xs font-normal",
                "data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground",
                badgeClassName,
              )}
            >
              {option}
              {!readOnly && !disabled && (
                <button
                  type="button"
                  title={`delete ${option}`}
                  onClick={() => handleUnselect(option)}
                  className={cn(
                    "ml-1  border-0 outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    disabled && "hidden",
                  )}
                >
                  <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </Badge>
          );
        })}
        <Input
          {...inputProps}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          style={{ boxShadow: "none" }}
          className="flex-1 !border-none !border-transparent !bg-transparent !outline-none !ring-transparent placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </div>
  );
};
