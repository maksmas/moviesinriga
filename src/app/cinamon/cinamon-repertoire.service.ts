import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CinamonRepertoire} from "./CinamonRepertoire";
import {Movie} from "../Movie";
import {Cinemas} from "../Cinemas";

@Injectable({
  providedIn: "root"
})
export class CinamonRepertoireService {

  constructor(private http: HttpClient) { }

  fetch(): Promise<Movie[]> {
    return this.http.get<CinamonRepertoire>(environment.cinamon_url).toPromise().then(data => this.mapToMovies(data));
  }

  private mapToMovies(repertoire: CinamonRepertoire): Movie[] {
    return Object.keys(repertoire).map(key => {
      const entry = repertoire[key][0];

      return {
        cinema: Cinemas.CINAMON,
        title: entry.film.name,
        startDate: entry.date,
        startTime: entry.time,
        length: entry.length_for_humans
      } ;
    });
  }
}
