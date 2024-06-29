'use client';

import { atom, useAtom } from 'jotai';

const theme = atom('light');

export default function Home() {
  const [appTheme, setAppTheme] = useAtom(theme);
  const handleClick = () => setAppTheme(appTheme === 'light' ? 'dark' : 'light');
  return (
    <div>
      <div className={appTheme}>
        <h1>This is a theme switcher</h1>
        <button onClick={handleClick}>{appTheme === 'light' ? 'DARK' : 'LIGHT'}</button>
      </div>
    </div>
  );
}
