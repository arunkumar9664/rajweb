export const siteConfig = {
  name: "Rajasthan Racquetball Association",
  shortName: "RRA",
  tagline: "Let's Win Together",
  description:
    "Official State Body for Racquetball in Rajasthan. RRA conducts structured tournaments, certification programs, and official training initiatives aligned with national and international standards.",
  url: process.env.APP_URL || "https://rajasthanracquetball.com",
  email: "rajasthanracquetball@gmail.com",
  phone: "+91 99289 62982",
  address: "Rajasthan, India",
  social: {
    facebook: "https://facebook.com/rajasthanracquetball",
    instagram: "https://instagram.com/rajasthanracquetball",
    youtube: "https://youtube.com/rajasthanracquetball",
    twitter: "https://twitter.com/rajasthanracquetball",
  },
  colors: {
    primary: "#0F172A",
    secondary: "#DC2626",
    accent: "#F59E0B",
    background: "#F8FAFC",
  },
};

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      children: [
        { name: "About Racquetball", href: "/about/racquetball" },
        { name: "RRA History", href: "/about/history" },
        { name: "Executive Committee", href: "/about/executive-committee" },
        { name: "Rules & Policies", href: "/about/rules-policies" },
        { name: "Districts", href: "/districts" },
      ],
    },
    {
      name: "Membership",
      href: "/membership",
      children: [
        { name: "Club Membership", href: "/membership/club" },
        { name: "School Membership", href: "/membership/school" },
        { name: "Academy Membership", href: "/membership/academy" },
      ],
    },
    {
      name: "Tournaments",
      href: "/tournaments",
    },
    {
      name: "Media",
      href: "/media",
      children: [
        { name: "News", href: "/media/news" },
        { name: "Videos", href: "/media/videos" },
        { name: "Photo Gallery", href: "/media/gallery" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      children: [
        { name: "Court Specifications", href: "/resources/court-specifications" },
        { name: "Equipment Information", href: "/resources/equipment" },
        { name: "Physio Partners", href: "/resources/physio-partners" },
        { name: "Player Registration", href: "/register/player" },
        { name: "Coach Registration", href: "/register/coach" },
        { name: "Certificate Verification", href: "/verify" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ],
  footer: [
    {
      title: "About RRA",
      links: [
        { name: "About Racquetball", href: "/about/racquetball" },
        { name: "RRA History", href: "/about/history" },
        { name: "Executive Committee", href: "/about/executive-committee" },
        { name: "District Associations", href: "/districts" },
      ],
    },
    {
      title: "Membership",
      links: [
        { name: "Club Membership", href: "/membership/club" },
        { name: "School Membership", href: "/membership/school" },
        { name: "Academy Membership", href: "/membership/academy" },
        { name: "Player Registration", href: "/register/player" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Tournaments", href: "/tournaments" },
        { name: "Court Specifications", href: "/resources/court-specifications" },
        { name: "Certificate Verification", href: "/verify" },
        { name: "Donations", href: "/donations" },
      ],
    },
    {
      title: "Governance",
      links: [
        { name: "RTI & Governance", href: "/governance/rti" },
        { name: "Anti-Doping Compliance", href: "/governance/anti-doping" },
        { name: "Rules & Policies", href: "/about/rules-policies" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ],
};

export const siteImages = {
  logo: "/images/cropped-rra-logo.webp",
  logoLarge: "/images/rra-logo-2-1024x995.webp",
  favicon: "/images/cropped-rra-logo-32x32.webp",
  banner: "/images/LED_Banner_2240x128px-Road-to-Chengdu3-1024x59.png",
  about: "/images/Screenshot-2026-01-06-at-4.35.13-PM-1024x758.png",
  president: "/images/mangi-ram.webp",
  social: {
    facebook: "/images/fb-1-1024x1024.webp",
    instagram: "/images/Instagram_icon.png-1024x1024.webp",
    youtube: "/images/yt-image-1.png",
  },
  equipment: {
    racquet: "/images/racquetballracquet.jpeg",
    balls: "/images/racquetball-balls.webp",
    eyewear: "/images/equipemntimage1.jpeg",
    overview: "/images/racquetball-spec-1024x1024.webp",
  },
  court: {
    indoor: "/images/racquetball-court-1024x674.webp",
    outdoor: "/images/image123modern.jpeg",
  },
  sponsors: [
    { name: "Brightmoon", logo: "/images/brightmoon.jpeg" },
    { name: "EMASA", logo: "/images/emasa1.jpeg" },
  ],
  federations: [
    { name: "Indian Racquetball Association", logo: "/images/indianrracqasso-1.jpg" },
    { name: "International Racquetball Federation", logo: "/images/irflogo2.jpeg" },
    { name: "International Olympic Committee", logo: "/images/olympiccouncil.jpeg" },
    { name: "The World Games", logo: "/images/theworldgames.webp" },
    { name: "TWG 2022", logo: "/images/TWG-2022-edited-1.png" },
    { name: "ARF", logo: "/images/logo-arf-bicolor-raqueta.png" },
    { name: "International Federation", logo: "/images/international.webp" },
  ],
  gallery: [
    { title: "RRA Event", src: "/images/IMG_20260119_152906-edited-scaled.jpg" },
    { title: "RRA Tournament", src: "/images/IMG_20260119_153432-edited-scaled.jpg" },
    { title: "Racquetball Action", src: "/images/8040892_orig.jpg" },
    { title: "Training Session", src: "/images/1001067424-1024x768.jpg" },
    { title: "RRA Leadership", src: "/images/rajbalajs-edited-2.jpeg" },
  ],
};

export const executiveCommittee = [
  {
    name: "Mr. Mangi Ram Boyal",
    role: "President",
    photo: "/images/mangi-ram.webp",
    description: "Provides overall leadership and strategic direction for RRA operations and development initiatives across Rajasthan.",
  },
  {
    name: "Mr. Aashish Pooina",
    role: "General Secretary",
    photo: "/images/asishpooniawalaimage.jpeg",
    description: "Manages administrative affairs, membership records, and official correspondence with the Indian Racquetball Association.",
  },
  {
    name: "Mr. Manoj Kumar",
    role: "Treasurer",
    photo: "/images/manoj-kumar-edited-1.webp",
    description: "Oversees financial management, budgeting, and transparent reporting of association funds.",
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Rajasthan Racquetball Association",
    subtitle: "Official State Body for Racquetball in Rajasthan",
    description: "Promoting excellence in racquetball across Rajasthan through structured tournaments, certification programs, and official training initiatives.",
    cta: { primary: { label: "Join RRA", href: "/membership/club" }, secondary: { label: "View Tournaments", href: "/tournaments" } },
    image: "/images/IMG_20260119_152906-edited-scaled.jpg",
  },
  {
    id: 2,
    title: "Let's Win Together",
    subtitle: "Building Champions Across Rajasthan",
    description: "From grassroots training to state-level championships, RRA is committed to developing racquetball talent at every level.",
    cta: { primary: { label: "Register as Player", href: "/register/player" }, secondary: { label: "Learn More", href: "/about/racquetball" } },
    image: "/images/IMG_20260119_153432-edited-scaled.jpg",
  },
  {
    id: 3,
    title: "Globally Recognised Sport",
    subtitle: "IOC Recognized Since 1985",
    description: "Racquetball was a charter member of the World Games in 1981 and has been included in five IOC-Recognized Continental Games since 1995.",
    cta: { primary: { label: "About Racquetball", href: "/about/racquetball" }, secondary: { label: "RRA History", href: "/about/history" } },
    image: "/images/racquetball-court-1024x674.webp",
  },
];

export const achievements = [
  { label: "District Associations", value: "33+" },
  { label: "Registered Players", value: "500+" },
  { label: "Tournaments Held", value: "25+" },
  { label: "Certified Coaches", value: "50+" },
];

export const testimonials = [
  {
    quote: "RRA provides excellent opportunities for young and upcoming players. From district-level events to state championships, the structure and management are impressive. It truly helps athletes move forward.",
    author: "Neha Verma",
    role: "State Player",
  },
  {
    quote: "Professional management and a strong commitment to the sport. The association works consistently to develop racquetball in Rajasthan and maintains clear communication with players and coaches.",
    author: "Rohit Meena",
    role: "Coach",
  },
  {
    quote: "The Rajasthan Racquetball Association is doing excellent work in promoting the sport across the state. From grassroots training to state-level championships, their efforts are consistent and impactful.",
    author: "Pooja Sharma",
    role: "Club Member",
  },
];

export const aboutRacquetball = {
  title: "About Racquetball",
  content: `Racquetball is a racquet sport played with a hollow rubber ball on an indoor or outdoor court. It was invented in 1950 by Joseph Sobek in Greenwich, Connecticut. The sport combines elements of handball, squash, and tennis.

Racquetball was one of the charter members of the World Games first held in 1981. It has been included in five IOC-Recognized Continental Games, including the Pan American Games, since 1995. The International Racquetball Federation (IRF) was formed in 1979 and was recognized by the International Olympic Committee (IOC) in 1985 — one of the youngest sports ever to receive this recognition.

In India, the Indian Racquetball Association (IRA) was formed in 2023 and is affiliated to the International Racquetball Federation. The Rajasthan Racquetball Association (RRA) was formed in 2025 and received affiliation from the IRA in the same year.`,
};

export const rraHistory = {
  title: "RRA History",
  content: `The Rajasthan Racquetball Association (RRA) was formed in 2025. It was affiliated by the Indian Racquetball Association (IRA) in 2025. The Indian Racquetball Association was formed in 2023 and is affiliated to the International Racquetball Federation (IRF), which was formed in 1979. It was recognized by the International Olympic Committee (IOC) in 1985 — one of the youngest sports ever to receive this recognition.

Racquetball was one of the charter members of the World Games first held in 1981. It has been included in five IOC-Recognized Continental Games, including the Pan American Games, since 1995.

RRA is committed to promoting racquetball across all 33 districts of Rajasthan, conducting state-level championships, certification programs, and grassroots development initiatives.`,
};

export const courtSpecifications = {
  indoor: {
    title: "Indoor Court Specifications",
    dimensions: {
      length: "12.19 m (40 ft)",
      width: "6.10 m (20 ft)",
      height: "6.10 m (20 ft) minimum",
    },
    features: [
      "Hardwood or synthetic flooring",
      "Four walls — front, back, and two side walls",
      "Service zone marked 1.83 m from front wall",
      "Receiving line 3.05 m from front wall",
      "Short line 5.49 m from front wall",
      "Proper lighting minimum 300 lux",
      "Ventilation and climate control recommended",
    ],
  },
  outdoor: {
    title: "Outdoor Court Specifications",
    dimensions: {
      length: "12.19 m (40 ft)",
      width: "6.10 m (20 ft)",
      height: "Front wall minimum 3.05 m (10 ft)",
    },
    features: [
      "Concrete or asphalt surface with proper coating",
      "Three walls — front and two side walls",
      "Back wall optional for outdoor courts",
      "Weather-resistant materials",
      "Proper drainage system",
      "Fencing around court perimeter",
      "Shade structures recommended",
    ],
  },
};

export const rajasthanDistricts = [
  "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara",
  "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
  "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
  "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
  "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur",
];
