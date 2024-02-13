"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { usePagination } from "@/app/_hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export const ProductsPagination = ({
  totalCount,
  pageSize,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsCount = Math.ceil(totalCount / pageSize);

  const {
    isNextTruncable,
    isPrevTruncable,
    middlePages,
    previousPages,
    nextPages,
  } = usePagination({ currentPage, totalPagesCount: itemsCount });

  const onClickPrev = () => {
    if (currentPage <= 1) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage - 1));
    router.push(`?${params.toString()}`);
  };

  const onClickNext = () => {
    if (currentPage >= itemsCount) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage + 1));
    router.push(`?${params.toString()}`);
  };

  const onClickPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const disabledClassName =
    "pointer-events-none !cursor-not-allowed text-gray-500 dark:text-gray-600";

  const disablePrev = currentPage <= 1;
  const disableNext = currentPage >= itemsCount;

  return (
    <Pagination>
      <PaginationContent className="w-full items-stretch">
        <PaginationItem
          onClick={onClickPrev}
          aria-disabled={currentPage <= 1}
          className={disablePrev ? disabledClassName : ""}
        >
          <PaginationPrevious />
        </PaginationItem>

        {previousPages.map((num) => (
          <PaginationItem key={num} onClick={() => onClickPage(num)}>
            <PaginationLink isActive={currentPage == num}>{num}</PaginationLink>
          </PaginationItem>
        ))}

        {isPrevTruncable && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {middlePages.map((num) => (
          <PaginationItem key={num} onClick={() => onClickPage(num)}>
            <PaginationLink isActive={currentPage == num}>{num}</PaginationLink>
          </PaginationItem>
        ))}

        {isNextTruncable && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {nextPages.map((num) => (
          <PaginationItem key={num} onClick={() => onClickPage(num)}>
            <PaginationLink isActive={currentPage == num}>{num}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          onClick={onClickNext}
          className={disableNext ? disabledClassName : ""}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
