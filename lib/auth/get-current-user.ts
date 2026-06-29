import type { CurrentUser } from "@/lib/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  // Auth.js runtime will be connected in a later sprint. Public routes stay anonymous for now.
  return null;
}
