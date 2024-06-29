import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>
        <Link href="/count">Count</Link>
      </div>
      <div>
        <Link href="/theme">Theme</Link>
      </div>
      <div>
        <Link href="/theme-storage">Theme Storage</Link>
      </div>
      <div>
        <Link href="/read-only">Read Only</Link>
      </div>
      <div>
        <Link href="/write-only">Write Only</Link>
      </div>
      <div>
        <Link href="/read-write">Read Write</Link>
      </div>
      <div>
        <Link href="/creator">Creator</Link>
      </div>
      <div>
        <Link href="/async-read">Async Read</Link>
      </div>
      <div>
        <Link href="/async-write">Async Write</Link>
      </div>
      <div>
        <Link href="loadable">Loadable</Link>
      </div>
      <div>
        <Link href="/reset">Reset</Link>
      </div>
      <div>
        <Link href="/select">Select</Link>
      </div>
      <div>
        <Link href="/immer">Immer</Link>
      </div>
    </>
  );
}
