import {Cinemas} from "./Cinemas";

export interface Movie {
  cinema: Cinemas;
  title: string;
  length: string;
  startDateTime: string;
  url: string;
}
