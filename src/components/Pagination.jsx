import { Link } from 'react-router-dom';

/**
 * Accessible Pagination Component
 * Features:
 * - ARIA labels for screen readers
 * - Keyboard navigation
 * - Current page indication
 * - Disabled state handling
 * - SEO-friendly links
 * 
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {string} baseUrl - Base URL for pagination links (optional)
 */
export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  baseUrl = '' 
}) {
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Maximum visible page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current
      const leftSiblings = 1;
      const rightSiblings = 1;
      
      const showLeftDots = currentPage > 3;
      const showRightDots = currentPage < totalPages - 2;
      
      if (!showLeftDots && showRightDots) {
        // Near the start
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (showLeftDots && !showRightDots) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (showLeftDots && showRightDots) {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - leftSiblings; i <= currentPage + rightSiblings; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else {
        // Fallback: show all
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  
  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate URL for SEO-friendly links
  const getPageUrl = (page) => {
    if (!baseUrl) return '#';
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav 
      className="flex items-center justify-center gap-1 my-8" 
      role="navigation" 
      aria-label="Pagination Navigation"
    >
      
      {/* Previous Button */}
      <Link
        to={getPageUrl(currentPage - 1)}
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(currentPage - 1);
        }}
        className={`px-3 py-2 rounded-md font-medium transition-all
                   ${currentPage === 1
                     ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed pointer-events-none'
                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                   }`}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            to={getPageUrl(page)}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(page);
            }}
            className={`min-w-[2.5rem] px-3 py-2 rounded-md font-medium text-center transition-all
                       ${isActive
                         ? 'bg-blue-600 text-white shadow-md pointer-events-none'
                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                       }`}
            aria-label={isActive ? `Current page, page ${page}` : `Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={isActive ? -1 : 0}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      <Link
        to={getPageUrl(currentPage + 1)}
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(currentPage + 1);
        }}
        className={`px-3 py-2 rounded-md font-medium transition-all
                   ${currentPage === totalPages
                     ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed pointer-events-none'
                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                   }`}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Page Info (Optional) */}
      <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
}
