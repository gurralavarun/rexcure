import type { MetadataRoute } from 'next'
import { company, products, therapeuticAreas } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static corporate pages with priority and rich images for Google Image indexing
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: company.siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${company.siteUrl}/images/hero-lab.jpg`,
        `${company.siteUrl}/icon.png`,
      ],
    },
    {
      url: `${company.siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${company.siteUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
      images: products.map((p) => {
        const img = p.primaryImage || p.images[0]
        return img.startsWith('http') ? img : `${company.siteUrl}${img}`
      }),
    },
    {
      url: `${company.siteUrl}/therapeutic-areas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${company.siteUrl}/quality`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${company.siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Every individual product page with all its packaging images for Google Image Search
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${company.siteUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.95,
    images: product.images.map((img) =>
      img.startsWith('http') ? img : `${company.siteUrl}${img}`
    ),
  }))

  // Every therapeutic area page
  const therapeuticPages: MetadataRoute.Sitemap = therapeuticAreas.map((area) => ({
    url: `${company.siteUrl}/therapeutic-areas/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticPages, ...productPages, ...therapeuticPages]
}
