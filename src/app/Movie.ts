import {Cinemas} from "./Cinemas";

export interface Movie {
  cinema: Cinemas;
  cinemaLogoUrl: string;
  title: string;
  url: string;
  posterUrl: string;
  startTime: number;
  duration: string;
}
