"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";
import { useEffect, useState } from "react";

export const UserAgent = () => {
  const { userAgent } = useUserAgentContext();
  const [localStorageUserAgent, setLocalStorageUserAgent] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!userAgent) {
      const storedUserAgent = localStorage.getItem("userAgent");
      setLocalStorageUserAgent(storedUserAgent);
    }
  }, [userAgent]);

  return (
    <div>
      <BackToHome />

      {(userAgent || localStorageUserAgent) && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent || localStorageUserAgent}</div>
        </div>
      )}

      {!userAgent && !localStorageUserAgent && <div>No user agent</div>}
    </div>
  );
};
