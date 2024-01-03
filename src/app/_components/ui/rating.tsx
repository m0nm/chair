"use client";

import { cn } from "@/app/_lib/utils";
import { StarIcon } from "lucide-react";
import { useState } from "react";

type IProps = {
  count?: number;
  starSize?: number;
  readOnly?: boolean;
  defaultRating?: number;
};

export const Rating = ({
  count = 5,
  starSize = 20,
  readOnly,
  defaultRating,
}: IProps) => {
  const [rating, setRating] = useState(defaultRating ?? 0);
  const [hover, setHover] = useState(0);

  const ratingWidth =
    rating == 0 ? 0 : rating >= 5 ? "100%" : `${(rating / 5) * 100}%`;

  return (
    <div className="relative flex w-fit flex-nowrap items-center whitespace-nowrap">
      {[...Array(count)].map((_, i) => {
        i += 1;

        return (
          <button
            key={i}
            type="button"
            onClick={() => !readOnly && setRating(i)}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
            }}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(rating)}
            className={cn(
              " text-gray-300",
              i <= (hover || rating) && "text-yellow-400",
            )}
          >
            <StarIcon width={starSize} height={starSize} />
          </button>
        );
      })}

      <div
        className="absolute inset-0 z-10 flex flex-nowrap items-center overflow-hidden whitespace-nowrap"
        style={{ width: ratingWidth }}
      >
        {[...Array(count)].map((_, i) => {
          return (
            <button
              key={i * 10}
              type="button"
              className={cn(" text-yellow-400")}
            >
              <StarFillIcon width={starSize} height={starSize} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

function StarFillIcon({ width, height }: { width: number; height: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      viewBox="0 0 512 512"
    >
      <path
        className="fill-yellow-400"
        d="M394,480a16,16,0,0,1-9.39-3L256,383.76,127.39,477a16,16,0,0,1-24.55-18.08L153,310.35,23,221.2A16,16,0,0,1,32,192H192.38l48.4-148.95a16,16,0,0,1,30.44,0l48.4,149H480a16,16,0,0,1,9.05,29.2L359,310.35l50.13,148.53A16,16,0,0,1,394,480Z"
      ></path>
    </svg>
  );
}
