import {Component, OnInit} from "@angular/core";
import {Movie} from "./Movie";
import {CinamonRepertoireService} from "./cinamon/cinamon-repertoire.service";
import {ForumcinemasRepertoireService} from "./forumcinemas/forumcinemas-repertoire.service";

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
    this.cinamonRepertoireService.fetch().then(fetchedMovies => this.movies.push(...fetchedMovies));
    this.forumcinemasRepertoireService.fetch().then(fetchedMovies => this.movies.push(...fetchedMovies));
  }
}
