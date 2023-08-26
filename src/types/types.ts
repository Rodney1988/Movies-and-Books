export interface TMDBSearchResult {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type ImageProps = {
  src?: string;
};

export type RowNumber = {
  number: number;
};

export interface Open {
  isOpen: boolean;
}

export interface ByBookTitle {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Doc[];
  num_found: number;
  q: string;
  offset?: any;
}

export interface Doc {
  key: string;
  type: string;
  seed: string[];
  title: string;
  title_suggest: string;
  edition_count: number;
  edition_key: string[];
  publish_date: string[];
  publish_year: number[];
  first_publish_year: number;
  number_of_pages_median: number;
  lccn: string[];
  publish_place: string[];
  oclc: string[];
  contributor: string[];
  lcc: string[];
  ddc: string[];
  isbn: string[];
  last_modified_i: number;
  ebook_count_i: number;
  ebook_access: string;
  has_fulltext: boolean;
  public_scan_b: boolean;
  ia: string[];
  ia_collection: string[];
  ia_collection_s: string;
  lending_edition_s: string;
  lending_identifier_s: string;
  printdisabled_s: string;
  cover_edition_key: string;
  cover_i: number;
  publisher: string[];
  language: string[];
  author_key: string[];
  author_name: string[];
  author_alternative_name: string[];
  person: string[];
  place: string[];
  subject: string[];
  time: string[];
  id_alibris_id: string[];
  id_amazon: string[];
  id_better_world_books: string[];
  id_canadian_national_library_archive: string[];
  id_depósito_legal: string[];
  id_goodreads: string[];
  id_google: string[];
  id_librarything: string[];
  id_overdrive: string[];
  id_paperback_swap: string[];
  id_wikidata: string[];
  ia_loaded_id: string[];
  ia_box_id: string[];
  publisher_facet: string[];
  person_key: string[];
  place_key: string[];
  time_facet: string[];
  person_facet: string[];
  subject_facet: string[];
  _version_: any;
  place_facet: string[];
  lcc_sort: string;
  author_facet: string[];
  subject_key: string[];
  ddc_sort: string;
  time_key: string[];
  first_sentence: string[];
  subtitle: string;
  id_bcid: string[];
}

export interface SpecificMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: MovieResults[];
}

export interface MovieResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
