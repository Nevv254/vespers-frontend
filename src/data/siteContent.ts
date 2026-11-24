export interface Safari {
  id?: number;
  title: string;
  region: string;
  duration: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Destination {
  name: string;
  country: string;
  image: string;
}

export const featuredSafaris: Safari[] = [
  {
    title: "The Mara, Uncovered",
    region: "MAASAI MARA, KENYA",
    duration: "4 DAYS / 3 NIGHTS",
    description: "A closer connection to the sweeping plains and remarkable wildlife of the Mara.",
    image: "/images/safari-mara.jpg",
    imageAlt: "Wildlife on the Maasai Mara plains",
  },
  {
    title: "Beneath Kilimanjaro",
    region: "AMBOSELI, KENYA",
    duration: "3 DAYS / 2 NIGHTS",
    description: "Discover open horizons, iconic elephant herds and the mountain beyond.",
    image: "/images/safari-amboseli.jpg",
    imageAlt: "Elephants with Mount Kilimanjaro in the distance",
  },
  {
    title: "The Great Rift Escape",
    region: "NAKURU & NAIVASHA, KENYA",
    duration: "3 DAYS / 2 NIGHTS",
    description: "A restorative escape through lakeside landscapes and rich natural beauty.",
    image: "/images/safari-rift.jpg",
    imageAlt: "A scenic Rift Valley lake and surrounding landscape",
  },
];

export const destinations: Destination[] = [
  { name: "Maasai Mara", country: "KENYA", image: "/images/destination-mara.jpg" },
  { name: "Amboseli", country: "KENYA", image: "/images/destination-amboseli.jpg" },
  { name: "Lake Nakuru", country: "KENYA", image: "/images/destination-nakuru.jpg" },
  { name: "Lake Naivasha", country: "KENYA", image: "/images/destination-naivasha.jpg" },
];