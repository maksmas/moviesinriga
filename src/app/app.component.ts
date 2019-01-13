import {Component, OnInit} from "@angular/core";
import { mockMovies } from "./MockMovies";
import {Movie} from "./Movie";
import {CinamonRepertoireService} from "./cinamon/cinamon-repertoire.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  movies: Movie[];

  constructor(private cinamonRepertoireService: CinamonRepertoireService) { }

  ngOnInit(): void {
    this.cinamonRepertoireService.fetch().then(fetchedMovies => this.movies = fetchedMovies);
  }
}
