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
<<<<<<< HEAD
  "GroupPhoto",
  "Everyone",
  "Evening",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
] as const;

=======
] as const;
>>>>>>> 15dbc36 (Updated)
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
<<<<<<< HEAD
  {
    src: y2022,
    year: 2022,
    category: "Sthapana",
    captionTe: "మొదటి ప్రతిష్ఠ",
    captionEn: "First Sthapana",
    aspect: "landscape",
  },

  // {
  //   src: hero,
  //   year: 2022,
  //   category: "Sthapana",
  //   captionTe: "మొదటి ప్రతిష్ఠ",
  //   captionEn: "First Sthapana",
  //   aspect: "landscape",
  // },

  {
    src: "/gallery/2022/ganesh-2022-02.jpg",
    year: 2022,
    category: "Aarti",
    captionTe: "సాయంత్రం ఆరతి",
    captionEn: "Evening Aarti",
    aspect: "landscape",
  },

  // 2022 Group Photo
  {
    src: "/gallery/2022/ganesh-2022-03.jpg",
    year: 2022,
    category: "Everyone",
    captionTe: "సభ్యులు",
    captionEn: "Members",
    aspect: "landscape",
  },
  {
    src: "/gallery/2022/ganesh-2022-01.jpg",
    year: 2022,
    category: "Evening",
    captionTe: "2022",
    captionEn: "2022",
    aspect: "landscape",
  },

  // 2023

  // {
  //   src: y2023,
  //   year: 2023,
  //   category: "Aarti",
  //   captionTe: "సముదాయ ఆరతి",
  //   captionEn: "Community Aarti",
  //   aspect: "landscape",
  // },

  {
    src: "/gallery/2023/ganesh-2023-02.jpg",
    year: 2023,
    category: "GroupPhoto",
    captionTe: "సమూహ చిత్రం",
    captionEn: "Group Photo",
    aspect: "landscape",
  },
  {
    src: "/gallery/2023/ganesh-2023-01.jpg",
    year: 2023,
    category: "A",
    captionTe: "2023",
    captionEn: "2023",
    aspect: "landscape",
  },
  {
    src: "/gallery/2023/ganesh-2023-03.jpg",
    year: 2023,
    category: "B",
    captionTe: "2023",
    captionEn: "2023",
    aspect: "landscape",
  },
  {
    src: "/gallery/2023/ganesh-2023-04.jpg",
    year: 2023,
    category: "C",
    captionTe: "2023",
    captionEn: "2023",
    aspect: "landscape",
  },

  // 2024

  {
    src: "/gallery/2024/ganesh-2024-01.jpg",
    year: 2024,
    category: "Visarjan",
    captionTe: "శోభాయాత్ర",
    captionEn: "Grand Procession",
    aspect: "landscape",
  },
  {
    src: "/gallery/2024/ganesh-2024-02.jpg",
    year: 2024,
    category: "D",
    captionTe: "2024",
    captionEn: "2024",
    aspect: "landscape",
  },
  {
    src: "/gallery/2024/ganesh-2024-03.jpg",
    year: 2024,
    category: "E",
    captionTe: "2024",
    captionEn: "2024",
    aspect: "landscape",
  },
  {
    src: "/gallery/2024/ganesh-2024-04.jpg",
    year: 2024,
    category: "F",
    captionTe: "2024",
    captionEn: "2024",
    aspect: "landscape",
  },

  // 2025

  // {
  //   src: y2025,
  //   year: 2025,
  //   category: "Decoration",
  //   captionTe: "పండాలం అలంకరణ",
  //   captionEn: "Pandal Decoration",
  //   aspect: "landscape",
  // },
  {
    src: "/gallery/2025/ganesh-2025-01.jpg",
    year: 2025,
    category: "G",
    captionTe: "2025",
    captionEn: "2025",
    aspect: "landscape",
  },
  {
    src: "/gallery/2025/ganesh-2025-02.jpg",
    year: 2025,
    category: "H",
    captionTe: "2025",
    captionEn: "2025",
    aspect: "landscape",
  },

  // 2026

  {
    src: y2026,
    year: 2026,
    category: "Cultural",
    captionTe: "సాంస్కృతిక వేదిక",
    captionEn: "Cultural Stage",
    aspect: "landscape",
  },

  {
    src: y2023,
    year: 2023,
    category: "Annadanam",
    captionTe: "అన్నదానం",
    captionEn: "Feeding the Community",
    aspect: "portrait",
  },

  {
    src: y2024,
    year: 2024,
    category: "Aarti",
    captionTe: "పవిత్ర క్షణం",
    captionEn: "A Sacred Moment",
    aspect: "portrait",
  },

  {
    src: y2025,
    year: 2025,
    category: "Decoration",
    captionTe: "గోల్డెన్ లైట్స్",
    captionEn: "Golden Lights",
    aspect: "portrait",
  },
=======
  { src: y2022, year: 2022, category: "Sthapana", captionTe: "మొదటి ప్రతిష్ఠ", captionEn: "First Sthapana", aspect: "landscape" },
  { src: hero, year: 2022, category: "Aarti", captionTe: "సాయంత్రం ఆరతి", captionEn: "Evening Aarti", aspect: "landscape" },
  { src: y2023, year: 2023, category: "Aarti", captionTe: "సముదాయ ఆరతి", captionEn: "Community Aarti", aspect: "landscape" },
  { src: y2024, year: 2024, category: "Visarjan", captionTe: "శోభాయాత్ర", captionEn: "Grand Procession", aspect: "landscape" },
  { src: y2025, year: 2025, category: "Decoration", captionTe: "పండాలం అలంకరణ", captionEn: "Pandal Decoration", aspect: "landscape" },
  { src: y2026, year: 2026, category: "Cultural", captionTe: "సాంస్కృతిక వేదిక", captionEn: "Cultural Stage", aspect: "landscape" },
  { src: y2023, year: 2023, category: "Annadanam", captionTe: "అన్నదానం", captionEn: "Feeding the Community", aspect: "portrait" },
  { src: y2024, year: 2024, category: "Aarti", captionTe: "పవిత్ర క్షణం", captionEn: "A Sacred Moment", aspect: "portrait" },
  { src: y2025, year: 2025, category: "Decoration", captionTe: "గోల్డెన్ లైట్స్", captionEn: "Golden Lights", aspect: "portrait" },
>>>>>>> 15dbc36 (Updated)
];
