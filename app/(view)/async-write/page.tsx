'use client';
import { atom, useAtom } from 'jotai';

const counter = atom(1);

const asyncAtom = atom(null, async (get, set) => {
  await new Promise((r) => setTimeout(r, 1000));
  set(counter, get(counter) + 1);
});

function AsyncComponent() {
  const [count] = useAtom(counter);
  const [, incCounter] = useAtom(asyncAtom);
  return (
    <div className="app">
      <h1>{count}</h1>
      <button onClick={incCounter}>inc</button>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <AsyncComponent />
    </div>
  );
}
