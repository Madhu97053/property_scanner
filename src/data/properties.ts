import type { Property, ProviderOffer } from '@/types';

const baseOffers = (price: number): ProviderOffer[] => {
  const variance = (pct: number) => Math.round((price * (1 + pct / 100)) * 10) / 10;
  return [
    { provider: 'MagicBricks', price: variance(0), logoColor: '#e74c3c', logo: '/logos/magicbricks.png', url: '#', delivery: 'Ready to Move' },
    { provider: 'Housing.com', price: variance(1.5), logoColor: '#ffcc00', logo: '/logos/housing.png', url: '#', delivery: 'Ready to Move' },
    { provider: '99acres', price: variance(-1.2), logoColor: '#0078db', logo: '/logos/99acres.jpg', url: '#', delivery: 'Ready to Move' },
    { provider: 'SquareYards', price: variance(2.5), logoColor: '#111111', logo: '/logos/squareyards.png', url: '#', delivery: 'Ready to Move' },
  ];
};

// Reusable image pools from Pexels (royalty-free)
const aptImgs = [
  'https://images.pexels.com/photos/7672061/pexels-photo-7672061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7672060/pexels-photo-7672060.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28304971/pexels-photo-28304971.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36342575/pexels-photo-36342575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1099065/pexels-photo-1099065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7672058/pexels-photo-7672058.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const villaImgs = [
  'https://images.pexels.com/photos/24805054/pexels-photo-24805054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35060260/pexels-photo-35060260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30781823/pexels-photo-30781823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8143683/pexels-photo-8143683.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8092387/pexels-photo-8092387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const interiorImgs = [
  'https://images.pexels.com/photos/6980724/pexels-photo-6980724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/280239/pexels-photo-280239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7546767/pexels-photo-7546767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6588575/pexels-photo-6588575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7005270/pexels-photo-7005270.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7031622/pexels-photo-7031622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const commercialImgs = [
  'https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10889988/pexels-photo-10889988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19335810/pexels-photo-19335810.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18468708/pexels-photo-18468708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const houseImgs = [
  'https://images.pexels.com/photos/27014934/pexels-photo-27014934.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18495295/pexels-photo-18495295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/21069093/pexels-photo-21069093.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27567060/pexels-photo-27567060.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2961974/pexels-photo-2961974.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8143677/pexels-photo-8143677.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];
const plotImgs = [
  'https://images.pexels.com/photos/15422584/pexels-photo-15422584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5909671/pexels-photo-5909671.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37860385/pexels-photo-37860385.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7031600/pexels-photo-7031600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const allAmenities = [
  'Swimming Pool', 'Gym', 'Clubhouse', '24/7 Security', 'Power Backup',
  'Children\'s Play Area', 'Jogging Track', 'Landscaped Gardens', 'CCTV Surveillance',
  'Covered Parking', 'Lift', 'Fire Safety', 'Rainwater Harvesting', 'Solar Lighting',
  'Gated Community', 'Sports Court', 'Yoga Deck', 'Amphitheatre',
];

const localities: Record<string, string[]> = {
  Hyderabad: ['Gachibowli', 'Madhapur', 'Banjara Hills', 'Kondapur', 'Jubilee Hills', 'Kukatpally', 'Nanakramguda', 'Tellapur'],
  Bengaluru: ['Whitefield', 'Koramangala', 'Indiranagar', 'Sarjapur Road', 'HSR Layout', 'Electronic City', 'Hebbal', 'Yelahanka'],
  Mumbai: ['Bandra West', 'Powai', 'Worli', 'Andheri West', 'Thane West', 'Navi Mumbai', 'Lower Parel', 'Juhu'],
  Chennai: ['Anna Nagar', 'OMR', 'Velachery', 'T Nagar', 'Adyar', 'Porur', 'Sholinganallur', 'Ecr Road'],
  Pune: ['Baner', 'Hinjewadi', 'Wakad', 'Koregaon Park', 'Hadapsar', 'Kharadi', 'Viman Nagar', 'Aundh'],
};

const titles: Record<string, string[]> = {
  Apartment: ['Skyline Residences', 'Premium Apartments', 'The Grand Tower', 'Serene Living', 'Urban Heights', 'The Gateway'],
  Villa: ['Royal Villas', 'The Villa Estate', 'Green Valley Villas', 'Luxury Living Villas', 'The Garden Villa', 'Prestige Villas'],
  'Independent House': ['Heritage Home', 'The Independent Bungalow', 'Spacious Family House', 'Classic Bungalow', 'Modern House'],
  Plot: ['Premium Residential Plot', 'Corner Plot', 'Gated Community Plot', 'Investment Land'],
  Commercial: ['Office Space', 'Commercial Tower', 'Business Hub', 'Corporate Office'],
};

function pickImgs(type: string): string[] {
  switch (type) {
    case 'Apartment': return [aptImgs[Math.floor(Math.random() * aptImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)], aptImgs[Math.floor(Math.random() * aptImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)]];
    case 'Villa': return [villaImgs[Math.floor(Math.random() * villaImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)], villaImgs[Math.floor(Math.random() * villaImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)]];
    case 'Independent House': return [houseImgs[Math.floor(Math.random() * houseImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)], houseImgs[Math.floor(Math.random() * houseImgs.length)], interiorImgs[Math.floor(Math.random() * interiorImgs.length)]];
    case 'Plot': return [plotImgs[Math.floor(Math.random() * plotImgs.length)], plotImgs[Math.floor(Math.random() * plotImgs.length)]];
    case 'Commercial': return [commercialImgs[Math.floor(Math.random() * commercialImgs.length)], commercialImgs[Math.floor(Math.random() * commercialImgs.length)]];
    default: return [interiorImgs[0]];
  }
}

function pickAmenities(type: string): string[] {
  if (type === 'Plot') return ['Gated Community', '24/7 Security', 'CCTV Surveillance', 'Rainwater Harvesting'];
  const shuffled = [...allAmenities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8 + Math.floor(Math.random() * 4));
}

interface SeedSpec {
  city: string;
  type: Property['type'];
  bhk: Property['bhk'];
  price: number;
  area: number;
  listingType: Property['listingType'];
  furnished?: Property['furnishing'];
  titleName?: string;
}

const seeds: SeedSpec[] = [
  { city: 'Hyderabad', type: 'Apartment', bhk: '3', price: 85, area: 1650, listingType: 'buy' },
  { city: 'Hyderabad', type: 'Apartment', bhk: '2', price: 52, area: 1180, listingType: 'buy' },
  { city: 'Hyderabad', type: 'Villa', bhk: '4', price: 320, area: 3500, listingType: 'buy' },
  { city: 'Hyderabad', type: 'Apartment', bhk: '3', price: 1.2, area: 1850, listingType: 'rent', furnished: 'Furnished' },
  { city: 'Hyderabad', type: 'Plot', bhk: 'Plot', price: 45, area: 2400, listingType: 'buy' },
  { city: 'Hyderabad', type: 'Independent House', bhk: '4', price: 185, area: 2200, listingType: 'buy' },
  { city: 'Bengaluru', type: 'Apartment', bhk: '2', price: 68, area: 1250, listingType: 'buy' },
  { city: 'Bengaluru', type: 'Apartment', bhk: '3', price: 95, area: 1750, listingType: 'buy' },
  { city: 'Bengaluru', type: 'Villa', bhk: '4', price: 450, area: 4200, listingType: 'buy' },
  { city: 'Bengaluru', type: 'Apartment', bhk: '1', price: 0.35, area: 650, listingType: 'rent', furnished: 'Semi-Furnished' },
  { city: 'Bengaluru', type: 'Independent House', bhk: '3', price: 220, area: 2600, listingType: 'buy' },
  { city: 'Bengaluru', type: 'Plot', bhk: 'Plot', price: 60, area: 1500, listingType: 'buy' },
  { city: 'Mumbai', type: 'Apartment', bhk: '2', price: 185, area: 950, listingType: 'buy' },
  { city: 'Mumbai', type: 'Apartment', bhk: '3', price: 380, area: 1450, listingType: 'buy' },
  { city: 'Mumbai', type: 'Apartment', bhk: '4', price: 650, area: 2100, listingType: 'buy' },
  { city: 'Mumbai', type: 'Apartment', bhk: '2', price: 2.5, area: 1100, listingType: 'rent', furnished: 'Furnished' },
  { city: 'Mumbai', type: 'Villa', bhk: '5+', price: 1200, area: 5500, listingType: 'buy' },
  { city: 'Mumbai', type: 'Commercial', bhk: '4', price: 850, area: 3200, listingType: 'buy' },
  { city: 'Chennai', type: 'Apartment', bhk: '3', price: 72, area: 1550, listingType: 'buy' },
  { city: 'Chennai', type: 'Apartment', bhk: '2', price: 48, area: 1100, listingType: 'buy' },
  { city: 'Chennai', type: 'Villa', bhk: '4', price: 280, area: 3200, listingType: 'buy' },
  { city: 'Chennai', type: 'Independent House', bhk: '3', price: 165, area: 1800, listingType: 'buy' },
  { city: 'Chennai', type: 'Plot', bhk: 'Plot', price: 38, area: 2000, listingType: 'buy' },
  { city: 'Chennai', type: 'Apartment', bhk: '2', price: 0.45, area: 1200, listingType: 'rent', furnished: 'Semi-Furnished' },
  { city: 'Pune', type: 'Apartment', bhk: '2', price: 58, area: 1150, listingType: 'buy' },
  { city: 'Pune', type: 'Apartment', bhk: '3', price: 82, area: 1600, listingType: 'buy' },
  { city: 'Pune', type: 'Villa', bhk: '4', price: 350, area: 3800, listingType: 'buy' },
  { city: 'Pune', type: 'Independent House', bhk: '4', price: 195, area: 2400, listingType: 'buy' },
  { city: 'Pune', type: 'Plot', bhk: 'Plot', price: 32, area: 1800, listingType: 'buy' },
  { city: 'Pune', type: 'Apartment', bhk: '3', price: 0.85, area: 1700, listingType: 'rent', furnished: 'Furnished' },
];

function formatDate(daysAgo: number): string {
  const d = new Date('2026-10-10');
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function generateProperties(): Property[] {
  return seeds.map((s, i) => {
    const localityArr = localities[s.city];
    const locality = localityArr[i % localityArr.length];
    const titleArr = titles[s.type];
    const titleName = s.titleName || titleArr[i % titleArr.length];
    const bedrooms = s.bhk === '5+' ? 5 : s.bhk === 'Plot' ? 0 : parseInt(s.bhk);
    const bathrooms = s.bhk === 'Plot' ? 0 : Math.max(1, Math.ceil(bedrooms * 0.75));
    const balconies = s.bhk === 'Plot' ? 0 : Math.min(2, Math.ceil(bedrooms / 2));
    const rentLabel = s.listingType === 'rent' ? ' for Rent' : '';
    const title = `${titleName}${rentLabel} in ${locality}`;

    return {
      id: `prop-${String(i + 1).padStart(3, '0')}`,
      title,
      type: s.type,
      bhk: s.bhk,
      listingType: s.listingType,
      city: s.city,
      locality,
      price: s.price,
      area: s.area,
      bedrooms,
      bathrooms,
      balconies,
      furnishing: (s.furnished as 'Furnished' | 'Semi-Furnished' | 'Unfurnished') || (['Furnished', 'Semi-Furnished', 'Unfurnished'] as const)[i % 3],
      possession: ['Ready to Move', 'Under Construction', 'Ready to Move', 'Ready to Move'][i % 4],
      age: `${i % 8} Years Old`,
      images: pickImgs(s.type),
      amenities: pickAmenities(s.type),
      description: `This ${s.bhk === 'Plot' ? 'plot' : `${s.bhk} BHK ${s.type.toLowerCase()}`} in ${locality}, ${s.city} offers ${s.area} sqft of ${s.type === 'Plot' ? 'land' : 'premium living space'}. Located in a well-connected neighborhood with excellent infrastructure, close to schools, hospitals, and shopping centres. A rare opportunity for home buyers and investors alike. ${s.type === 'Plot' ? 'The plot is in a gated community with clear title and ready for construction.' : 'The property features modern architecture, high-quality finishes, and ample natural light throughout.'}`,
      featured: i % 5 === 0,
      verified: i % 3 !== 0,
      dateAdded: formatDate(i * 3 + 1),
      offers: baseOffers(s.price),
    };
  });
}

export const properties: Property[] = generateProperties();

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getRelatedProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id && p.city === property.city && p.type === property.type)
    .slice(0, limit);
}
