/* eslint-disable no-irregular-whitespace */
// 🔧 Devotional content lives here. Add new categories or items freely.

export type NamaluCategoryKey =
  | "ganapathi"
  | "hanuman"
  | "govinda"
  | "kumkuma"
  | "aarti"
  | "slokas";

export interface NamaluCategory {
  key: NamaluCategoryKey;
  te: string;
  en: string;
}

export interface NamaluItem {
  id: string;
  category: NamaluCategoryKey;
  titleTe: string;
  titleEn: string;
  /** Telugu text (primary). Use \n for line breaks. */
  bodyTe: string;
  /** Optional English text / transliteration. */
  bodyEn?: string;
}

export const namaluCategories: NamaluCategory[] = [
  { key: "ganapathi", te: "గణపతి నామాలు", en: "Ganapathi Namalu" },
  { key: "hanuman", te: "హనుమాన్ చాలీసా", en: "Hanuman Chalisa" },
  { key: "govinda", te: "గోవింద నామాలు", en: "Govinda Namalu" },
  { key: "kumkuma", te: "కుంకుమ అర్చన", en: "Kumkuma Archana" },
  { key: "aarti", te: "గణేష్ ఆరతి", en: "Ganesh Aarti" },
  { key: "slokas", te: "నిత్య పూజ శ్లోకాలు", en: "Daily Pooja Slokas" },
];

