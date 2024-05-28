import React, { useTransition } from 'react';
import Spinner from "./Spinner";

interface ButtonPendingProps {
  children: React.ReactNode;
  onClick: () => void;
  [key: string]: any; // to allow additional props
}

export default function ButtonPending({ children, onClick, ...props }: ButtonPendingProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(onClick);
  }

  return (
    <button onClick={handleClick} {...props}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
} 