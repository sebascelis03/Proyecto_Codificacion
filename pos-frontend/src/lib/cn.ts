/**
 * Utility for merging Tailwind CSS class names.
 * Placeholder — will be replaced with clsx + tailwind-merge in later tasks.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
