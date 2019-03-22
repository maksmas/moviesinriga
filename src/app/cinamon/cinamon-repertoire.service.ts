import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CinamonRepertoire} from "./CinamonRepertoire";
import {Movie} from "../Movie";
import {Cinemas} from "../Cinemas";
import {RepertoireService} from "../RepertoireService";

@Injectable({
  providedIn: "root"
})
export class CinamonRepertoireService implements RepertoireService {
  constructor(private http: HttpClient) { }

  fetch(): Promise<Movie[]> {
    return this.http.get<CinamonRepertoire>(this.buildRequestUrl()).toPromise().then(data => this.mapToMovies(data));
  }

  private buildRequestUrl() {
    return `${environment.cinamon_url}?cinema_id=1633064176&timezone=Europe%2FRiga&locale=lv&grouped=true&date=${this.currentDate()}`;
  }

  private currentDate(): string {
    const today = new Date();

    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }

  private mapToMovies(repertoire: CinamonRepertoire): Movie[] {
    return Object.keys(repertoire).map(key => {
      const entry = repertoire[key][0];

      return {
        cinema: Cinemas.CINAMON,
        title: entry.film.name,
        startDateTime: entry.date + " " + entry.time,
        length: entry.length_for_humans,
        url: `https://cinamonkino.com/alfa/seat-plan/${entry.pid}/lv`
      } ;
    });
  }
}
