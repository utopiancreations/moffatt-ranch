
export interface MerchandiseItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  available: boolean;
}

export const merchandiseItems: MerchandiseItem[] = [
  {
    id: 1,
    name: "Moffatt Ranch T-Shirt",
    description: "Comfortable cotton t-shirt with ranch logo",
    price: "25.00",
    image: "/images/merchandise/tshirt.jpg",
    available: true
  },
  {
    id: 2,
    name: "Peach Jam",
    description: "Homemade jam from our fresh peaches", 
    price: "8.00",
    image: "/images/merchandise/jam.jpg",
    available: true
  },
  {
    id: 3,
    name: "Ranch Hat",
    description: "Embroidered cap with Moffatt Ranch logo",
    price: "18.00",
    image: "/images/merchandise/hat.jpg",
    available: true
  },
  {
    id: 4,
    name: "Peach Preserves",
    description: "Sweet preserves made from tree-ripened peaches",
    price: "10.00",
    image: "/images/merchandise/preserves.jpg",
    available: false
  }
];
