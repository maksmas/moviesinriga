import {RepertoireService} from "../RepertoireService";
import {Movie} from "../Movie";
import {Injectable} from "@angular/core";
import {MultikinoRepertoire, MultikinoRepertoireItems, Times} from "./MultikinoRepertoire";
import {environment} from "../../environments/environment";
import {Cinemas} from "../Cinemas";
import {logoUrl} from "../utils";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class MultikinoRepertoireService implements RepertoireService {
  fetch(): Promise<Movie[]> {
    return fetch(environment.multikino_url,
      {
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "X-Requested-With": "null",
          "test": "true"
        }
      })
      .then(response => response.json())
      .then(data => this.mapToMovies(data));
  }

  private mapToMovies(repertoire: MultikinoRepertoire): Movie[] {
    const cinemaLogoUrl = logoUrl(Cinemas.MULTIKINO);

    function showingToday(item: MultikinoRepertoireItems) {
      return !!item.showings &&
        item.showings.map(showing => showing.date_prefix).includes("Šodien");
    }

    function mapToMovie(item: MultikinoRepertoireItems, time: Times): Movie {
      const endTime = moment(time.date).add(item.info_runningtime.replace(" min.", ""), "m");

      return {
        cinema: Cinemas.MULTIKINO,
        cinemaLogoUrl: cinemaLogoUrl,
        title: item.title,
        url: "https://multikino.lv/" + item.filmlink,
        posterUrl: item.image_poster,
        duration: `${time.time} -  ${endTime.format("HH:mm")}`,
        startTime: moment(time.date).unix()
      };
    }

    const parsedMovies: Movie[] = [];

    for (const film of repertoire.films) {
      if (showingToday(film)) {
        // todo get by name
        film.showings[0].times.forEach(time => parsedMovies.push(mapToMovie(film, time)));
      }
    }

    return parsedMovies;
  }
}
