'use client';

import { Suspense, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/shared/store/store';

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(null!);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <StoreProvider>{children}</StoreProvider>
    </Suspense>
  );
}
