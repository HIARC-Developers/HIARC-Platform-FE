'use client';

import { SignupForm } from '@/features/auth/components/signup-form';

export function DesktopSignupPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[470px] items-center justify-center gap-4">
      <SignupForm />
    </div>
  );
}