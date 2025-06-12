"use client";

import { Toaster } from '@/components/ui/toaster'
import { ToastContainer } from '@/components/ui/toast-container'
import { AppShell } from './app-shell'
import type { ReactNode } from 'react'

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      {children}
      <ToastContainer />
      <Toaster />
    </AppShell>
  );
} 