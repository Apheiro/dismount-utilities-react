import { useEffect, useRef } from 'react';

function useOnDismount(callback: () => void) {
  const funcRef = useRef(callback);
  funcRef.current = callback;
  useEffect(
    () => () => {
      funcRef.current();
    },
    [],
  );
}

export default useOnDismount;
