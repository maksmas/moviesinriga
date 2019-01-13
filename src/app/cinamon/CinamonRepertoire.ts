export interface CinamonRepertoire {
  [hash: string]: CinamonEntry[];
}

export interface CinamonEntry {
  pid: number;
  hash: string;
  time: string;
  date: string;
  date_formatted: string;
  full_date: string;
  showtime: string;
  allow_ticket_sales: number;
  allow_ticket_sales_for_movie: number;
  allow_ticket_sales_for_cinema: number;
  coded_film_id: string;
  length_for_humans: string;
  film: CinamonFilm;
  item: CinamonItem;
  relatedAttributes: CinamonRelatedAttributes[];
}

export interface CinamonItem {
  version: number;
  cinema_id: number;
  film_id: string;
  screen_name: string;
  showtime: string;
  allow_ticket_sales: number;
  pid: number;
  film_pid: number;
  date: string;
  time: string;
  hash: string;
  date_formatted: string;
  screen: CinamonScreen;
  film: CinamonItemFilm;
  related_attributes: CinamonItemRelatedAttributes[];
}

export interface CinamonItemRelatedAttributes {
  id: number;
  version: number;
  short_name: string;
  description: string;
  render_type_id: string;
  status_id: number;
  description_translations: {
    en: { text: string; };
    ru: { text: string; };
    ee: { text: string; };
    lv: { text: string; };
    lt: { text: string; };
    fi: { text: string; };
  };
  cinema_ids: string; // comma separated
  render_type: string;
  css_class: string;
  status: string;
  is_published: number;
  published_at: string;
  pivot: {
    session_id: number;
    attribute_id: number;
  };
}

export interface CinamonItemFilm {
  version: number;
  genre_id: number;
  name: string;
  slug: string;
  name_translations: {
    en: CinamonLang;
    lv: CinamonLang;
    ru: CinamonLang;
    ee: CinamonLang;
    lt: CinamonLang;
    fi: CinamonLang;
  };
  synopsis: string;
  synopsis_translations: {
    en: { text: string; };
    lv: { text: string; };
    ru: { text: string; };
    ee: { text: string; };
    lt: { text: string; };
    fi: { text: string; };
  };
  synopsis_short: string;
  synopsis_short_translations: {
    en: { text: string; };
    lv: { text: string; };
    ru: { text: string; };
    ee: { text: string; };
    lt: { text: string; };
    fi: { text: string; };
  };
  status_id: number;
  rating: string;
  opens_at: string;
  scheduled: number;
  coming_soon: number;
  runtime: number;
  imdb_rating: string;
  trailer_url: string;
  short_code: string;
  trailer_urls: {
    lv: { url: string; };
    ee: { url: string; };
    lt: { url: string; };
    fi: { url: string; };
    en: { url: string; };
    ru: { url: string; };
  };
  coming_soon_local: string;
  starting_dates: string;
  ratings_upload_images: string;
  status: string;
  is_published: number;
  published_at: string;
  pid: number;
  poster: string;
  cover: string;
  genre: CinamonItemFilmGenre;
}

export interface CinamonItemFilmGenre {
  version: number;
  name: string;
  slug: string;
  name_translations: {
    en: CinamonLang;
    ru: CinamonLang;
    ee: CinamonLang;
    lv: CinamonLang;
    lt: CinamonLang;
    fi: CinamonLang;
  };
  description: string;
  description_translations: any;
}

export interface CinamonLang {
  text: string;
  slug: string;
}

export interface CinamonScreen {
  version: number;
  cinema_id: number;
  seats_totall: number;
}

export interface CinamonFilm {
  coded_film_id: string;
  pid: number;
  name: string;
  original_name: string;
  synopsis: string;
  synopsis_short: string;
  slug: string;
  runtime: number;
  opens_at: CinamonRawDate;
  imdb_rating: string;
  cover: string;
  poster: string;
  rating: string;
  premiere_date: string;
  premiere_label: string;
  trailer_url: string;
  premiere_date_raw: CinamonRawDate;
  ratings_images: CinamonRatingImage[];
  extra_symbols: number;
  genre: CinamonGenre;
}

export interface CinamonGenre {
  id: number;
  name: string;
  slug: string;
}

export interface CinamonRatingImage {
  path: string;
  title: string;
  id: string;
}

export interface CinamonRawDate {
  date: string;
  timezone_type: number;
  timezone: number;
}

export interface CinamonRelatedAttributes {
  id: number;
  render_type_id: number;
  short_name: string;
  description: string;
  css_class: string;
}
