import { convertUSDtoILS } from "./currency";
export enum planType {
  Basic = "Basic",
  Standard = "Standard",
  Premium = "Premium",
}

export interface Plan {
  id: string;
  type: planType;
  quality: string;
  price: number;
  background: string;
}

export const plans = async (): Promise<Plan[]> => [
  {
    id: "10339",
    type: planType.Basic,
    quality: "720p",
    price: Number(await convertUSDtoILS(10)),
    background: "bg-gradient-to-br from-purple-700 to-blue-800",
  },
  {
    id: "10340",
    type: planType.Standard,
    quality: "1080p",
    price: Number(await convertUSDtoILS(15)),
    background: "bg-gradient-to-br from-purple-600 to-blue-700",
  },
  {
    id: "10341",
    type: planType.Premium,
    quality: "4K + HDR",
    price: Number(await convertUSDtoILS(20)),
    background: "bg-gradient-to-br from-purple-800 to-red-600",
  },
];
