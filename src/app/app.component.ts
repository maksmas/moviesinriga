import {Component, OnInit} from "@angular/core";
import {Movie} from "./Movie";
import {CinamonRepertoireService} from "./cinamon/cinamon-repertoire.service";
import {ForumcinemasRepertoireService} from "./forumcinemas/forumcinemas-repertoire.service";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  movies: Movie[];

  constructor(
    private cinamonRepertoireService: CinamonRepertoireService,
    private forumcinemasRepertoireService: ForumcinemasRepertoireService
  ) {
    this.movies = [];
  }

  ngOnInit(): void {
    this.cinamonRepertoireService.fetch().then(fetchedMovies => this.appendMovies(fetchedMovies));
    this.forumcinemasRepertoireService.fetch().then(fetchedMovies => this.appendMovies(fetchedMovies));
  }

  goToMovie(movie: Movie): void {
    window.open(movie.url, "_blank");
  }

  private appendMovies(movies: Movie[]): void {
    movies = movies.filter(m => m.startTime > moment().unix());

    const needSort = this.movies.length !== 0 && movies.length !== 0;
    this.movies.push(...movies);

    if (needSort) {
      this.movies.sort((a, b) => {
        return a.startTime - b.startTime;
      });
    }
  }
}
