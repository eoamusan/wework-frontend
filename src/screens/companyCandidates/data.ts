export type CandidateCategory = "Design" | "Engineering" | "Marketing";
export type CandidateGender = "Female" | "Male";
export type CandidateLocation = "Abuja, Nigeria" | "Lagos, Nigeria" | "Remote";

export type CandidateItem = {
  category: CandidateCategory;
  description: string;
  gender: CandidateGender;
  id: string;
  initials: string;
  location: CandidateLocation;
  name: string;
  recommended?: boolean;
  role: string;
  theme: string;
};

export const candidateItems: CandidateItem[] = [
  {
    category: "Engineering",
    description:
      "Passionate React developer with 5+ years of experience building scalable web applications. Loves clean code and intuitive user experiences.",
    gender: "Male",
    id: "1",
    initials: "HA",
    location: "Lagos, Nigeria",
    name: "Hammed Adeyanju",
    recommended: true,
    role: "Senior Frontend Engineer",
    theme: "from-[#5a321d] via-[#985c2d] to-[#2d1c12]",
  },
  {
    category: "Engineering",
    description:
      "Frontend engineer focused on accessible interfaces, performance, and product polish across modern web stacks.",
    gender: "Female",
    id: "2",
    initials: "EO",
    location: "Lagos, Nigeria",
    name: "Esther Okon",
    role: "Senior Frontend Engineer",
    theme: "from-[#efe5cc] via-[#f8f1df] to-[#b7d3a4]",
  },
  {
    category: "Marketing",
    description:
      "Growth-minded marketing professional with strong storytelling, campaign planning, and digital channel optimization skills.",
    gender: "Male",
    id: "3",
    initials: "TJ",
    location: "Remote",
    name: "Tolu Johnson",
    role: "Marketing Lead",
    theme: "from-[#e8edf4] via-[#f7fafc] to-[#b9d4ef]",
  },
  {
    category: "Design",
    description:
      "Product designer experienced in building elegant design systems, user flows, and visually consistent digital products.",
    gender: "Male",
    id: "4",
    initials: "FO",
    location: "Lagos, Nigeria",
    name: "Femilare Olatunji",
    recommended: true,
    role: "Product Designer",
    theme: "from-[#5f331f] via-[#9d5d36] to-[#2e1d14]",
  },
  {
    category: "Engineering",
    description:
      "React developer who enjoys shipping thoughtful features, improving maintainability, and collaborating closely with product teams.",
    gender: "Female",
    id: "5",
    initials: "AN",
    location: "Abuja, Nigeria",
    name: "Amara Nwosu",
    role: "Frontend Engineer",
    theme: "from-[#f2ebd7] via-[#ffffff] to-[#d1e6bd]",
  },
  {
    category: "Engineering",
    description:
      "Backend and platform-focused engineer with solid API design, cloud deployment, and systems thinking experience.",
    gender: "Male",
    id: "6",
    initials: "DM",
    location: "Remote",
    name: "David Musa",
    role: "Backend Engineer",
    theme: "from-[#eef2f8] via-[#ffffff] to-[#c0d9ee]",
  },
  {
    category: "Marketing",
    description:
      "Content and acquisition marketer who blends analytics with creativity to turn product messaging into measurable results.",
    gender: "Female",
    id: "7",
    initials: "ZI",
    location: "Lagos, Nigeria",
    name: "Zainab Ibrahim",
    role: "Marketing Specialist",
    theme: "from-[#69402a] via-[#9d6945] to-[#332116]",
  },
  {
    category: "Design",
    description:
      "UI designer with strong visual instincts, component thinking, and a sharp eye for interaction detail across mobile and web.",
    gender: "Female",
    id: "8",
    initials: "MO",
    location: "Abuja, Nigeria",
    name: "Mary Ojo",
    role: "UI Designer",
    theme: "from-[#f5ebdb] via-[#ffffff] to-[#c9dfb8]",
  },
  {
    category: "Engineering",
    description:
      "Senior frontend engineer experienced with React, TypeScript, performance tuning, and cross-functional product development.",
    gender: "Male",
    id: "9",
    initials: "KA",
    location: "Lagos, Nigeria",
    name: "Kunle Adebayo",
    role: "Senior Frontend Engineer",
    theme: "from-[#eaf0f6] via-[#ffffff] to-[#c2d8ea]",
  },
];
