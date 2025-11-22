// src/utils/datafetcher.js

import branchesData from '../data/branches.json';
import yearData from '../data/year_data.json';
import syllabusLinks from '../data/syllabus_links.json';

/**
 * Simulates an asynchronous data fetch from a data source.
 * @param {string} type - The type of data to fetch ('yearData', 'branchesData', 'syllabusLinks').
 * @param {number} delay - The delay in milliseconds to simulate network latency.
 */
export const fetchData = (type, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'yearData':
          resolve(yearData);
          break;
        case 'branchesData':
          resolve(branchesData);
          break;
        case 'syllabusLinks':
          resolve(syllabusLinks);
          break;
        default:
          resolve(null);
      }
    }, delay);
  });
};

/**
 * Fetches data for a specific branch and yearSlug.
 * @param {string} yearSlug - e.g., 'second-year'
 * @param {string} branchSlug - e.g., 'cse'
 */
export const fetchBranchContent = async (yearSlug, branchSlug) => {
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    const yearContent = branchesData[yearSlug];

    if (!yearContent) {
        return null;
    }

    // Filter content for the specific branchSlug
    const content = yearContent[branchSlug];
    
    // In a real application, you might filter content further here.
    return content || [];
};
