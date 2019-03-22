import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RepertoireService} from "../RepertoireService";
import {Movie} from "../Movie";
import {environment} from "../../environments/environment";
import {Cinemas} from "../Cinemas";

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
    const showChildes = show.children;

    const movie: Movie = {
      cinema: Cinemas.FORUMCINEMAS,
      length: "",
      title: "",
      startDateTime: "",
      url: null
    };

    for (let i = 0; i < showChildes.length; ++i) {
      const item = showChildes.item(i);

      switch (item.nodeName) {
        case "LengthInMinutes": movie.length = item.innerHTML; break;
        case "dttmShowStart": movie.startDateTime = item.innerHTML; break;
        case "Title": movie.title = item.innerHTML; break;
        case "ShowURL": movie.url = item.innerHTML; break;
        default: break;
      }
    }

    return movie;
  }

  private buildUrl(): string {
    return `${environment.forumcinemas_url}?dt=${this.currentDate()}`;
  }

  private currentDate(): string {
    const today = new Date();

    return `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;
  }
}
