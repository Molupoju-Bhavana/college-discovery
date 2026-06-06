export type Exam = "JEE Main" | "JEE Advanced" | "KCET" | "MHT CET" | "BITSAT" | "VITEEE";

export type Stream = "Engineering" | "Management" | "Medical" | "Law" | "Arts & Science";

export interface Course {
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface PlacementStat {
  year: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  pros: string[];
  cons: string[];
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: {
    city: string;
    state: string;
  };
  type: "Government" | "Private" | "Deemed" | "Autonomous";
  stream: Stream[];
  establishedYear: number;
  rating: number;
  totalRatings: number;
  fees: {
    min: number;
    max: number;
  };
  ranking: {
    nirf?: number;
    outlook?: number;
  };
  acceptedExams: Exam[];
  cutoffs: Partial<Record<Exam, number>>;
  overview: string;
  highlights: string[];
  image: string;
  courses: Course[];
  placements: PlacementStat;
  reviews: Review[];
  naacGrade: string;
  approvedBy: string[];
}

export interface FilterState {
  search: string;
  stream: Stream | "";
  type: College["type"] | "";
  state: string;
  feeRange: [number, number];
  minRating: number;
  exam: Exam | "";
  sortBy: "rating" | "feesasc" | "feesdesc" | "ranking";
}
