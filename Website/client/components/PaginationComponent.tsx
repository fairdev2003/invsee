import React, { useEffect, useState } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PaginationProps {
    getPageCount: (items: any) => number;
    items: any;
    className?: string;
    number_of_items?: number;
}


export default function PaginationComponent({
    getPageCount,
    items,
    className,
    number_of_items
}: PaginationProps) {

    const [page, setPage] = useState<number>(1);

    const [section, setSection] = useState<string>("");

    const searchParams = useSearchParams() as any;

    const router = useRouter();


    useEffect(function() {
        if (searchParams.has("section")) {
          setSection(searchParams.get("section"));
        } else {
          setSection("overview");
        }

        if (searchParams.has("page")) {
          setPage(parseInt(searchParams.get("page")));
        }
      }, [searchParams]);


  return (
        <Pagination className={cn(className)}>
          <PaginationContent className="flex gap-4 mt-10">
            <Button
              onClick={() => {
                if (page === 1) {
                  setPage(getPageCount(items));
                  router.push(
                    window.location.href.split("?")[0] +
                      `?section=${section}` +
                      `&page=${getPageCount(items)} `
                  );
                } else {
                  setPage(page - 1);
                  router.push(
                    window.location.href.split("?")[0] +
                      `?section=${section}` +
                      `&page=${page - 1} `
                  );
                }
              }}
              variant="none"
              disabled={page === 1}
            >
              {"<"}
            </Button>
            {Array.from({ length: number_of_items as number }).map((_, index) => {
              return (
                <PaginationItem key={index} className="cursor-pointer ">
                  <PaginationLink
                    onClick={() => {
                      setPage(index + 1);
                      router.push(
                        window.location.href.split("?")[0] +
                          `?section=${section}` +
                          `&page=${index + 1} `
                      );
                    }}
                    isActive={index === page - 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <Button
              variant="none"
              disabled={page === getPageCount(items)}
              onClick={() => {
                setPage(page + 1);
                if (page === getPageCount(items)) {
                  setPage(1);
                } else {
                  setPage(page + 1);
                }
                router.push(
                  window.location.href.split("?")[0] +
                    `?section=${section}` +
                    `&page=${page + 1} `
                );
              }}
            >
              {">"}
            </Button>
          </PaginationContent>
        </Pagination>
  )
}
