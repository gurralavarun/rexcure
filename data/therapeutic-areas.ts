export type TherapeuticArea = {
  slug: string
  name: string
  shortTitle: string
  categoryName: string
  description: string
  clinicalFocus: string
  keyMolecules: string[]
  statsSummary: string
}

export const therapeuticAreas: TherapeuticArea[] = [
  {
    slug: 'anti-diabetic',
    name: 'Diabetology & Metabolic Care',
    shortTitle: 'Diabetology',
    categoryName: 'Anti-diabetic',
    description: 'Evidence-based oral anti-diabetic therapeutics formulated for synchronized fasting and post-prandial glycemic control.',
    clinicalFocus: 'Type-2 Diabetes Mellitus, Glycemic Modulation & Insulin Sensitivity',
    keyMolecules: ['Glimepiride', 'Metformin HCl SR', 'Voglibose', 'Pioglitazone'],
    statsSummary: 'Fixed-dose combination therapies for improved patient adherence',
  },
  {
    slug: 'gastro-care',
    name: 'Gastroenterology & Acid-Peptic Care',
    shortTitle: 'Gastroenterology',
    categoryName: 'Gastro Care',
    description: 'Proton pump inhibitors and prokinetic formulations for sustained acid suppression and reflux relief.',
    clinicalFocus: 'GERD, Non-Ulcer Dyspepsia, Erosive Esophagitis & Gastric Ulcers',
    keyMolecules: ['Rabeprazole Sodium', 'Pantoprazole Sodium', 'Domperidone SR'],
    statsSummary: 'Sustained-release enteric formulations for reliable 24-hour symptom control',
  },
  {
    slug: 'allergy-care',
    name: 'Allergy & Pediatric Care',
    shortTitle: 'Allergy & Respiratory',
    categoryName: 'Allergy Care',
    description: 'Dual-action anti-histaminic and leukotriene receptor antagonist therapies for rhinitis and respiratory comfort.',
    clinicalFocus: 'Allergic Rhinitis, Seasonal Allergies, Nocturnal Cough in Children',
    keyMolecules: ['Montelukast Sodium', 'Levocetirizine Hydrochloride'],
    statsSummary: 'Available in child-friendly oral suspension and adult solid dosage formats',
  },
  {
    slug: 'pain-management',
    name: 'Pain & Musculoskeletal Care',
    shortTitle: 'Pain & Orthopedics',
    categoryName: 'Pain Management',
    description: 'Multi-modal analgesic and anti-inflammatory formulations for acute musculoskeletal pain and post-traumatic swelling.',
    clinicalFocus: 'Osteoarthritis, Musculoskeletal Sprains & Post-Surgical Swelling',
    keyMolecules: ['Aceclofenac', 'Paracetamol', 'Serratiopeptidase'],
    statsSummary: 'Synergistic enzyme-enhanced multi-agent relief for rapid functional recovery',
  },
  {
    slug: 'anti-infective',
    name: 'Anti-Infectives & Antibacterials',
    shortTitle: 'Anti-Infectives',
    categoryName: 'Anti-infective',
    description: 'Broad-spectrum potentiated aminopenicillin formulations engineered with clavulanate to overcome beta-lactamase resistance.',
    clinicalFocus: 'Pediatric Bacterial Infections, Acute Otitis Media, Sinusitis & RTI',
    keyMolecules: ['Amoxicillin', 'Potassium Clavulanate'],
    statsSummary: 'Dry syrup presentations with exact reconstitution ratios for accurate pediatric dosing',
  },
  {
    slug: 'nutraceutical',
    name: 'Nutraceuticals & Wellness',
    shortTitle: 'Nutraceuticals',
    categoryName: 'Nutraceutical',
    description: 'Antioxidant softgel formulations delivering cellular defense, retinal wellness, and vitality support.',
    clinicalFocus: 'Oxidative Stress, Retinal Cellular Protection, Cardio-Vascular & Vitality Support',
    keyMolecules: ['Lycopene', 'Lutein', 'Grape Seed Extract', 'Essential Micronutrients'],
    statsSummary: 'High-bioavailability lipid-matrix softgel technology',
  },
]
