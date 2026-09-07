export interface Memory {
  quoteTe?: string;
  quoteEn: string;
  attribution?: string;
}

export const memories: Memory[] = [
  {
    quoteTe: "మొదటి సంవత్సరంలో ఇది ఒక సంప్రదాయమవుతుందని ఊహించలేదు.",
    quoteEn: "In our first year, we never imagined this would become our tradition.",
  },

  {
    quoteTe: "ప్రతి సంవత్సరం మా గణేష్ కుటుంబం పెద్దదవుతూ ఉంది.",
    quoteEn: "Every year our Ganesh family grew bigger.",
  },

  {
    quoteTe: "మేము ఏడాదంతా ఎదురుచూసే పదకొండు రోజులు.",
    quoteEn: "Eleven days that we wait an entire year to experience again.",
  },

  {
    quoteTe: "పండాలం మాకు రెండవ ఇల్లుగా మారింది.",
    quoteEn: "The pandal became a second home for all of us.",
  },
];

export interface Stat {
  value: string;
  labelTe: string;
  labelEn: string;
}

export const stats: Stat[] = [
  {
    value: "5",
    labelTe: "సంవత్సరాలు",
    labelEn: "Years Together",
  },

  {
    value: "44+",
    labelTe: "వేడుక రోజులు",
    labelEn: "Days of Celebration",
  },

  {
    value: "1000+",
    labelTe: "అందమైన స్మృతులు",
    labelEn: "Beautiful Memories",
  },

  {
    value: "100+",
    labelTe: "వాలంటీర్లు",
    labelEn: "Volunteers & Supporters",
  },

  {
    value: "4",
    labelTe: "నిమజ్జన యాత్రలు",
    labelEn: "Visarjan Journeys",
  },

  {
    value: "1",
    labelTe: "కుటుంబం",
    labelEn: "Family",
  },
];

export interface BeforeAfterStep {
  titleTe: string;
  titleEn: string;
  descTe: string;
  descEn: string;
}

export const beforeAfterSteps: BeforeAfterStep[] = [
  {
    titleTe: "ఖాళీ స్థలం",
    titleEn: "Empty Space",

    descTe: "అంతా ఒక ఆలోచనతో మొదలవుతుంది.",

    descEn: "Everything begins with an idea.",
  },

  {
    titleTe: "ప్రణాళిక",
    titleEn: "Planning",

    descTe: "బృందం కలిసి ప్రణాళిక చేస్తుంది.",

    descEn: "Our team comes together and plans everything.",
  },

  {
    titleTe: "అలంకరణ",
    titleEn: "Decoration",

    descTe: "పండాలం అందమైన రూపాన్ని సంతరించుకుంటుంది.",

    descEn: "The pandal begins to take shape.",
  },

  {
    titleTe: "గణేష్ ఆగమనం",
    titleEn: "Ganesha Arrives",

    descTe: "పవిత్రమైన స్థాపనతో వేడుక ప్రారంభమవుతుంది.",

    descEn: "The celebration begins with the sacred arrival and installation of Ganesha.",
  },

  {
    titleTe: "11 రోజుల వేడుక",
    titleEn: "11 Days of Devotion",

    descTe: "పదకొండు రోజుల పాటు భక్తి, పూజలు మరియు పండుగ ఉత్సాహం కొనసాగుతుంది.",

    descEn: "Eleven days filled with devotion, rituals, prayers, and celebration.",
  },

  {
    titleTe: "నిమజ్జనం",
    titleEn: "Visarjan",

    descTe: "గణపతి బప్పా మోరియా! వచ్చే సంవత్సరం మళ్లీ రండి.",

    descEn: "Ganpati Bappa Morya! Until we meet again next year.",
  },
];
