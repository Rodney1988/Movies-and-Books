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
