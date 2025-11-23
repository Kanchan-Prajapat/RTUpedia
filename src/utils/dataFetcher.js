// src/utils/dataFetcher.js

import branchesData from '../data/branches.json';
import yearData from '../data/year_data.json';
import syllabusLinks from '../data/syllabus_links.json';

/**
 * Generic async fetch for JSON datasets
 */
export const fetchData = (type, delay = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      switch (type) {
        case 'yearData':
          resolve(yearData);
          break;
        case 'branches':
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
 * Fetch branch-specific subject content
 * Handles both:
 *  - First-year (direct subjects)
 *  - Second/Third-year (semester → subjects array)
 */
export const fetchBranchContent = async (yearSlug, branchSlug) => {
  await new Promise(res => setTimeout(res, 400));

  const yearBlock = branchesData[yearSlug];
  if (!yearBlock) return [];

  const branchBlock = yearBlock[branchSlug];
  if (!branchBlock) return [];

  // Case 1: First-year subjects (already flat)
  if (
    Array.isArray(branchBlock) &&
    branchBlock.length > 0 &&
    branchBlock[0].subjectName
  ) {
    return branchBlock.map(sub => ({
      ...sub,
      units: Array.isArray(sub.units) ? sub.units : [],
      pyqs: Array.isArray(sub.pyqs) ? sub.pyqs : []
    }));
  }

  // Case 2: Semester-structured data (CSE 2nd/3rd year)
  if (Array.isArray(branchBlock)) {
    return branchBlock.flatMap(sem => {
      if (!sem.subjects) return [];

      return sem.subjects.map(sub => ({
        ...sub,
        units: Array.isArray(sub.units) ? sub.units : [],
        pyqs: Array.isArray(sub.pyqs) ? sub.pyqs : []
      }));
    });
  }

  return [];
};
