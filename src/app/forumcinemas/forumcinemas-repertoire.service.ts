import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RepertoireService} from "../RepertoireService";
import {Movie} from "../Movie";
import {environment} from "../../environments/environment";
import {Cinemas} from "../Cinemas";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class ForumcinemasRepertoireService implements RepertoireService {
  private parser: DOMParser;

  constructor(private http: HttpClient) {
    this.parser = new DOMParser();
  }

  fetch(): Promise<Movie[]> {
    return this.http.get(this.buildUrl(), {responseType: "text"}).toPromise()
      .then(xml => this.mapToMovies(xml))
      .catch(err => {
        console.error(err);
        return [];
      });
  }

  private mapToMovies(responseDocument: string): Movie[] {
    const xml = this.parser.parseFromString(responseDocument, "text/xml");
    const shows: HTMLCollectionOf<Element> = xml.getElementsByTagName("Show");
    const movies: Movie[] = [];

    for (let i = 0; i < shows.length; ++i) {
      movies.push(this.mapToMovie(shows.item(i)));
    }

    return movies;
  }

  private mapToMovie(show: Element): Movie {
    function parsePosterUrl(images: Element): string {
      const imagesChildes = images.children;

      for (let i = 0; i < imagesChildes.length; ++i) {
        const item = imagesChildes.item(i);

        if (item.nodeName === "EventMediumImagePortrait") {
          return item.innerHTML;
        }
      }

      return "";
    }

    const showChildes = show.children;

    const movie: Movie = {
      cinema: Cinemas.FORUMCINEMAS,
      title: "",
      url: null,
      posterUrl: null,
      startTime: 0,
      duration: ""
    };

    let startTime: string;
    let endTime: string;

    for (let i = 0; i < showChildes.length; ++i) {
      const item = showChildes.item(i);

      switch (item.nodeName) {
        case "dttmShowStartUTC":
          movie.startTime = moment(item.innerHTML).unix();
          break;
        case "dttmShowStart":
          startTime = item.innerHTML;
          break;
        case "dttmShowEnd":
          endTime = item.innerHTML;
          break;
        case "Title":
          movie.title = item.innerHTML;
          break;
        case "ShowURL":
          movie.url = item.innerHTML;
          break;
        case "Images":
          movie.posterUrl = parsePosterUrl(item);
          break;
        default:
          break;
      }
    }

    movie.duration = moment(startTime).format("HH:mm") + " - " + moment(endTime).format("HH:mm");
    return movie;
  }

  private buildUrl(): string {
    function currentDate(): string {
      const today = new Date();

      return `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
    }

    return `${environment.forumcinemas_url}?dt=${currentDate()}`;
  }
}
