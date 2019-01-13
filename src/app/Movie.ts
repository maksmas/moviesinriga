import {Cinemas} from "./Cinemas";

export interface Movie {
  cinema: Cinemas;
  title: string;
  length: string;
  startDate: string;
  startTime: string;
}
