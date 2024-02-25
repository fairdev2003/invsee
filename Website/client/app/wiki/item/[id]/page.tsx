
'use client'

import React from 'react';

import { trpc } from "@/app/_trpc/client";
import { Button } from '@/components/ui/button';

const Page =  () => {
  
  const { data } = trpc.user.getUserByEmail.useQuery("kubaklimkiewicz1@gmail.com");
  const addTodo = trpc.setTodos.useMutation();

  const todoFunc = async () => {
    await addTodo.mutateAsync({name: 'Jakubek Seks', id: 1})
  }

  return (
    <section className="p-10 flex flex-col gap-y-6 text-white">
        {data ? <h1>{data.nick}</h1> : <h1>Loading...</h1>}
    </section>
  );
};

export default Page;
