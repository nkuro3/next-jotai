/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { atom, useAtom } from 'jotai';

const textAtom = atom('readonly atoms');
const uppercase = atom((get) => get(textAtom).toUpperCase());

export default function Page() {
  const [lowercaseText, setLowercaseText] = useAtom(textAtom);
  const [uppercaseText] = useAtom(uppercase);
  const handleChange = (e: any) => setLowercaseText(e.target.value);
  return (
    <div className="app">
      <input value={lowercaseText} onChange={handleChange} />
      <h1>{uppercaseText}</h1>
    </div>
  );
}
