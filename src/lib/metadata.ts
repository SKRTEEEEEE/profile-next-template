/**
 * SEO Metadata and Structured Data Generator
 * Based on task 34503: Improve SEO and Accessibility
 * 
 * This file provides utilities to generate comprehensive SEO metadata
 * targeting Barcelona, Spain and Spanish-speaking markets
 */

import { Metadata } from 'next';
import { creatorData } from './data';

export const baseUrl = 'https://dev.desarrollador.tech';
export const alternateUrl = 'https://dev.desarrollador.tech'; // Same domain with alternate

// Personal Information
export const personalInfo = {
  name: 'Adan Reh Mañach',
  givenName: 'Adan',
  familyName: 'Reh Mañach',
  githubUsername: 'SKRTEEEEEE',
  location: {
    city: 'Barcelona',
    region: 'Catalonia',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: {
      latitude: 41.3851,
      longitude: 2.1734,
    },
  },
  jobTitle: {
    es: 'Desarrollador Fullstack',
    en: 'Fullstack Developer',
    ca: 'Desenvolupador Fullstack',
    de: 'Fullstack-Entwickler',
  },
  description: {
    es: 'Desarrollador Fullstack especializado en web, IIoT y DevOps. Arquitecturas escalables y seguras, protocolos de comunicación. Barcelona, España.',
    en: 'Fullstack Developer specialized in web, IIoT and DevOps. Scalable and secure architectures, communication protocols. Barcelona, Spain.',
    ca: 'Desenvolupador Fullstack especialitzat en web, IIoT i DevOps. Arquitectures escalables i segures, protocols de comunicació. Barcelona, Espanya.',
    de: 'Fullstack-Entwickler spezialisiert auf Web, IIoT und DevOps. Skalierbare und sichere Architekturen, Kommunikationsprotokolle. Barcelona, Spanien.',
  },
  socialProfiles: [
    `https://github.com/${creatorData.name}`,
    creatorData.linkedin,
    creatorData.website,
  ],
};

// Keywords targeting different markets (prioritized by proximity)
export const keywords = {
  es: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'desarrollador web Barcelona',
    'desarrollador fullstack Barcelona',
    'programador Barcelona',
    'desarrollador React Barcelona',
    'desarrollador Next.js Barcelona',
    'desarrollador TypeScript Barcelona',
    'desarrollador industrial Barcelona',
    'IIoT developer Barcelona',
    'DevOps Barcelona',
    'desarrollador frontend Barcelona',
    'desarrollador backend Barcelona',
    'freelance developer Barcelona',
    'programador freelance Barcelona',
    'desarrollador Node.js Barcelona',
    'arquitectura de software Barcelona',
    'desarrollador web España',
    'full stack developer Spain',
    'web developer Barcelona',
    'software engineer Barcelona',
  ],
  en: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'web developer Barcelona',
    'fullstack developer Barcelona',
    'React developer Barcelona',
    'Next.js developer Barcelona',
    'TypeScript developer Barcelona',
    'industrial developer Barcelona',
    'IIoT developer Barcelona',
    'DevOps engineer Barcelona',
    'frontend developer Barcelona',
    'backend developer Barcelona',
    'freelance developer Barcelona',
    'Node.js developer Barcelona',
    'software architect Barcelona',
    'web developer Spain',
    'full stack developer Spain',
    'software engineer Barcelona',
    'remote developer Spain',
  ],
  ca: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'desenvolupador web Barcelona',
    'desenvolupador fullstack Barcelona',
    'programador Barcelona',
    'desenvolupador React Barcelona',
    'desenvolupador Next.js Barcelona',
    'desenvolupador TypeScript Barcelona',
    'desenvolupador industrial Barcelona',
    'IIoT developer Barcelona',
    'DevOps Barcelona',
    'desenvolupador frontend Barcelona',
    'desenvolupador backend Barcelona',
    'freelance developer Barcelona',
  ],
  de: [
    'Adan Reh Mañach',
    'SKRTEEEEEE',
    'Webentwickler Barcelona',
    'Fullstack-Entwickler Barcelona',
    'React-Entwickler Barcelona',
    'Next.js-Entwickler Barcelona',
    'TypeScript-Entwickler Barcelona',
    'IIoT-Entwickler Barcelona',
    'DevOps-Ingenieur Barcelona',
    'Software-Entwickler Barcelona',
    'developer Barcelona',
    'entwickler Barcelona',
  ],
};

/**
 * Generate base metadata for a page
 */
export function generateMetadata({
  locale = 'es',
  title,
  description,
  path = '',
  image,
  noIndex = false,
  type = 'website',
}: {
  locale?: 'es' | 'en' | 'ca' | 'de';
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
}): Metadata {
  const url = `${baseUrl}/${locale}${path}`;
  const defaultImage = `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    keywords: keywords[locale],
    authors: [{ name: personalInfo.name, url: creatorData.githubUrl }],
    creator: personalInfo.name,
    publisher: personalInfo.name,
    robots: noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: url,
      languages: {
        es: `${baseUrl}/es${path}`,
        en: `${baseUrl}/en${path}`,
        ca: `${baseUrl}/ca${path}`,
        de: `${baseUrl}/de${path}`,
      },
    },
    openGraph: {
      type,
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : locale === 'ca' ? 'ca_ES' : 'de_DE',
      url,
      siteName: personalInfo.name,
      title,
      description,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || defaultImage],
      creator: '@' + creatorData.name,
    },
    other: {
      'geo.region': personalInfo.location.countryCode,
      'geo.placename': personalInfo.location.city,
      'geo.position': `${personalInfo.location.coordinates.latitude};${personalInfo.location.coordinates.longitude}`,
      'ICBM': `${personalInfo.location.coordinates.latitude}, ${personalInfo.location.coordinates.longitude}`,
    },
  };
}

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
