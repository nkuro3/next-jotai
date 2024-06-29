'use client';

import { atom, useAtom } from 'jotai';

const counter = atom(0);

export default function Home() {
  const [count, setCounter] = useAtom(counter);
  const onClick = () => setCounter((prev) => prev + 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
}
