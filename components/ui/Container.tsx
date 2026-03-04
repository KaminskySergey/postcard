'use client';

import { cn } from '@/utils/utils';
import React from 'react';

interface IContainer {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: IContainer) {
    return <div className={cn(' text-black dark:text-white max-w-6xl   ml-auto mr-auto px-5 md:px-8', className)}>{children}</div>;
}