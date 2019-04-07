export interface MultikinoRepertoire {
  original_s_count: number;
  sortable: number;
  showings: Showings[];
  show_showings: boolean;
  film_page_name: string;
  title: string;
  id: string;
  image_hero: string;
  image_poster: string;
  cert_image: string;
  cert_decs: any;
  synopsis_short: string;
  info_release: string;
  info_runningtime_visible: boolean;
  info_runningtime: string;
  info_age: string;
  pegi_class: string;
  pegi_href: string;
  info_director: string;
  info_cast: any;
  availablecopy: string;
  videolink: string;
  filmlink: string;
  timeslink: string;
  video: string;
  hidden: boolean;
  coming_soon: boolean;
  comming_soon: boolean;
  announcment: boolean;
  virtual_reality: boolean;
  young_adult_tag: boolean;
  genres: any;
  tags: any;
  categories: any;
  showing_type: any;
  rank_votes: any;
  rank_value: any;
  promo_labels: any;
  ReleaseDate: string;
  type: string;
  wantsee: string;
  showwantsee: boolean;
  newsletterurl: string;
  always_in_QB: boolean;
  priority_value: number;
  available3D: boolean;
  selected3D: boolean;
  distributor: any;
  title_synonyms: any[];
}

export interface Showings {
  date_prefix: string;
  date_day: string;
  date_short: string;
  date_long: string;
  date_time: string;
  date_formatted: string;
  times: Times[];
  date: string;
  cdate: string;
  clone: boolean;
}

export interface Times {
  session_id: string;
  version_id: string;
  time: string;
  screen_type: string;
  screen_number: string;
  lang: any;
  tags: Tag[];
  event_info: any;
  hidden: boolean;
  date: string;
  kids_club: boolean;
  first_class: boolean;
}

export interface Tag {
  name: string;
  fullname: string;
}

export interface Genres {
  names: Genre[];
  active: boolean;
}

export interface Genre {
  name: string;
  url: string;
  highlighted: boolean;
}
