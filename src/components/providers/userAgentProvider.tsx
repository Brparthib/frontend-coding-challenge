"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

const CONTEXT_ERROR =
  "useUserAgentContext must be used within a UserAgentProvider";

type UserAgent = string | null;

type UserAgentContextType = {
  userAgent: UserAgent;
  setUserAgent: (userAgent: UserAgent) => void;
};

type UserAgentProviderProps = {
  children: ReactNode;
  userAgent?: UserAgent;
};

const UserAgentContext = createContext<UserAgentContextType | undefined>(
  undefined
);

export const useUserAgentContext = (): UserAgentContextType => {
  const context = useContext(UserAgentContext);
  if (context === undefined) {
    throw new Error(CONTEXT_ERROR);
  }
  return context;
};

export const UserAgentProvider: React.FC<UserAgentProviderProps> = ({
  children,
  userAgent: userAgentFromServer,
}) => {
  const [userAgent, setUserAgent] = useState<UserAgent>(
    userAgentFromServer || null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!userAgent) {
      const savedUserAgent = localStorage.getItem("userAgent");
      if (savedUserAgent) {
        setUserAgent(savedUserAgent);
      } else {
        const currentUserAgent = window.navigator.userAgent;
        setUserAgent(currentUserAgent);
        localStorage.setItem("userAgent", currentUserAgent);
      }
    }
  }, [userAgent]);

  const value = useMemo<UserAgentContextType>(
    () => ({
      userAgent,
      setUserAgent,
    }),
    [userAgent]
  );

  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  );
};
