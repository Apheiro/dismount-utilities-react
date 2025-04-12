import useOnDismount from '@/hooks/useOnDismount';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onDismount?: () => void;
}

function DismountHandler({ children, onDismount }: Props) {
  if (onDismount) {
    useOnDismount(onDismount);
  }
  return children;
}

export default DismountHandler;
