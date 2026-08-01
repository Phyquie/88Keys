/**
 * Generates a URL-friendly slug containing the title and the MongoDB ID.
 */
export function getBlogSlug(title: string, id: string): string {
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/(^-|-$)+/g, "");  // Remove leading/trailing hyphens
  return `${slugifiedTitle}-${id}`;
}

/**
 * Extracts the 24-character MongoDB ObjectId from the end of the slug.
 */
export function extractIdFromSlug(slug: string): string {
  // MongoDB ObjectIds are exactly 24 hex characters.
  return slug.slice(-24);
}
