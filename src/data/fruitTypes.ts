
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
    title: "Yellow Freestone Peaches",
    description: "Classic sweet and juicy yellow peaches with rich, traditional peach flavor and beautiful golden color",
    varieties: [
      {
        id: 1,
        name: "Flavorcrest",
        description: "Early season favorite with excellent balance of sweet and tart flavors and beautiful red blush",
        season: "Early June",
        image: "/images/fruit/flavorcrest.jpg",
        featured: true
      },
      {
        id: 2,
        name: "Suncrest",
        description: "Mid-season variety known for its exceptional sweetness and firm texture",
        season: "Mid June",
        image: "/images/fruit/suncrest.jpg",
        featured: false
      },
      {
        id: 3,
        name: "Sierra Rich",
        description: "Beautiful red-blushed peach with rich, intense flavor and excellent eating quality",
        season: "Late June",
        image: "/images/fruit/sierra-rich.jpg",
        featured: false
      },
      {
        id: 4,
        name: "Elegant Lady",
        description: "Large, attractive peach with excellent eating quality and exceptional storage life",
        season: "Early July",
        image: "/images/fruit/elegant-lady.jpg",
        featured: true
      },
      {
        id: 5,
        name: "Faye Elberta",
        description: "Traditional Elberta-type peach perfect for fresh eating and canning with classic flavor",
        season: "Mid July",
        image: "/images/fruit/faye-elberta.jpg",
        featured: false
      },
      {
        id: 6,
        name: "O'Henry",
        description: "Late season variety with exceptional size and outstanding flavor, perfect for extending the season",
        season: "Late July",
        image: "/images/fruit/o-henry.jpg",
        featured: false
      }
    ]
  },
  {
    id: 2,
    type: "white_peaches",
    title: "White Freestone Peaches", 
    description: "Delicate, sweet white flesh peaches with floral notes and exceptional sweetness",
    varieties: [
      {
        id: 7,
        name: "Snow Beauty",
        description: "Early white peach with incredible sweetness and aromatic flavor profile",
        season: "Early July",
        image: "/images/fruit/snow-beauty.jpg",
        featured: true
      },
      {
        id: 8,
        name: "Snow King",
        description: "Large white peach with excellent texture and sublime taste, perfect for fresh eating",
        season: "Mid July",
        image: "/images/fruit/snow-king.jpg",
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
        id: 9,
        name: "Fantasia",
        description: "Popular yellow nectarine with excellent flavor and attractive red-over-yellow skin coloring",
        season: "Mid July",
        image: "/images/fruit/fantasia.jpg",
        featured: true
      }
    ]
  },
  {
    id: 4,
    type: "white_nectarines",
    title: "White Nectarines",
    description: "Sweet, aromatic nectarines with white flesh and exceptional eating quality",
    varieties: [
      {
        id: 10,
        name: "Arctic Jay",
        description: "Early white nectarine with incredibly sweet flavor and firm, crisp texture",
        season: "Early July",
        image: "/images/fruit/arctic-jay.jpg",
        featured: true
      },
      {
        id: 11,
        name: "Spice Zee",
        description: "Unique white nectarine with spicy-sweet flavor and distinctive aromatic qualities",
        season: "Mid July", 
        image: "/images/fruit/spice-zee.jpg",
        featured: false
      }
    ]
  },
  {
    id: 5,
    type: "asian_pears",
    title: "Asian Pears",
    description: "Crisp, sweet pears with apple-like texture and refreshing flavor",
    varieties: [
      {
        id: 12,
        name: "Hosui",
        description: "Premium Asian pear variety with exceptional sweetness and crisp texture",
        season: "Late August",
        image: "/images/fruit/hosui.jpg",
        featured: true
      },
      {
        id: 13,
        name: "Shinseiki",
        description: "Golden Asian pear with refreshing taste and excellent keeping quality",
        season: "Late August",
        image: "/images/fruit/shinseiki.jpg",
        featured: false
      }
    ]
  }
];
