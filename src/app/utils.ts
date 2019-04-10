import {Cinemas} from "./Cinemas";

export function logoUrl(cinema: Cinemas) {
  switch (cinema) {
    case Cinemas.FORUMCINEMAS: return "assets/fc.png";
    case Cinemas.CINAMON: return "assets/cinamon.png";
    case Cinemas.MULTIKINO: return "assets/mk.jpg";
    default: return "";
  }
}
