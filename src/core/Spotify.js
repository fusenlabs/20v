import {Client, TrackHandler, ArtistHandler} from 'spotify-sdk';
import {magic} from './Magic';

let client = Client.instance;
client.settings = {
    clientId: '',
    secretId: '',
    scopes: 'playlist-modify-public playlist-modify-private',
    redirect_uri: 'http://localhost:3000/app/login/index.html'
};
let settings = {
    tracks: 20,
    artists: 20
};
let track = new TrackHandler();
let total = 0;

let Spotify = {
    trackList: [],
    autocomplete: (text, country) => {
        return track.search(text, {
            limit: 5,
            market: country
        });
    },
    search: (text, country, callback, fail) => {
        if (text.id) {
            return Spotify.getTracks(text, country, callback, fail);
        } else {
            track.search(text, {
                limit: 1,
                market: country
            }).then((trackCollection) => {
                if (trackCollection.length) {
                    Spotify.getTracks(trackCollection.first(), country, callback, fail);
                } else {
                    callback([]);
                }
            }).catch(fail);
        }
    },
    getTracks: (track, country, callback, fail) => {
        Spotify.trackList = [];
        track.artists.first().relatedArtists().then((relatedArtists) => {
            relatedArtists = relatedArtists.slice(0, settings.artists - 1);
            if (relatedArtists.length) {
                relatedArtists.push(track.artists.first());
                for (var i = relatedArtists.length - 1; i >= 0; i--) {
                    total = relatedArtists.length - 1;
                    relatedArtists[i].topTracks({
                        country: country
                    }).then((tracks) => {
                        if (tracks.length) {
                            for (var e = tracks.length - 1; e >= 0; e--) {
                                Spotify.trackList.push(tracks[e]);
                                if (e === 0) {
                                    total -= 1;
                                    if (total === 0) {
                                        callback(
                                            magic(
                                                Spotify.trackList,
                                                track.popularity
                                            ), track
                                        );
                                    }
                                }
                            };
                        } else {
                            total -= 1;
                        }
                    }).catch(fail);
                };
            } else {
                callback([]);
            }
        }).catch(fail);
    }
};

export default Spotify;
