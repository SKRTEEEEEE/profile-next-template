/**
 * JSON-LD Structured Data Schemas for SEO
 * Based on task 34504: Improve SEO and Accessibility
 * 
 * Provides structured data generators for Schema.org
 * 
 * EXCLUDED FROM COVERAGE - Pure SEO configuration, no business logic
 */

import { personalInfo, baseUrl } from './metadata';
import { creatorData } from '../data';

/**
 * Generate JSON-LD structured data for Person schema
 */
export function generatePersonSchema(locale: 'es' | 'en' | 'ca' | 'de' = 'es') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    givenName: personalInfo.givenName,
    familyName: personalInfo.familyName,
    jobTitle: personalInfo.jobTitle[locale],
    description: personalInfo.description[locale],
    url: baseUrl,
    email: creatorData.email,
    image: `${baseUrl}/avatar.png`,
    sameAs: personalInfo.socialProfiles,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location.city,
      addressRegion: personalInfo.location.region,
      addressCountry: personalInfo.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: personalInfo.location.coordinates.latitude,
      longitude: personalInfo.location.coordinates.longitude,
    },
    knowsAbout: [
      'Web Development',
      'Fullstack Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'DevOps',
      'IIoT',
      'Industrial Development',
      'Software Architecture',
      'Database Design',
      'RESTful APIs',
      'Frontend Development',
      'Backend Development',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: personalInfo.jobTitle[locale],
      occupationLocation: {
        '@type': 'City',
        name: personalInfo.location.city,
      },
      skills: [
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'DevOps',
        'IIoT',
        'Web Development',
      ],
    },
  };
}

/**
 * Generate JSON-LD structured data for WebSite schema
 */
export function generateWebSiteSchema(locale: 'es' | 'en' | 'ca' | 'de' = 'es') {
  const names = {
    es: `${personalInfo.name} - Desarrollador Fullstack`,
    en: `${personalInfo.name} - Fullstack Developer`,
    ca: `${personalInfo.name} - Desenvolupador Fullstack`,
    de: `${personalInfo.name} - Fullstack-Entwickler`,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: names[locale],
    url: baseUrl,
    description: personalInfo.description[locale],
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    inLanguage: [locale, 'es', 'en', 'ca', 'de'],
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: 'es' | 'en' | 'ca' | 'de' = 'es'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD structured data for CreativeWork/Project schema
 */
export function generateProjectSchema({
  name,
  description,
  url,
  dateCreated,
  programmingLanguages,
  // locale reserved for future i18n implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locale = 'es',
}: {
  name: string;
  description: string;
  url: string;
  dateCreated?: string;
  programmingLanguages?: string[];
  locale?: 'es' | 'en' | 'ca' | 'de';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    dateCreated,
    programmingLanguage: programmingLanguages,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
  };
}

/**
 * Generate JSON-LD structured data for ProfilePage schema
 */
export function generateProfilePageSchema(locale: 'es' | 'en' | 'ca' | 'de' = 'es') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${personalInfo.name} - Portfolio`,
    description: personalInfo.description[locale],
    url: `${baseUrl}/${locale}/portafolio`,
    mainEntity: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };
}

/**
 * Helper to render JSON-LD script tag as string
 * Use this in your layout/page components directly with dangerouslySetInnerHTML
 * Example:
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema('es')) }}
 * />
 */
