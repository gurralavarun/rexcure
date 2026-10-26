export interface CompanyInfo {
  name: string
  legalName: string
  shortName: string
  siteUrl: string
  email: string
  phone: string
  phoneDisplay: string
  address: string
  city: string
  state: string
  country: string
  establishedYear: string
  tagline: string
}

export const company: CompanyInfo = {
  name: 'RexCure Pharma',
  legalName: 'RexCure Pharmaceuticals Pvt. Ltd.',
  shortName: 'RexCure',
  siteUrl: 'https://www.rexcurepharma.com',
  email: 'info@rexcurepharma.com',
  phone: '9885152643',
  phoneDisplay: '+91 98851 52643',
  address: 'DNO 18-500/2, Malkangiri, Secunderabad, Hyderabad, Telangana',
  city: 'Hyderabad',
  state: 'Telangana',
  country: 'India',
  establishedYear: '2012',
  tagline: 'Precision Formulations. Trusted Healthcare.',
}

export const featuredHeroImage = {
  src: '/hero-medical.png',
  alt: 'RexCure Pharma Healthcare & Formulations',
}
