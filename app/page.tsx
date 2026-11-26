TypeScript 

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight, ShieldCheck, Building2, KeyRound } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { supabase } from "@/lib/supabase";
import type { Property } from "@/lib/types";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function loadProperties() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(12);

      if (!error && data) {
        setProperties(data as Property[]);
      }

      setLoading(false);
    }

    loadProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchText = [
        property.title,
        property.district,
        property.municipality,
        property.property_type
      ].filter(Boolean).join(" ").toLowerCase();

      const matchesKeyword = searchText.includes(keyword.toLowerCase());
      const matchesDistrict = !district ||
        property.district.toLowerCase().includes(district.toLowerCase());
      const matchesType = type === "all" ||
        property.listing_type === type;

      return matchesKeyword && matchesDistrict && matchesType;
    });
  }, [properties, keyword, district, type]);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">NEPAL'S PROPERTY MARKETPLACE</span>

          <h1>
            Find a place
            <br />
            <span>to call home.</span>
          </h1>

          <p>
            Discover properties, connect with agents and explore
            real estate opportunities across Nepal.
          </p>

          <div className="search-panel">
            <div className="search-field">
              <Search size={19} />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search house, land, apartment..."
              />
            </div>

            <div className="search-field">
              <MapPin size={19} />
              <input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="District e.g. Banke"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Property listing type"
            >
              <option value="all">Buy or Rent</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>

            <button
              onClick={() =>
                document.getElementById("properties")?.scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              Search
            </button>
          </div>

          <div className="hero-trust">
            <span><ShieldCheck size={16} /> Property marketplace</span>
            <span><MapPin size={16} /> Across Nepal</span>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE MEROKOTHAA</span>
            <h2>Everything property, in one place.</h2>
          </div>
        </div>

        <div className="service-grid">
          <Link href="/?type=sale" className="service-card">
            <Building2 size={27} />
            <h3>Buy Property</h3>
            <p>Find houses, land and apartments.</p>
            <ArrowRight size={18} />
          </Link>

          <Link href="/?type=rent" className="service-card">
            <KeyRound size={27} />
            <h3>Rent Property</h3>
            <p>Discover your next place to live.</p>
            <ArrowRight size={18} />
          </Link>

          <Link href="/dashboard" className="service-card">
            <MapPin size={27} />
            <h3>List Property</h3>
            <p>Publish your property listing.</p>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="properties-section" id="properties">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LATEST LISTINGS</span>
            <h2>Explore properties</h2>
            <p>Find available properties across Nepal.</p>
          </div>
          <Link href="/dashboard" className="view-all">
            List your property <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <p className="status-message">Loading properties...</p>
        ) : filteredProperties.length > 0 ? (
          <div className="listing-grid">
            {filteredProperties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🏡</span>
            <h3>No properties found</h3>
            <p>
              {properties.length === 0
                ? "Property listings will appear here after they are published."
                : "Try another keyword or district."}
            </p>
            <Link href="/dashboard" className="post-button">
              + Add a Property
            </Link>
          </div>
        )}
      </section>

      <section className="owner-banner">
        <div>
          <span className="eyebrow">FOR PROPERTY OWNERS</span>
          <h2>Have a property to sell or rent?</h2>
          <p>Reach people looking for properties across Nepal.</p>
        </div>
        <Link href="/dashboard" className="banner-button">
          Post Your Property <ArrowRight size={17} />
        </Link>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-icon"><Building2 size={20} /></span>
          <span>Mero<span className="brand-highlight">Kothaa</span></span>
        </div>
        <p>© {new Date().getFullYear()} MeroKothaa. Nepal Property Marketplace.</p>
        <p>Buy · Sell · Rent · Manage</p>
      </footer>
    </main>
  );
}
