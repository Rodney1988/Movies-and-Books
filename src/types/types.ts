export interface UserRating {
    numeric_description_only: number
    description: string
    rating: string
    numeric_rating_only: number
}

export interface ReleaseDate {
    URL: string
    NAME: string
}

export interface Summary {
    "Full Cast": string
    plot: string
}

export interface Movie {
    UserRating: UserRating
    awards: []
    episodes: []
    genres: []
    jsonnob?: undefined
    p_g_rating: string
    poster: string
    release_date: ReleaseDate
    short_imdb_description?: string
    small_poster: string
    sum_mary?: undefined
    summary: Summary
    title?: string
    titleType: string
    trailer: string
    trailer_vid_id: string
    tt_url: string
    upscaled_poster: string
}

export type ImageProps = {
    src: string
}

export interface BookTitle {
    numFound: number
    start: number
    numFoundExact: boolean
    docs: Doc[]
    num_found: number
    q: string
    offset?: any
}

export interface Doc {
    key: string
    type: string
    seed: string[]
    title: string
    title_suggest: string
    edition_count: number
    edition_key: string[]
    publish_date: string[]
    publish_year: number[]
    first_publish_year: number
    number_of_pages_median: number
    lccn: string[]
    publish_place: string[]
    oclc: string[]
    contributor: string[]
    lcc: string[]
    ddc: string[]
    isbn: string[]
    last_modified_i: number
    ebook_count_i: number
    ebook_access: string
    has_fulltext: boolean
    public_scan_b: boolean
    ia: string[]
    ia_collection: string[]
    ia_collection_s: string
    lending_edition_s: string
    lending_identifier_s: string
    printdisabled_s: string
    cover_edition_key: string
    cover_i: number
    publisher: string[]
    language: string[]
    author_key: string[]
    author_name: string[]
    author_alternative_name: string[]
    person: string[]
    place: string[]
    subject: string[]
    time: string[]
    id_alibris_id: string[]
    id_amazon: string[]
    id_better_world_books: string[]
    id_canadian_national_library_archive: string[]
    id_depósito_legal: string[]
    id_goodreads: string[]
    id_google: string[]
    id_librarything: string[]
    id_overdrive: string[]
    id_paperback_swap: string[]
    id_wikidata: string[]
    ia_loaded_id: string[]
    ia_box_id: string[]
    publisher_facet: string[]
    person_key: string[]
    place_key: string[]
    time_facet: string[]
    person_facet: string[]
    subject_facet: string[]
    _version_: any
    place_facet: string[]
    lcc_sort: string
    author_facet: string[]
    subject_key: string[]
    ddc_sort: string
    time_key: string[]
    first_sentence: string[]
    subtitle: string
    id_bcid: string[]
}
