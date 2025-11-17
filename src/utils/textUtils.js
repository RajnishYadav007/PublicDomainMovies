/**
 * Remove HTML tags from text
 * Handles <br />, <p>, <div>, etc.
 */
export function stripHtmlTags(html) {
  if (!html) return '';
  
  // Method 1: Using regex (fast, client-side safe)
  const cleanText = html.replace(/<[^>]*>/g, '');
  
  // Replace multiple spaces/newlines with single space
  return cleanText.replace(/\s+/g, ' ').trim();
}

/**
 * Convert HTML to plain text with proper line breaks
 * Converts <br> to newlines, removes other tags
 */
export function htmlToPlainText(html) {
  if (!html) return '';
  
  // Replace <br> tags with newlines
  let text = html.replace(/<br\s*\/?>/gi, '\n');
  
  // Replace <p> tags with double newlines
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '');
  
  // Remove all remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');
  
  // Clean up extra whitespace
  text = text.replace(/\n{3,}/g, '\n\n'); // Max 2 newlines
  text = text.replace(/[ \t]+/g, ' '); // Single spaces
  
  return text.trim();
}

/**
 * Truncate text to specified length with ellipsis
 * Used for previews/summaries
 */
export function truncateText(text, maxLength = 200) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
