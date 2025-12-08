// src/utils/parseSlugAndId.ts

// MongoDB ObjectId must be exactly 24 hex characters
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

/**
 * Safely parses a dynamic route param like:
 *   "tu-mera-bal-6777b55cb50ef55a40826e2b"
 *
 * Works with:
 *  - string
 *  - string[]
 *  - undefined (Next.js 16 Turbopack behavior)
 *
 * Returns:
 *   { slug: string, id: string }
 *
 * Throws error ONLY if the id is invalid.
 */
export function parseSlugAndId(
  param: string | string[] | undefined
): { slug: string; id: string } {

  // Normalize input (Next.js Turbopack sometimes sends array or undefined)
  const raw =
    Array.isArray(param) ? param[0] ?? "" : (param ?? "");

  if (!raw || typeof raw !== "string") {
    throw new Error(`slugAndId param is missing or invalid: ${String(param)}`);
  }

  // Remove whitespace & trailing slashes
  const cleaned = raw.trim().replace(/\/+$/, "");

  // Split into parts, remove empty values
  const parts = cleaned.split("-").filter(Boolean);

  if (parts.length < 2) {
    throw new Error(`Unexpected slugAndId format: "${raw}"`);
  }

  // Last part MUST be a valid ObjectId
  const idCandidate = parts[parts.length - 1];

  if (!OBJECT_ID_REGEX.test(idCandidate)) {
    throw new Error(`Invalid ObjectId in slugAndId: "${idCandidate}"`);
  }

  // Everything before the id is the slug
  const slug = parts.slice(0, -1).join("-");

  return { slug, id: idCandidate };
}