export const namaluItems: NamaluItem[] = [
  {
    id: "ganapathi-108",
    category: "ganapathi",
    titleTe: "శ్రీ గణేశ అష్టోత్తర శతనామావళి",
    titleEn: "Sri Ganesha Ashtottara",
    bodyTe: `ఓం గజాననాయ నమః
ఓం గణాధ్యక్షాయ నమః
ఓం విఘ్నారాజాయ నమః
ఓం వినాయకాయ నమః
ఓం ద్త్వెమాతురాయ నమః
ఓం ద్విముఖాయ నమః
ఓం ప్రముఖాయ నమః
ఓం సుముఖాయ నమః
ఓం కృతినే నమః
ఓం సుప్రదీపాయ నమః (10)

ఓం సుఖనిధయే నమః
ఓం సురాధ్యక్షాయ నమః
ఓం సురారిఘ్నాయ నమః
ఓం మహాగణపతయే నమః
ఓం మాన్యాయ నమః
ఓం మహాకాలాయ నమః
ఓం మహాబలాయ నమః
ఓం హేరంబాయ నమః
ఓం లంబజఠరాయ నమః
ఓం హ్రస్వగ్రీవాయ నమః (20)

ఓం మహోదరాయ నమః
ఓం మదోత్కటాయ నమః
ఓం మహావీరాయ నమః
ఓం మంత్రిణే నమః
ఓం మంగళ స్వరాయ నమః
ఓం ప్రమధాయ నమః
ఓం ప్రథమాయ నమః
ఓం ప్రాజ్ఞాయ నమః
ఓం విఘ్నకర్త్రే నమః
ఓం విఘ్నహంత్రే నమః (30)

ఓం విశ్వనేత్రే నమః
ఓం విరాట్పతయే నమః
ఓం శ్రీపతయే నమః
ఓం వాక్పతయే నమః
ఓం శృంగారిణే నమః
ఓం ఆశ్రిత వత్సలాయ నమః
ఓం శివప్రియాయ నమః
ఓం శీఘ్రకారిణే నమః
ఓం శాశ్వతాయ నమః
ఓం బలాయ నమః (40)

ఓం బలోత్థితాయ నమః
ఓం భవాత్మజాయ నమః
ఓం పురాణ పురుషాయ నమః
ఓం పూష్ణే నమః
ఓం పుష్కరోత్షిప్త వారిణే నమః
ఓం అగ్రగణ్యాయ నమః
ఓం అగ్రపూజ్యాయ నమః
ఓం అగ్రగామినే నమః
ఓం మంత్రకృతే నమః
ఓం చామీకర ప్రభాయ నమః (50)

ఓం సర్వాయ నమః
ఓం సర్వోపాస్యాయ నమః
ఓం సర్వ కర్త్రే నమః
ఓం సర్వనేత్రే నమః
ఓం సర్వసిధ్ధి ప్రదాయ నమః
ఓం సర్వ సిద్ధయే నమః
ఓం పంచహస్తాయ నమః
ఓం పార్వతీనందనాయ నమః
ఓం ప్రభవే నమః
ఓం కుమార గురవే నమః (60)

ఓం అక్షోభ్యాయ నమః
ఓం కుంజరాసుర భంజనాయ నమః
ఓం ప్రమోదాయ నమః
ఓం మోదకప్రియాయ నమః
ఓం కాంతిమతే నమః
ఓం ధృతిమతే నమః
ఓం కామినే నమః
ఓం కపిత్థవనప్రియాయ నమః
ఓం బ్రహ్మచారిణే నమః
ఓం బ్రహ్మరూపిణే నమః (70)

ఓం బ్రహ్మవిద్యాది దానభువే నమః
ఓం జిష్ణవే నమః
ఓం విష్ణుప్రియాయ నమః
ఓం భక్త జీవితాయ నమః
ఓం జిత మన్మథాయ నమః
ఓం ఐశ్వర్య కారణాయ నమః
ఓం జ్యాయసే నమః
ఓం యక్షకిన్నెర సేవితాయ నమః
ఓం గంగా సుతాయ నమః
ఓం గణాధీశాయ నమః (80)

ఓం గంభీర నినదాయ నమః
ఓం వటవే నమః
ఓం అభీష్ట వరదాయినే నమః
ఓం జ్యోతిషే నమః
ఓం భక్త నిధయే నమః
ఓం భావగమ్యాయ నమః
ఓం మంగళ ప్రదాయ నమః
ఓం అవ్వక్తాయ నమః
ఓం అప్రాకృత పరాక్రమాయ నమః
ఓం సత్యధర్మిణే నమః (90)

ఓం సఖయే నమః
ఓం సరసాంబు నిధయే నమః
ఓం మహేశాయ నమః
ఓం దివ్యాంగాయ నమః
ఓం మణికింకిణీ మేఖాలాయ నమః
ఓం సమస్తదేవతా మూర్తయే నమః
ఓం సహిష్ణవే నమః
ఓం సతతోత్థితాయ నమః
ఓం విఘాత కారిణే నమః
ఓం విశ్వగ్దృశే నమః (100)

ఓం విశ్వరక్షాకృతే నమః
ఓం కళ్యాణ గురవే నమః
ఓం ఉన్మత్త వేషాయ నమః
ఓం అపరాజితే నమః
ఓం సమస్త జగదాధారాయ నమః
ఓం సర్త్వెశ్వర్యప్రదాయ నమః
ఓం ఆక్రాంత చిదచిత్ప్రభవే నమః
ఓం శ్రీ విఘ్నేశ్వరాయ నమః (108)`,
    bodyEn: `Om Vinayakaya Namah
Om Vighnarajaya Namah
Om Gauriputraya Namah
Om Ganeshvaraya Namah
Om Skandagrajaya Namah
Om Avyayaya Namah
Om Putaya Namah
Om Dakshaya Namah
Om Adhyakshaya Namah
Om Dvijapriyaya Namah
Om Agnigarvacchhide Namah
Om Indrashripradaya Namah
Om Vanipradaya Namah
Om Avyayaya Namah
Om Sarvasiddhipradaya Namah
Om Sarvatanayaya Namah
Om Sharvaripriyaya Namah
Om Sarvatmakaya Namah
Om Srishtikartre Namah
Om Devaya Namah
Om Anekarchitaya Namah
Om Sivaya Namah
Om Shuddhaya Namah
Om Buddhipriyaya Namah
Om Shantaya Namah
Om Brahmacharine Namah
Om Gajananaya Namah
Om Dvaimaturaya Namah
Om Munistutaya Namah
Om Bhaktavighnavinashanaya Namah
Om Ekadantaya Namah
Om Chaturbahave Namah
Om Chaturaya Namah
Om Shaktisamyutaya Namah
Om Lambodaraya Namah
Om Shurpakarnaya Namah
Om Haraye Namah
Om Brahmaviduttamaya Namah
Om Kalaya Namah
Om Grahapataye Namah
Om Kamine Namah
Om Somasuryagnilochanaya Namah
Om Pashankushadharaya Namah
Om Chandaya Namah
Om Gunatitaya Namah
Om Niranjanaya Namah
Om Akalmashaya Namah
Om Svayamsiddhaya Namah
Om Siddharchitapadambujaya Namah
Om Bijapuraphalasaktaya Namah
Om Varadaya Namah
Om Shashvataya Namah
Om Kritine Namah
Om Dvijapriyaya Namah
Om Vitabhayaya Namah
Om Gadine Namah
Om Chakrine Namah
Om Ikshuchapadhrite Namah
Om Shridaya Namah
Om Ajaya Namah
Om Utpalakaraya Namah
Om Shripataye Namah
Om Stutiharshitaya Namah
Om Kuladribhrite Namah
Om Jatilaya Namah
Om Kalikalmashanashanaya Namah
Om Chandrachudamanaye Namah
Om Kantaya Namah
Om Papaharine Namah
Om Samahitaya Namah
Om Ashritaya Namah
Om Shrikaraya Namah
Om Somyaya Namah
Om Bhaktavanchhitadayakaya Namah
Om Shantaya Namah
Om Kaivalyasukhadaya Namah
Om Sacchidanandavigrahaya Namah
Om Jnanine Namah
Om Dayayutaya Namah
Om Dantaya Namah
Om Brahmadveshavivarjitaya Namah
Om Pramattadaityabhayadaya Namah
Om Shrikanthaya Namah
Om Vibudheshvaraya Namah
Om Ramarchitaya Namah
Om Vidhaye Namah
Om Nagarajayajnopavitavate Namah
Om Sthulakanthaya Namah
Om Svayamkartre Namah
Om Samaghoshapriyaya Namah
Om Parasmai Namah
Om Sthulatundaya Namah
Om Agranyaya Namah
Om Dhiraya Namah
Om Vagishaya Namah
Om Siddhidayakaya Namah
Om Durvabilvapriyaya Namah
Om Avyaktamurtaye Namah
Om Adbhutamurtimate Namah
Om Shailendratanujotsanga Khelanotsukamanasaya Namah
Om Svalavanyasudhasarajita Manmathavigrahaya Namah
Om Samastajagadadharaya Namah
Om Mayine Namah
Om Mushikavahanaya Namah
Om Hrishtaya Namah
Om Tushtaya Namah
Om Prasannatmane Namah
Om Sarvasiddhipradayakaya Namah`,
  },
  {
    id: "ganapathi-prarthana",
    category: "ganapathi",
    titleTe: "గణపతి ప్రార్థన",
    titleEn: "Ganapathi Prarthana",
    bodyTe: `శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజం
ప్రసన్నవదనం ధ్యాయేత్ సర్వ విఘ్నోపశాంతయే`,
    bodyEn: `Shuklambaradharam Vishnum Shashivarnam Chaturbhujam
Prasanna Vadanam Dhyayet Sarva Vighnopashantaye`,
  },
  {
    id: "hanuman-chalisa",
    category: "hanuman",
    titleTe: "హనుమాన్ చాలీసా",
    titleEn: "Hanuman Chalisa",
    bodyTe: `దోహా
శ్రీ గురు చరణ సరోజ రజ నిజమన ముకుర సుధారి ।
వరణౌ రఘువర విమలయశ జో దాయక ఫలచారి ॥
బుద్ధిహీన తనుజానికై సుమిరౌ పవన కుమార ।
బల బుద్ధి విద్యా దేహు మోహి హరహు కలేశ వికార ॥

చౌపాఈ
జయ హనుమాన జ్ఞాన గుణ సాగర ।
జయ కపీశ తిహు లోక ఉజాగర ॥ 1 ॥

రామదూత అతులిత బలధామా ।
అంజని పుత్ర పవనసుత నామా ॥ 2 ॥

మహావీర విక్రమ బజరంగీ ।
కుమతి నివార సుమతి కే సంగీ ॥3 ॥

కంచన వరణ విరాజ సువేశా ।
కానన కుండల కుంచిత కేశా ॥ 4 ॥

హాథవజ్ర ఔ ధ్వజా విరాజై । [ఔరు]
కాంధే మూంజ జనేవూ సాజై ॥ 5॥

శంకర సువన కేసరీ నందన । [శంకర స్వయం]
తేజ ప్రతాప మహాజగ వందన ॥ 6 ॥

విద్యావాన గుణీ అతి చాతుర ।
రామ కాజ కరివే కో ఆతుర ॥ 7 ॥

ప్రభు చరిత్ర సునివే కో రసియా ।
రామలఖన సీతా మన బసియా ॥ 8॥

సూక్ష్మ రూపధరి సియహి దిఖావా ।
వికట రూపధరి లంక జలావా ॥ 9 ॥

భీమ రూపధరి అసుర సంహారే ।
రామచంద్ర కే కాజ సంవారే ॥ 10 ॥

లాయ సంజీవన లఖన జియాయే ।
శ్రీ రఘువీర హరషి ఉరలాయే ॥ 11 ॥

రఘుపతి కీన్హీ బహుత బడాయీ (ఈ) ।
తుమ మమ ప్రియ భరత సమ భాయీ ॥ 12 ॥

సహస్ర వదన తుమ్హరో యశగావై ।
అస కహి శ్రీపతి కంఠ లగావై ॥ 13 ॥

సనకాదిక బ్రహ్మాది మునీశా ।
నారద శారద సహిత అహీశా ॥ 14 ॥

యమ కుబేర దిగపాల జహాం తే ।
కవి కోవిద కహి సకే కహాం తే ॥ 15 ॥

తుమ ఉపకార సుగ్రీవహి కీన్హా ।
రామ మిలాయ రాజపద దీన్హా ॥ 16 ॥

తుమ్హరో మంత్ర విభీషణ మానా ।
లంకేశ్వర భయే సబ జగ జానా ॥ 17 ॥

యుగ సహస్ర యోజన పర భానూ ।
లీల్యో తాహి మధుర ఫల జానూ ॥ 18 ॥

ప్రభు ముద్రికా మేలి ముఖ మాహీ ।
జలధి లాంఘి గయే అచరజ నాహీ ॥ 19 ॥

దుర్గమ కాజ జగత కే జేతే ।
సుగమ అనుగ్రహ తుమ్హరే తేతే ॥ 20 ॥

రామ దుఆరే తుమ రఖవారే ।
హోత న ఆజ్ఞా బిను పైసారే ॥ 21 ॥

సబ సుఖ లహై తుమ్హారీ శరణా ।
తుమ రక్షక కాహూ కో డర నా ॥ 22 ॥

ఆపన తేజ సమ్హారో ఆపై ।
తీనోం లోక హాంక తే కాంపై ॥ 23 ॥

భూత పిశాచ నికట నహి ఆవై ।
మహవీర జబ నామ సునావై ॥ 24 ॥

నాసై రోగ హరై సబ పీరా ।
జపత నిరంతర హనుమత వీరా ॥ 25 ॥

సంకట సే హనుమాన ఛుడావై ।
మన క్రమ వచన ధ్యాన జో లావై ॥ 26 ॥

సబ పర రామ తపస్వీ రాజా ।
తినకే కాజ సకల తుమ సాజా ॥ 27 ॥

ఔర మనోరథ జో కోయి లావై ।
తాసు అమిత జీవన ఫల పావై ॥ 28 ॥

చారో యుగ ప్రతాప తుమ్హారా ।
హై పరసిద్ధ జగత ఉజియారా ॥ 29 ॥

సాధు సంత కే తుమ రఖవారే ।
అసుర నికందన రామ దులారే ॥ 30 ॥

అష్టసిద్ధి నవ నిధి కే దాతా ।
అస వర దీన్హ జానకీ మాతా ॥ 31 ॥

రామ రసాయన తుమ్హారే పాసా ।
సదా రహో రఘుపతి కే దాసా ॥ 32 ॥ [సాద రహో]

తుమ్హరే భజన రామకో పావై ।
జన్మ జన్మ కే దుఖ బిసరావై ॥ 33 ॥

అంత కాల రఘుపతి పురజాయీ । [రఘువర]
జహాం జన్మ హరిభక్త కహాయీ ॥ 34 ॥

ఔర దేవతా చిత్త న ధరయీ ।
హనుమత సేయి సర్వ సుఖ కరయీ ॥ 35 ॥

సంకట క(హ)టై మిటై సబ పీరా ।
జో సుమిరై హనుమత బల వీరా ॥ 36 ॥

జై జై జై హనుమాన గోసాయీ ।
కృపా కరహు గురుదేవ కీ నాయీ ॥ 37 ॥

యహ శత వార పాఠ కర కోయీ । [జో]
ఛూటహి బంది మహా సుఖ హోయీ ॥ 38 ॥

జో యహ పడై హనుమాన చాలీసా ।
హోయ సిద్ధి సాఖీ గౌరీశా ॥ 39 ॥

తులసీదాస సదా హరి చేరా ।
కీజై నాథ హృదయ మహ డేరా ॥ 40 ॥

దోహా
పవన తనయ సంకట హరణ - మంగళ మూరతి రూప్ ।
రామ లఖన సీతా సహిత - హృదయ బసహు సురభూప్ ॥
సియావర రామచంద్రకీ జయ । పవనసుత హనుమానకీ జయ । `,
    bodyEn: `Doha

Shri Guru Charan Sarooja-raj Nija manu Mukura Sudhaari
Baranau Rahubhara Bimala Yasha Jo Dayaka Phala Chari
Budhee-Heen Thanu Jannikay Sumirow Pavana Kumara
Bala-Budhee Vidya Dehoo Mohee Harahu Kalesha Vikaara

Chopai

1.Jai Hanuman gyan gun sagar||
Jai Kapis tihun lok ujagar||
2.Ram doot atulit bal dhama|
Anjaani-putra Pavan sut nama||
3.Mahabir Bikram Bajrangi|
Kumati nivar sumati Ke sangi||
4.Kanchan varan viraj subesa|
Kanan Kundal Kunchit Kesha||
5.Hath Vajra Aur Dhuvaje Viraje|
Kaandhe moonj janehu sajai||
6.Sankar suvan kesri Nandan|
Tej prataap maha jag vandan||
7.Vidyavaan guni ati chatur|
Ram kaj karibe ko aatur||
8.Prabu charitra sunibe-ko rasiya|
Ram Lakhan Sita man Basiya||
9.Sukshma roop dhari Siyahi dikhava|
Vikat roop dhari lank jarava||
10.Bhima roop dhari asur sanghare|
Ramachandra ke kaj sanvare||
11.Laye Sanjivan Lakhan Jiyaye|
Shri Raghuvir Harashi ur laye||
12.Raghupati Kinhi bahut badai|
Tum mam priye Bharat-hi-sam bhai||
13.Sahas badan tumharo jash gaave|
Asa-kahi Shripati kanth lagaave||
14.Sankadhik Brahmaadi Muneesa|
Narad-Sarad sahit Aheesa||
15.Jam Kuber Digpaal Jahan te|
Kavi kovid kahi sake kahan te||
16.Tum upkar Sugreevahin keenha|
Ram milaye rajpad deenha||
17.Tumharo mantra Vibheeshan maana|
Lankeshwar Bhaye Sub jag jana||
18.Jug sahastra jojan par Bhanu|
Leelyo tahi madhur phal janu||
19.Prabhu mudrika meli mukh mahee|
Jaladhi langhi gaye achraj nahee||
20.Durgaam kaj jagath ke jete|
Sugam anugraha tumhre tete||
21.Ram dwaare tum rakhvare|
Hoat na agya binu paisare||
22.Sub sukh lahae tumhari sar na|
Tum rakshak kahu ko dar naa||
23.Aapan tej samharo aapai|
Teenhon lok hank te kanpai||
24.Bhoot pisaach Nikat nahin aavai|
Mahavir jab naam sunavae||
25.Nase rog harae sab peera|
Japat nirantar Hanumant beera||
26.Sankat se Hanuman chudavae|
Man Karam Vachan dyan jo lavai||
27.Sab par Ram tapasvee raja|
Tin ke kaj sakal Tum saja||
28.Aur manorath jo koi lavai|
Sohi amit jeevan phal pavai||
29.Charon Yug partap tumhara|
Hai persidh jagat ujiyara||
30.Sadhu Sant ke tum Rakhware|
Asur nikandan Ram dulhare||
31.Ashta-sidhi nav nidhi ke dhata|
As-var deen Janki mata||
32.Ram rasayan tumhare pasa|
Sada raho Raghupati ke dasa||
33.Tumhare bhajan Ram ko pavai|
Janam-janam ke dukh bisraavai||
34.Anth-kaal Raghuvir pur jayee|
Jahan janam Hari-Bakht Kahayee||
35.Aur Devta Chit na dharehi|
Hanumanth se hi sarve sukh karehi||
36.Sankat kate-mite sab peera|
Jo sumirai Hanumat Balbeera||
37.Jai Jai Jai Hanuman Gosahin|
Kripa Karahu Gurudev ki nyahin||
38.Jo sat bar path kare kohi|
Chutehi bandhi maha sukh hohi||
39.Jo yah padhe Hanuman Chalisa|
Hoye siddhi sakhi Gaureesa||
40.Tulsidas sada hari chera|
Keejai Nath Hridaye mein dera||

Doha

Pavan Tanay Sankat Harana|
Mangala Murati Roop||
Ram Lakhan Sita Sahita|
Hriday Basahu Soor Bhoop||`,
  },
  {
    id: "govinda-namalu",
    category: "govinda",
    titleTe: "గోవింద నామాలు",
    titleEn: "Govinda Namalu",
    bodyTe: `శ్రీ శ్రీనివాసా గోవిందా శ్రీ వేంకటేశా గోవిందా
భక్తవత్సలా గోవిందా భాగవతప్రియ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 1 ॥

నిత్యనిర్మలా గోవిందా నీలమేఘశ్యామ గోవిందా
పురాణపురుషా గోవిందా పుండరీకాక్ష గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 2 ॥

నందనందనా గోవిందా నవనీతచోరా గోవిందా
పశుపాలక శ్రీ గోవిందా పాపవిమోచన గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 3 ॥

దుష్టసంహార గోవిందా దురితనివారణ గోవిందా
శిష్టపరిపాలక గోవిందా కష్టనివారణ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 4 ॥

వజ్రమకుటధర గోవిందా వరాహమూర్తివి గోవిందా
గోపీజనప్రియ గోవిందా గోవర్ధనోద్ధార గోవిందా [గోపీజనలోల]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 5 ॥

దశరథనందన గోవిందా దశముఖమర్దన గోవిందా
పక్షివాహనా గోవిందా పాండవప్రియ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 6 ॥

మత్స్యకూర్మ గోవిందా మధుసూధన హరి గోవిందా
వరాహ నరసింహ గోవిందా వామన భృగురామ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 7 ॥

బలరామానుజ గోవిందా బౌద్ధ కల్కిధర గోవిందా
వేణుగానప్రియ గోవిందా వేంకటరమణా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 8 ॥

సీతానాయక గోవిందా శ్రితపరిపాలక గోవిందా
శ్రితజనపోషక గోవిందా ధర్మసంస్థాపక గోవిందా [దరిద్రజన పోషక]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 9 ॥

అనాథరక్షక గోవిందా ఆపద్భాందవ గోవిందా
భక్తవత్సలా గోవిందా కరుణాసాగర గోవిందా [శరణాగతవత్సల]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 10 ॥

కమలదళాక్ష గోవిందా కామితఫలదాత గోవిందా
పాపవినాశక గోవిందా పాహి మురారే గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 11 ॥

శ్రీ ముద్రాంకిత గోవిందా శ్రీ వత్సాంకిత గోవిందా
ధరణీనాయక గోవిందా దినకరతేజా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 12 ॥

పద్మావతీప్రియ గోవిందా ప్రసన్నమూర్తీ గోవిందా
అభయహస్త గోవిందా మత్స్యావతార గోవిందా [ప్రదర్శక]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 13 ॥

శంఖచక్రధర గోవిందా శార్​ఙ్గగదాధర గోవిందా
విరాజాతీర్ధస్థ గోవిందా విరోధిమర్ధన గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 14 ॥

సాలగ్రామ[ధర] గోవిందా సహస్రనామా గోవిందా
లక్ష్మీవల్లభ గోవిందా లక్ష్మణాగ్రజ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 15 ॥

కస్తూరితిలక గోవిందా కనకాంబరధర గోవిందా [కాంచనాంబరధర]
గరుడవాహనా గోవిందా గజరాజ రక్షక గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 16 ॥

వానరసేవిత గోవిందా వారధిబంధన గోవిందా
ఏకస్వరూప గోవిందా రామకృష్ణా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 17 ॥

భక్తనందన గోవిందా ప్రత్యక్షదేవా గోవిందా
పరమదయాకర గోవిందా వజ్రకవచధర గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 18 ॥

వైజయంతిమాల గోవిందా వడ్డికాసుల గోవిందా
వసుదేవసుత గోవిందా శ్రీవాసుదేవ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 19 ॥

నిత్యకళ్యాణ గోవిందా నీరజనాభ గోవిందా
నీలాద్రివాస గోవిందా నీలమేఘశ్యామ గోవిందా [క్షీరాబ్ఢివాస]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 20 ॥

స్వయం ప్రకాశ గోవిందా ఆనందనిలయ గోవిందా
శ్రీదేవినాథ గోవిందా దేవకి నందన గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 21 ॥

తిరుమలవాస గోవిందా రత్నకిరీట గోవిందా
ఆశ్రితపక్ష గోవిందా నిత్యశుభప్రద గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 22 ॥

ఆనందరూప గోవిందా ఆద్యంతరహిత గోవిందా
ఇహపర దాయక గోవిందా ఇభరాజ రక్షక గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 23 ॥

పద్మదలాక్ష గోవిందా తిరుమలనిల్య గోవిందా
శేషశాయినీ గోవిందా శేషాద్రినిలయ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 24 ॥

వరాహ ౠప గోవిందా శ్రీ కూర్మరూప గోవిందా
వామనౠప గోవిందా నరహరిరూప గోవిందా [హరిహరౠప]
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 25 ॥

శ్రీ పరశురామ గోవిందా శ్రీ బలరామ గోవిందా
రఘుకుల రామ గోవిందా శ్రీ రామకృష్ణ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 26 ॥

తిరుమలనాయక గోవిందా శ్రితజనపోషక గోవిందా
శ్రీదేవినాథ గోవిందా శ్రీవత్సాంకిత గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 27 ॥

గోవిందానామ గోవిందా వేంకటరమణా గోవిందా
క్షేత్రపాలక గోవిందా తిరుమలనాథ గోవిందా ।
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 28 ॥

వానరసేవిత గోవిందా వారధిబంధన గోవిందా
ఏడుకొండలవాడ గోవిందా ఏకత్వరూపా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 29 ॥

శ్రీ రామకృష్ణ గోవిందా రఘుకుల నందన గోవిందా
ప్రత్యక్షదేవా గోవిందా పరమదయాకర గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 30 ॥

వజ్రకవచధర గోవిందా వైజయంతిమాల గోవిందా
వడ్డికాసులవాడ గోవిందా వసుదేవతనయా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 31 ॥

బిల్వపత్రార్చిత గోవిందా భిక్షుక సంస్తుత గోవిందా
స్త్రీపుంసరూపా గోవిందా శివకేశవమూర్తి గోవిందా
బ్రహ్మాండరూపా గోవిందా భక్తరక్షక గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 32 ॥

నిత్యకళ్యాణ గోవిందా నీరజనాభ గోవిందా
హాతీరామప్రియ గోవిందా హరి సర్వోత్తమ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 33 ॥

జనార్ధనమూర్తి గోవిందా జగత్సాక్షిరూపా గోవిందా
అభిషేకప్రియ గోవిందా ఆపన్నివారణ గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 34 ॥

రత్నకిరీటా గోవిందా రామానుజనుత గోవిందా
స్వయంప్రకాశా గోవిందా ఆశ్రితపక్ష గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 35 ॥

నిత్యశుభప్రద గోవిందా నిఖిలలోకేశా గోవిందా
ఆనందరూపా గోవిందా ఆద్యంతరహితా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 36 ॥

ఇహపర దాయక గోవిందా ఇభరాజ రక్షక గోవిందా
పరమదయాళో గోవిందా పద్మనాభహరి గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 37 ॥

తిరుమలవాసా గోవిందా తులసీవనమాల గోవిందా
శేషాద్రినిలయా గోవిందా శేషసాయినీ గోవిందా
శ్రీ శ్రీనివాసా గోవిందా శ్రీ వేంకటేశా గోవిందా
గోవిందా హరి గోవిందా గోకులనందన గోవిందా [వేంకటరమణ గోవిందా] ॥ 38 ।`,
    bodyEn: `śrī śrīnivāsā gōvindā śrī vēṅkaṭēśā gōvindā
bhaktavatsalā gōvindā bhāgavatapriya gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 1 ॥

nityanirmalā gōvindā nīlamēghaśyāma gōvindā
purāṇapuruṣā gōvindā puṇḍarīkākṣa gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 2 ॥

nandanandanā gōvindā navanītachōrā gōvindā
paśupālaka śrī gōvindā pāpavimōchana gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 3 ॥

duṣṭasaṃhāra gōvindā duritanivāraṇa gōvindā
śiṣṭaparipālaka gōvindā kaṣṭanivāraṇa gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 4 ॥

vajramakuṭadhara gōvindā varāhamūrtivi gōvindā
gōpījanapriya gōvindā gōvardhanōddhāra gōvindā [gōpījanalōla]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 5 ॥

daśarathanandana gōvindā daśamukhamardana gōvindā
pakṣivāhanā gōvindā pāṇḍavapriya gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 6 ॥

matsyakūrma gōvindā madhusūdhana hari gōvindā
varāha narasiṃha gōvindā vāmana bhṛgurāma gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 7 ॥

balarāmānuja gōvindā bauddha kalkidhara gōvindā
vēṇugānapriya gōvindā vēṅkaṭaramaṇā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 8 ॥

sītānāyaka gōvindā śritaparipālaka gōvindā
śritajanapōṣaka gōvindā dharmasaṃsthāpaka gōvindā [daridrajana pōṣaka]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 9 ॥

anātharakṣaka gōvindā āpadbhāndava gōvindā
bhaktavatsalā gōvindā karuṇāsāgara gōvindā [śaraṇāgatavatsala]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 10 ॥

kamaladaḻākṣa gōvindā kāmitaphaladāta gōvindā
pāpavināśaka gōvindā pāhi murārē gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 11 ॥

śrī mudrāṅkita gōvindā śrī vatsāṅkita gōvindā
dharaṇīnāyaka gōvindā dinakaratējā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 12 ॥

padmāvatīpriya gōvindā prasannamūrtī gōvindā
abhayahasta gōvindā matsyāvatāra gōvindā [pradarśaka]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 13 ॥

śaṅkhachakradhara gōvindā śār​ṅgagadādhara gōvindā
virājātīrdhastha gōvindā virōdhimardhana gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 14 ॥

sālagrāma[dhara] gōvindā sahasranāmā gōvindā
lakṣmīvallabha gōvindā lakṣmaṇāgraja gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 15 ॥

kastūritilaka gōvindā kanakāmbaradhara gōvindā [kāñchanāmbaradhara]
garuḍavāhanā gōvindā gajarāja rakṣaka gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 16 ॥

vānarasēvita gōvindā vāradhibandhana gōvindā
ēkasvarūpa gōvindā rāmakṛṣṇā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 17 ॥

bhaktanandana gōvindā pratyakṣadēvā gōvindā
paramadayākara gōvindā vajrakavachadhara gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 18 ॥

vaijayantimāla gōvindā vaḍḍikāsula gōvindā
vasudēvasuta gōvindā śrīvāsudēva gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 19 ॥

nityakaḻyāṇa gōvindā nīrajanābha gōvindā
nīlādrivāsa gōvindā nīlamēghaśyāma gōvindā [kṣīrābḍhivāsa]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 20 ॥

svayaṃ prakāśa gōvindā ānandanilaya gōvindā
śrīdēvinātha gōvindā dēvaki nandana gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 21 ॥

tirumalavāsa gōvindā ratnakirīṭa gōvindā
āśritapakṣa gōvindā nityaśubhaprada gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 22 ॥

ānandarūpa gōvindā ādyantarahita gōvindā
ihapara dāyaka gōvindā ibharāja rakṣaka gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 23 ॥

padmadalākṣa gōvindā tirumalanilya gōvindā
śēṣaśāyinī gōvindā śēṣādrinilaya gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 24 ॥

varāha ṝpa gōvindā śrī kūrmarūpa gōvindā
vāmanaṝpa gōvindā naraharirūpa gōvindā [hariharaṝpa]
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 25 ॥

śrī paraśurāma gōvindā śrī balarāma gōvindā
raghukula rāma gōvindā śrī rāmakṛṣṇa gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 26 ॥

tirumalanāyaka gōvindā śritajanapōṣaka gōvindā
śrīdēvinātha gōvindā śrīvatsāṅkita gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 27 ॥

gōvindānāma gōvindā vēṅkaṭaramaṇā gōvindā
kṣētrapālaka gōvindā tirumalanātha gōvindā ।
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 28 ॥

vānarasēvita gōvindā vāradhibandhana gōvindā
ēḍukoṇḍalavāḍa gōvindā ēkatvarūpā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 29 ॥

śrī rāmakṛṣṇa gōvindā raghukula nandana gōvindā
pratyakṣadēvā gōvindā paramadayākara gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 30 ॥

vajrakavachadhara gōvindā vaijayantimāla gōvindā
vaḍḍikāsulavāḍa gōvindā vasudēvatanayā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 31 ॥

bilvapatrārchita gōvindā bhikṣuka saṃstuta gōvindā
strīpuṃsarūpā gōvindā śivakēśavamūrti gōvindā
brahmāṇḍarūpā gōvindā bhaktarakṣaka gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 32 ॥

nityakaḻyāṇa gōvindā nīrajanābha gōvindā
hātīrāmapriya gōvindā hari sarvōttama gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 33 ॥

janārdhanamūrti gōvindā jagatsākṣirūpā gōvindā
abhiṣēkapriya gōvindā āpannivāraṇa gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 34 ॥

ratnakirīṭā gōvindā rāmānujanuta gōvindā
svayamprakāśā gōvindā āśritapakṣa gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 35 ॥

nityaśubhaprada gōvindā nikhilalōkēśā gōvindā
ānandarūpā gōvindā ādyantarahitā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 36 ॥

ihapara dāyaka gōvindā ibharāja rakṣaka gōvindā
paramadayāḻō gōvindā padmanābhahari gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 37 ॥

tirumalavāsā gōvindā tulasīvanamāla gōvindā
śēṣādrinilayā gōvindā śēṣasāyinī gōvindā
śrī śrīnivāsā gōvindā śrī vēṅkaṭēśā gōvindā
gōvindā hari gōvindā gōkulanandana gōvindā [vēṅkaṭaramaṇa gōvindā] ॥ 38 ।`,
  },
  {
    id: "kumkuma-archana",
    category: "kumkuma",
    titleTe: "కుంకుమ అర్చన",
    titleEn: "Kumkuma Archana",
    bodyTe: `ఓం శ్రీ మాత్రే నమః
ఓం శ్రీ మహారాజ్ఞ్యై నమః
ఓం శ్రీమత్ సింహాసనేశ్వర్యై నమః
ఓం చిదగ్ని కుండసంభూతాయై నమః
ఓం దేవకార్య సముద్యతాయై నమః`,
    bodyEn: `Om Sri Matre Namaha
Om Sri Maharajnyai Namaha
Om Srimat Simhasaneshwaryai Namaha
Om Chidagni Kunda Sambhutayai Namaha
Om Devakarya Samudyatayai Namaha`,
  },
  {
    id: "ganesh-aarti",
    category: "aarti",
    titleTe: "సుఖకర్తా దుఃఖహర్తా (ఆరతి)",
    titleEn: "Sukhakarta Dukhaharta (Aarti)",
    bodyTe: `సుఖకర్తా దుఖహర్తా వార్తా విఘ్నాచీ.
నురవీ పురవీ ప్రేమ కృపా జయాచీ.
సర్వాంగీ సుందర ఉటీ శేందురాచీ.
కంఠీ ఝళకే మాళ ముక్తాఫళాంచీ॥

జయ దేవ జయ దేవ జయ మంగళమూర్తి.
దర్శనమాత్రే మనఃకామనా పూర్తీ॥
జయ దేవ జయ దేవ॥

రత్నఖచిత ఫరా తుజ గౌరీ కుమారా.
చందనాచీ ఉటీ కుంకుమకేశరా.
హిరే జడిత ముకుట శోభతో బరా.
రుణఝుణతీ నూపురే చరణీ ఘాగరియా॥

జయ దేవ జయ దేవ జయ మంగళమూర్తి.
దర్శనమాత్రే మనఃకామనా పూర్తీ॥
జయ దేవ జయ దేవ॥`,
    bodyEn: `sukhakarta dukhaharta varta vignachi.
nuravi puravi prema krupa jayachi.
sarvaangi sundara uty shendurachi.
kanthi jhalake maala muktaaphalanchee॥

jaya deva jaya deva jaya mangalamurti.
darsanamatre manamkamanaa purthi॥
jaya deva jaya deva॥

ratnakhachita faraa thuja gowri kumaraa.
chandanaachi uty kunkumakesharaa.
hire jadita mukuta sobhato baraa.
runajunathi noopure charani ghagaria॥

jaya deva jaya deva jaya mangalamurti.
darsanamatre manamkamanaa purthi॥
jaya deva jaya deva॥`,
  },
];
