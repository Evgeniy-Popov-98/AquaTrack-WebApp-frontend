import { Suspense } from 'react';

const SharedLayout = ({ children }) => {
  return (
    <div>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;
