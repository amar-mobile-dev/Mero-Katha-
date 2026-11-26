
import Link from "next/link";
import { BedDouble, Bath, MapPin, Maximize } from "lucide-react";
import type { Property } from "@/lib/types";

export default function ListingCard({
  property
}: {
  property: Property;
}) {
  const image = property.images?.[0];

  return (
    <article className="listing-card">
      <Link href={`/properties/${property.id}`}>
        <div className="listing-image">
          {image ? (
            <img src={image} alt={property.title} />
          ) : (
            <div className="image-placeholder">
              <span>🏠</span>
              <small>MeroKothaa Property</small>
            </div>
          )}

          <span className="listing-badge">
            {property.listing_type === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>
      </Link>

      <div className="listing-content">
        <div className="property-price">
          रु {Number(property.price).toLocaleString("en-IN")}
          {property.listing_type === "rent" && property.price_period
            ? ` / ${property.price_period}`
            : ""}
        </div>

        <Link href={`/properties/${property.id}`}>
          <h3>{property.title}</h3>
        </Link>

        <p className="property-location">
          <MapPin size={15} />
          {property.municipality
            ? `${property.municipality}, `
            : ""}
          {property.district}
        </p>

        <div className="property-features">
          {property.bedrooms !== null && (
            <span><BedDouble size={15} /> {property.bedrooms} Beds</span>
          )}
          {property.bathrooms !== null && (
            <span><Bath size={15} /> {property.bathrooms} Baths</span>
          )}
          {property.area_sqft !== null && (
            <span><Maximize size={15} /> {property.area_sqft} sqft</span>
          )}
        </div>
      </div>
    </article>
  );
}
