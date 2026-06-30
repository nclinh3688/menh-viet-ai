import { getServerSession } from "next-auth";
import type { CurrentUser } from "@/lib/auth";
import { authOptions, isAuthRuntimeReady } from "@/lib/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isAuthRuntimeReady()) {
    return null;
  }

  let session;

  try {
    session = await getServerSession(authOptions);
  } catch {
    return null;
  }

  if (session?.user == null) {
    return null;
  }

  return {
    email: session.user.email ?? null,
    id: session.user.id,
    image: session.user.image ?? null,
    name: session.user.name ?? null,
  };
}
