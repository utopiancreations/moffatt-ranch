
export interface FruitVariety {
  id: number;
  name: string;
  description: string;
  season: string;
  image: string;
  featured: boolean;
}

export interface FruitType {
  id: number;
  type: string;
  title: string;
  description: string;
  varieties: FruitVariety[];
}

export const fruitTypes: FruitType[] = [
  {
    id: 1,
    type: "yellow_peaches",
    title: "Yellow Peaches",
    description: "Classic sweet and juicy yellow peaches with rich flavor and beautiful golden color",
    varieties: [
      {
        id: 1,
        name: "Red Haven",
        description: "Early season favorite with excellent flavor and beautiful red blush",
        season: "Early June",
        image: "/images/fruit/red-haven.jpg",
        featured: true
      },
      {
        id: 2,
        name: "Elberta",
        description: "Classic freestone peach with excellent texture for eating and preserving",
        season: "Mid July",
        image: "/images/fruit/elberta.jpg",
        featured: true
      },
      {
        id: 3,
        name: "Late Elberta",
        description: "Extended season variety with traditional Elberta flavor",
        season: "Late August",
        image: "/images/fruit/late-elberta.jpg",
        featured: false
      }
    ]
  },
  {
    id: 2,
    type: "white_peaches",
    title: "White Peaches",
    description: "Delicate, sweet white flesh peaches with floral notes and exceptional sweetness",
    varieties: [
      {
        id: 4,
        name: "White Lady",
        description: "Premium white peach with incredible sweetness and aromatic flavor",
        season: "Mid July",
        image: "/images/fruit/white-lady.jpg",
        featured: true
      },
      {
        id: 5,
        name: "Sugar Giant",
        description: "Large, exceptionally sweet white peach perfect for fresh eating",
        season: "Late July",
        image: "/images/fruit/sugar-giant.jpg",
        featured: false
      }
    ]
  },
  {
    id: 3,
    type: "yellow_nectarines",
    title: "Yellow Nectarines",
    description: "Smooth-skinned stone fruit with vibrant flavor and firm, juicy texture",
    varieties: [
      {
        id: 6,
        name: "Fantasia",
        description: "Popular yellow nectarine with excellent flavor and attractive appearance",
        season: "Mid July",
        image: "/images/fruit/fantasia.jpg",
        featured: true
      },
      {
        id: 7,
        name: "Flavortop",
        description: "Sweet and tangy nectarine with exceptional keeping quality",
        season: "Late July",
        image: "/images/fruit/flavortop.jpg",
        featured: false
      }
    ]
  },
  {
    id: 4,
    type: "white_nectarines",
    title: "White Nectarines",
    description: "Sweet, aromatic nectarines with white flesh and delicate floral notes",
    varieties: [
      {
        id: 8,
        name: "Arctic Star",
        description: "Premium white nectarine with exceptional sweetness and low acid",
        season: "Early August",
        image: "/images/fruit/arctic-star.jpg",
        featured: true
      }
    ]
  },
  {
    id: 5,
    type: "asian_pears",
    title: "Asian Pears",
    description: "Crisp, sweet pears with unique apple-like texture and refreshing flavor",
    varieties: [
      {
        id: 9,
        name: "20th Century",
        description: "Classic Asian pear variety with crisp texture and sweet flavor",
        season: "Late August",
        image: "/images/fruit/20th-century.jpg",
        featured: true
      },
      {
        id: 10,
        name: "Shinseiki",
        description: "Golden Asian pear with excellent crunch and mild, sweet flavor",
        season: "Early September",
        image: "/images/fruit/shinseiki.jpg",
        featured: false
      }
    ]
  }
];
