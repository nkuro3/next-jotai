'use client';

import { Provider } from 'jotai';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};
