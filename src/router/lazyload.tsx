import { Suspense } from 'react';
const lazyload = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default lazyload;
