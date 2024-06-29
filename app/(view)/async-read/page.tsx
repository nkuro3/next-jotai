'use client';
import { atom, useAtom } from 'jotai';
import { Suspense } from 'react';

const counter = atom(1);
const asyncAtom = atom(async (get) => {
  await new Promise((r) => setTimeout(r, 1000));
  return get(counter) * 5;
});

function AsyncComponent() {
  const [asyncCount] = useAtom(asyncAtom);
  return (
    <div className="app">
      <h1>{asyncCount}</h1>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <AsyncComponent />
    </Suspense>
  );
}
