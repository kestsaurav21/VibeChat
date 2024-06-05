"use client"
import LoadingLogo from '@/components/ui/shared/LoadingLogo';
import { ClerkProvider, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Content } from 'next/font/google';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({children}: Props) => {
  return (
    <ClerkProvider >
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
          <Authenticated>
            {children}
          </Authenticated>
          <AuthLoading>
              <LoadingLogo/>
          </AuthLoading>
            {/* <Authenticated>
              {children}
            </Authenticated>
             */}
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider