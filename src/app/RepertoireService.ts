import {Movie} from "./Movie";

export interface RepertoireService {
  fetch(): Promise<Movie[]>;
}
