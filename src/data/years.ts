import y2022 from "@/assets/year-2022.jpg";
import y2023 from "@/assets/year-2023.jpg";
import y2024 from "@/assets/year-2024.jpg";
import y2025 from "@/assets/year-2025.jpg";
import y2026 from "@/assets/year-2026.jpg";

export interface YearEntry {
  year: number;

  yearLabelTe: string;
  yearLabelEn: string;

  titleTe: string;
  titleEn: string;

  descriptionTe: string;
  descriptionEn: string;

  cover: string;

  photos: number;
  videos: number;

  upcoming?: boolean;
}

export const years: YearEntry[] = [
  {
    year: 2022,

    yearLabelTe: "మొదటి సంవత్సరం",
    yearLabelEn: "Year 1",

    titleTe: "ప్రారంభం",
    titleEn: "The Beginning",

    descriptionTe:
      "మా ప్రయాణం ఇక్కడ ప్రారంభమైంది. సాధారణమైన పండాలం, పవిత్రమైన భక్తి మరియు విశ్వాసంతో నిండిన హృదయాలతో ఈ వేడుకకు శ్రీకారం చుట్టాము.",

    descriptionEn:
      "Our journey began here with a simple pandal, pure devotion, and hearts full of faith.",

    cover: y2022,

    photos: 0,
    videos: 0,
  },

  {
    year: 2023,

    yearLabelTe: "రెండవ సంవత్సరం",
    yearLabelEn: "Year 2",

    titleTe: "కలిసి ఎదిగాము",
    titleEn: "Growing Together",

    descriptionTe:
      "మా బృందం మరింత విస్తరించింది. సాంస్కృతిక కార్యక్రమాలు, మొదటి అన్నదానం మరియు భక్తుల కుటుంబంతో కలిసి మా వేడుక మరింత పెద్దదైంది.",

    descriptionEn:
      "Our team grew stronger with cultural evenings, our first Annadanam, and a growing family of devotees.",

    cover: y2023,

    photos: 0,
    videos: 0,
  },

  {
    year: 2024,

    yearLabelTe: "మూడవ సంవత్సరం",
    yearLabelEn: "Year 3",

    titleTe: "ఐక్యతతో బలంగా",
    titleEn: "Stronger Together",

    descriptionTe:
      "మరింత గంభీరమైన అలంకరణలు, పెద్ద ఊరేగింపు మరియు మరింత మంది భక్తులతో మా ఉత్సవం కొత్త స్థాయికి చేరుకుంది. మా ఐక్యతే మా గొప్ప బలం అయింది.",

    descriptionEn:
      "With grander decorations, a larger procession, and more devotees, our celebration reached new heights. Our unity became our greatest strength.",

    cover: y2024,

    photos: 0,
    videos: 0,
  },

  {
    year: 2025,

    yearLabelTe: "నాలుగవ సంవత్సరం",
    yearLabelEn: "Year 4",

    titleTe: "సంప్రదాయంగా మారింది",
    titleEn: "A Tradition We Built",

    descriptionTe:
      "మా ఉత్సవం ఒక అందమైన సంప్రదాయంగా మారింది. ప్రతి సంవత్సరం భక్తులు, కుటుంబాలు మరియు స్వచ్ఛంద సేవకులు కలిసి ఈ వేడుకను మరింత ప్రత్యేకంగా తీర్చిదిద్దారు.",

    descriptionEn:
      "Our celebration became a beautiful tradition, bringing devotees, families, and volunteers together every year.",

    cover: y2025,

    photos: 0,
    videos: 0,
  },

  {
    year: 2026,

    yearLabelTe: "ఐదవ సంవత్సరం",
    yearLabelEn: "Year 5",

    titleTe: "వేడుక కొనసాగుతోంది",
    titleEn: "The Celebration Continues",

    descriptionTe:
      "మా ఐదవ వార్షికోత్సవ వేడుక. ఐదేళ్ల భక్తి, ఐక్యత మరియు అనుబంధాన్ని మరింత వైభవంగా జరుపుకుంటున్నాము.",

    descriptionEn:
      "Our fifth anniversary celebration — our grandest year yet, celebrating five years of devotion, unity, and togetherness.",

    cover: y2026,

    photos: 0,
    videos: 0,

    upcoming: true,
  },
];
