import y2022 from "@/assets/year-2022.jpg";
import y2023 from "@/assets/year-2023.jpg";
import y2024 from "@/assets/year-2024.jpg";
import y2025 from "@/assets/year-2025.jpg";
import y2026 from "@/assets/year-2026.jpg";
import hero from "@/assets/hero-ganesha.jpg";

export const galleryCategories = [
  "All",
  "Sthapana",
  "Decoration",
  "Aarti",
  "Annadanam",
  "Cultural",
  "Visarjan",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  src: string;
  year: number;
  category: Exclude<GalleryCategory, "All">;
  captionTe: string;
  captionEn: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const galleryItems: GalleryItem[] = [
  { src: y2022, year: 2022, category: "Sthapana", captionTe: "మొదటి ప్రతిష్ఠ", captionEn: "First Sthapana", aspect: "landscape" },
  { src: hero, year: 2022, category: "Aarti", captionTe: "సాయంత్రం ఆరతి", captionEn: "Evening Aarti", aspect: "landscape" },
  { src: y2023, year: 2023, category: "Aarti", captionTe: "సముదాయ ఆరతి", captionEn: "Community Aarti", aspect: "landscape" },
  { src: y2024, year: 2024, category: "Visarjan", captionTe: "శోభాయాత్ర", captionEn: "Grand Procession", aspect: "landscape" },
  { src: y2025, year: 2025, category: "Decoration", captionTe: "పండాలం అలంకరణ", captionEn: "Pandal Decoration", aspect: "landscape" },
  { src: y2026, year: 2026, category: "Cultural", captionTe: "సాంస్కృతిక వేదిక", captionEn: "Cultural Stage", aspect: "landscape" },
  { src: y2023, year: 2023, category: "Annadanam", captionTe: "అన్నదానం", captionEn: "Feeding the Community", aspect: "portrait" },
  { src: y2024, year: 2024, category: "Aarti", captionTe: "పవిత్ర క్షణం", captionEn: "A Sacred Moment", aspect: "portrait" },
  { src: y2025, year: 2025, category: "Decoration", captionTe: "గోల్డెన్ లైట్స్", captionEn: "Golden Lights", aspect: "portrait" },
];
