import {Component, OnInit} from "@angular/core";
import { mockMovies } from "./MockMovies";
import {Movie} from "./Movie";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  movies: Movie[];

  ngOnInit(): void {
    this.movies = mockMovies;
  }
}
