import {Injectable} from "@angular/core";
import {RepertoireService} from "../RepertoireService";
import {Movie} from "../Movie";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {logoUrl} from "../utils";
import {Cinemas} from "../Cinemas";
import moment = require("moment");

@Injectable({
  providedIn: "root"
})
export class ApolloRepertoireService implements RepertoireService {
  private parser: DOMParser;

  constructor(private http: HttpClient) {
    this.parser = new DOMParser();
  }

  fetch(): Promise<Movie[]> {
    return this.http.get(environment.apollo_url, {responseType: "text"}).toPromise()
      .then(html => this.mapToMovies(html))
      .catch(err => {
        console.error(err);
        return [];
      });
  }

  private mapToMovies(response: string): Movie[] {
    const cinemaLogoUrl = logoUrl(Cinemas.APOLLO);

    function mapToMovie(rawItem: Element): Movie {
      const panelBodyChildes = rawItem.children[0].children[0].children;
      const rowDiv = panelBodyChildes[0];



      const scheduleDiv = panelBodyChildes[1];
      const startTime = scheduleDiv.children[0].children[0].children[1].children[0].innerHTML.split(":");

      // todo
      return {
        cinema: Cinemas.APOLLO,
        cinemaLogoUrl: cinemaLogoUrl,
        startTime: moment()
          .hour(parseInt(startTime[0], 10) - 1)
          .minutes(parseInt(startTime[1], 10) - 1).unix(),
        title: "WIP",
        duration: "WIP",
        posterUrl: "WIP",
        url: "WIP"
      };
    }

    const html = this.parser.parseFromString(response, "text/html");
    const rawItems: HTMLCollectionOf<Element> = html.getElementsByClassName("panel-EventBlock-Parent");
    const parsedMovies: Movie[] = [];

    for (let i = 0; i < rawItems.length; ++i) {
      parsedMovies.push(mapToMovie(rawItems.item(i)));
    }

    return parsedMovies;
  }
}
