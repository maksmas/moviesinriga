import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CinamonRepertoire} from "./CinamonRepertoire";
import {Movie} from "../Movie";
import {Cinemas} from "../Cinemas";
import {RepertoireService} from "../RepertoireService";
import * as moment from "moment";
import {logoUrl} from "../utils";

@Injectable({
  providedIn: "root"
})
export class CinamonRepertoireService implements RepertoireService {
  constructor(private http: HttpClient) { }

  fetch(): Promise<Movie[]> {
    return this.http.get<CinamonRepertoire>(this.buildRequestUrl()).toPromise().then(data => this.mapToMovies(data));
  }

  private buildRequestUrl() {
    function currentDate(): string {
      const today = new Date();

      return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    return environment.cinamon_url +
      "?cinema_id=1633064176" +
      "&timezone=Europe%2FRiga" +
      "&locale=en" +
      "&grouped=true" +
      "&include=film.genre,relatedAttributes" +
      "&date=" + currentDate();
  }

  private mapToMovies(repertoire: CinamonRepertoire): Movie[] {
    const cinemaLogoUrl = logoUrl(Cinemas.CINAMON);

    return Object.keys(repertoire).map(key => {
      const entry = repertoire[key][0];

      return {
        cinema: Cinemas.CINAMON,
        cinemaLogoUrl: cinemaLogoUrl,
        title: entry.film.name,
        duration: entry.length_for_humans,
        startTime: moment(entry.showtime).unix(),
        url: `https://cinamonkino.com/alfa/seat-plan/${entry.pid}/lv`,
        posterUrl: entry.film.poster
      } ;
    });
  }
}
