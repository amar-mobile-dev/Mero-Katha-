typescript 

export type Property = {
  id: string;
  title: string;
  description: string | null;
  listing_type: "rent" | "sale";
  property_type: string;
  price: number;
  price_period: string | null;
  province: string;
  district: string;
  municipality: string | null;
  address: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  land_area: string | null;
  latitude: number | null;
  longitude: number | null;
  images: string[] | null;
  status: string;
  created_at: string;
  owner_id: string;
};
