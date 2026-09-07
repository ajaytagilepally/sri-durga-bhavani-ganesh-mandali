import y2022 from "@/assets/year-2022.jpg";
import y2023 from "@/assets/year-2023.jpg";
import y2024 from "@/assets/year-2024.jpg";
import y2025 from "@/assets/year-2025.jpg";

export interface VideoEntry {
  id: string;
  titleTe: string;
  titleEn: string;
  year: number;
  duration: string;
  thumbnail: string;
  // Full video URL (empty = placeholder; wire real URLs later)
  src?: string;
}

export const videos: VideoEntry[] = [
  { id: "recap-2022", titleTe: "2022 స్మృతులు", titleEn: "Year 1 Recap", year: 2022, duration: "3:12", thumbnail: y2022 },
  { id: "recap-2023", titleTe: "2023 స్మృతులు", titleEn: "Year 2 Recap", year: 2023, duration: "4:05", thumbnail: y2023 },
  { id: "visarjan-2024", titleTe: "2024 నిమజ్జనం", titleEn: "Visarjan 2024", year: 2024, duration: "5:44", thumbnail: y2024 },
  { id: "aarti-2025", titleTe: "మహా ఆరతి 2025", titleEn: "Maha Aarti 2025", year: 2025, duration: "6:21", thumbnail: y2025 },
];
