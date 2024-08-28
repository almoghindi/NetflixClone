import BlueIcon from "../../../../assets/img/blueIcon.jpg";
import RedIcon from "../../../../assets/img/redIcon.jpg"; // Add more icons as needed
export interface Icon {
  id: number;
  src: string;
}
export const icons: Icon[] = [
  { id: 1, src: BlueIcon },
  { id: 2, src: RedIcon },

  {
    id: 3,
    src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYSw2XUJOe-RXGqlMhzAK2kb3m8jiiuICaICOYRemQXvfBcEmoaG0XMebWDsKrQ4fhsAYwzopxK6Cm5l5w2F9iMzCVqZuapW7A.png?r=201",
  },
  {
    id: 4,
    src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABVAOVZB6hbXn66eL28YYwIrZ3y7G9clKxQtWp-2Dc1_uq2MuLsPa_mD3N1jJlpMc_61au7gZ69iuTZmeg_YjE-5YKAGbR8JFKg.png?r=7c7",
  },
  {
    id: 5,
    src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcD0ZrsIMMPdVENlhcMLhAEQsGSplhivXwxPolt5h1wP1bquIL83x4fkrS6we4cwNWTe1nn7exw7GDMLe-72PiRcoMIBjdjmmA.png?r=b39",
  },
];
