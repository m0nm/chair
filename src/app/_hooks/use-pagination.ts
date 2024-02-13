import React from "react";

type IProps = {
  currentPage: number;
  totalPagesCount: number;
  middleSiblingPagesCount?: number;
  edgePagesCount?: number;
};

export function usePagination({
  currentPage,
  totalPagesCount,
  middleSiblingPagesCount = 1,
  edgePagesCount = 2,
}: IProps) {
  const pages = [...Array(totalPagesCount)].map((_, index) => index + 1);

  const isFirstPage = currentPage <= middleSiblingPagesCount;
  const isLastPage = currentPage + middleSiblingPagesCount >= totalPagesCount;

  //   an array of middle pages to render
  const middlePages = React.useMemo(() => {
    const middlePageCount = middleSiblingPagesCount * 2 + 1;

    if (isFirstPage) {
      return pages.slice(0, middlePageCount);
    }

    if (isLastPage) {
      return pages.slice(-middlePageCount);
    }

    return pages.slice(
      currentPage - middleSiblingPagesCount,
      currentPage + middleSiblingPagesCount + 1,
    );
  }, [currentPage, isFirstPage, isLastPage, middleSiblingPagesCount, pages]);

  const firstMiddlePage = React.useMemo(() => {
    return middlePages[0];
  }, [middlePages]);

  const lastMiddlePage = React.useMemo(() => {
    return middlePages[middlePages.length - 1];
  }, [middlePages]);

  //   this is needed for the truncation logic
  const getAllPreviousPages = () => {
    return pages.slice(0, firstMiddlePage - 1);
  };

  const previousPages = React.useMemo(() => {
    if (isFirstPage || getAllPreviousPages().length < 1) {
      return [];
    }
    return pages
      .slice(0, edgePagesCount)
      .filter((p) => !middlePages.includes(p));
  }, [pages, middlePages, isFirstPage, edgePagesCount]);

  //   this is needed for the truncation logic
  const getAllNextPages = React.useMemo(() => {
    return pages.slice(lastMiddlePage, pages[pages.length]);
  }, [pages, middlePages]);

  const nextPages = React.useMemo(() => {
    if (isLastPage) return [];
    if (getAllNextPages.length < 1) return [];
    return pages
      .slice(pages.length - edgePagesCount, pages.length)
      .filter((p) => !middlePages.includes(p));
  }, [middlePages, pages, isLastPage]);

  //   truncation logic
  const isPrevTruncable = React.useMemo(() => {
    return firstMiddlePage > previousPages[previousPages.length - 1] + 1;
  }, [previousPages, middlePages]);

  const isNextTruncable = React.useMemo(() => {
    return lastMiddlePage + 1 < nextPages[0];
  }, [nextPages, middlePages]);

  return {
    middlePages,
    previousPages,
    nextPages,
    isPrevTruncable,
    isNextTruncable,
  };
}
