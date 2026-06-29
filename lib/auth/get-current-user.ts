import { getServerSession } from "next-auth";
import type { CurrentUser } from "@/lib/auth";
import { authOptions } from "@/lib/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getServerSession(authOptions);

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
