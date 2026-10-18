export interface HeroCarouselSlide {
  id: string
  category: string
  heading: string
  description: string
  ctaText: string
  ctaHref: string
  image: string
  alt: string
}

export const HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'diabetology',
    category: 'Diabetology & Metabolic Care',
    heading: 'Better Blood Sugar Control for a Healthier Tomorrow',
    description:
      'Our evidence-based formulations in diabetology help individuals manage blood sugar levels effectively and support long-term health and well-being.',
    ctaText: 'Explore Diabetology Range',
    ctaHref: '/therapeutic-areas/anti-diabetic',
    image: '/assets/hero-posters/diabetology.png',
    alt: 'Diabetology & Metabolic Care formulations for better blood sugar control and metabolic health',
  },
  {
    id: 'gastroenterology',
    category: 'Gastroenterology & Acid-Peptic Care',
    heading: 'Comfort, Balance and Digestive Health',
    description:
      'Our formulations in gastroenterology support the management of acid-peptic conditions and promote digestive comfort.',
    ctaText: 'Explore Gastro Care Range',
    ctaHref: '/therapeutic-areas/gastro-care',
    image: '/assets/hero-posters/gastroenterology.png',
    alt: 'Gastroenterology & Acid-Peptic Care formulations promoting digestive balance and comfort',
  },
  {
    id: 'allergy-pediatric',
    category: 'Allergy & Pediatric Care',
    heading: 'Breathing Easier for Brighter Days',
    description:
      'Explore our allergy and pediatric care portfolio for children and families.',
    ctaText: 'Explore Allergy & Pediatric Range',
    ctaHref: '/therapeutic-areas/allergy-care',
    image: '/assets/hero-posters/allergy-pediatric.png',
    alt: 'Allergy & Pediatric Care portfolio supporting respiratory comfort for children and families',
  },
  {
    id: 'nutraceuticals',
    category: 'Nutraceuticals & Wellness',
    heading: 'Nutrition for a Stronger You',
    description:
      'Explore our nutraceuticals and wellness range supporting daily nutritional needs and overall well-being.',
    ctaText: 'Explore Wellness Range',
    ctaHref: '/therapeutic-areas/nutraceutical',
    image: '/assets/hero-posters/nutraceuticals-wellness.png',
    alt: 'Nutraceuticals & Wellness formulations supporting daily nutritional needs and cellular defense',
  },
  {
    id: 'cardiac-care',
    category: 'Cardiac Care',
    heading: 'Supporting Heart Health for Life',
    description:
      'Explore our cardiac care portfolio and products.',
    ctaText: 'Explore Cardiac Care Range',
    ctaHref: '/therapeutic-areas',
    image: '/assets/hero-posters/cardiac-care.png',
    alt: 'Cardiac Care portfolio and products supporting cardiovascular health for life',
  },
]

export const AUTOPLAY_INTERVAL_MS = 7000

// Legacy scene duration export preserved for backward-compatibility
export const SCENE_DURATION_MS = AUTOPLAY_INTERVAL_MS
