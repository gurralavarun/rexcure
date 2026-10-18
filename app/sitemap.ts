import type { MetadataRoute } from 'next'
import { company, products, therapeuticAreas } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static corporate pages
  const staticPages = [
    {
      url: company.siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${company.siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${company.siteUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${company.siteUrl}/therapeutic-areas`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${company.siteUrl}/quality`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${company.siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Every individual product page
  const productPages = products.map((product) => ({
    url: `${company.siteUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Every therapeutic area page
  const therapeuticPages = therapeuticAreas.map((area) => ({
    url: `${company.siteUrl}/therapeutic-areas/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...productPages, ...therapeuticPages]
}
