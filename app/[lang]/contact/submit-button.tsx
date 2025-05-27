'use client';

import { useFormStatus } from 'react-dom';
import classes from './submit-button.module.css';

interface SubmitButtonProps {
  children: React.ReactNode;
  submittingText?: string;
}

export default function SubmitButton({ children, submittingText = 'Analyzing Architecture...' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      className={classes.button}
      disabled={pending}
      style={{ 
        opacity: pending ? 0.7 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending ? submittingText : children}
    </button>
  );
}