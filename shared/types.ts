// shared/types.ts
export interface SpotifyStream {
    ts: string;
    username: string;
    platform: string;
    ms_played: number;
    conn_country: string;
    master_metadata_track_name: string;
    master_metadata_album_artist_name: string;
    master_metadata_album_album_name: string;
    spotify_track_uri: string;
}

export interface UserStats {
    totalStreams: number;
    totalMinutes: number;
    topArtists: string[];
}

// shared/types.ts
export interface ExtendedSpotifyStream {
    ts: string;
    ms_played: number;
    master_metadata_track_name: string | null;
    master_metadata_album_artist_name: string | null;
    master_metadata_album_album_name: string | null;
    spotify_track_uri: string | null;
    reason_start: string;
    reason_end: string;
    shuffle: boolean;
    skipped: boolean | null;
    platform: string;
}