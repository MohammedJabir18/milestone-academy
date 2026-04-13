export type FacultyMember = {
  id: string;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  photo_url: string | null;
  courses: string[];
};

export const fallbackFaculty: FacultyMember[] = [
  {
    id: "f1",
    name: "Shaiha ks",
    role: "Instructor",
    specialization: "Accounting",
    bio: "Experienced professional instructor and mentor with expertise in accounting systems.",
    photo_url: "/faculties/Shaiha_milestone.jpeg",
    courses: ["DABS", "PGDAFA"]
  },
  {
    id: "f2",
    name: "Muhammed Uways",
    role: "Instructor",
    specialization: "Trading Analyst",
    bio: "Expert trading analyst with deep financial market insights and strategic investment knowledge.",
    photo_url: "/faculties/Uwais_milestone.jpeg",
    courses: ["DUTC", "EMDAT"]
  },
  {
    id: "f3",
    name: "Jinsiya",
    role: "Instructor",
    specialization: "Financial Analytics",
    bio: "Analytics expert bridging the gap between practical accounting and modern financial toolkits.",
    photo_url: "/faculties/Jinsya_milestone.jpeg",
    courses: ["PGDAFA", "DABS"]
  },
  {
    id: "f4",
    name: "Thanveera. P. M",
    role: "Instructor",
    specialization: "Taxation",
    bio: "Dedicated mentor focusing on UAE Taxation framework and compliance standards.",
    photo_url: null,
    courses: ["EMDAT"]
  }
];
