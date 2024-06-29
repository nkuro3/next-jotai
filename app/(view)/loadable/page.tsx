'use client';
import { atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';

const countAtom = atom(0);
const asyncAtom = atom(async (get) => {
  await new Promise((r) => setTimeout(r, 1000));
  return get(countAtom);
});
const loadableAtom = loadable(asyncAtom);
const AsyncComponent = () => {
  const [value] = useAtom(loadableAtom);
  if (value.state === 'hasError') return <div>{value.error}</div>;
  if (value.state === 'loading') {
    return <div>Loading...</div>;
  }
  return <div>Value: {value.data}</div>;
};

export default AsyncComponent;
