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
        <div>
            <Pagination className={cn(className)}>
                <PaginationContent>
                    {Array.from(Array(getPageCount(items)).keys()).map((item, index) => {
                        return (
                            <PaginationItem key={index} className='cursor-pointer'>
                                <PaginationLink
                                    onClick={() => {
                                        router.push(
                                            `?section=${section}&page=${index + 1}`
                                        );
                                    }}
                                    className={cn(
                                        "w-8 h-8 flex justify-center items-center rounded-md",
                                        page === index + 1 ? "bg-[#3c3c3c] text-white" : "bg-[#2d2d2d] text-white"
                                    )}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
  )
}
