
'use client'

import React from 'react';

import { trpc } from "@/app/_trpc/client";

const Page =  () => {
  
  const { data } = trpc.getUsers.useQuery();

  return (
    <section className="p-10">
        {data?.map((todo: any, _: number) => {
          return (
            <div key={_} className="mb-4">
              <p className='text-white'>{JSON.stringify(todo)}</p>
            </div>
          )
        })}
    </section>
  );
};

export default Page;
