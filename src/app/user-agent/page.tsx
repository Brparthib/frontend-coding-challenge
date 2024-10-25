import { Providers } from "@/components/providers";
import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
  const userAgent = headers().get("user-agent") || undefined;
  return (
    <Providers userAgent={userAgent}>
      <UserAgent />
    </Providers>
  );
};

export default UserAgentRoot;
