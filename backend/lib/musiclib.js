class ServiceProvider {
    constructor() {
        this.baseURL = 'https://www.jiosaavn.com/api.php?__call=';
    }

    async request(dir){
        const response = await fetch(`${this.baseURL}${dir}`, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Cookie": "DL=english; B=0829219470faf183150022ea217284c7; CT=MTA3Mjc3NTMwMw%3D%3D; L=hindi; geo=2409%3A40d1%3A100e%3A3406%3A2859%3A53c4%3A422a%3A5b9a%2CIN%2CChandigarh%2CChandigarh%2C160020; mm_latlong=30.7339%2C76.7889; _fp=447e78fdf3e907cb33da16a32332e1f1; ATC=l6qBA3wqQQkdu5AUAZM%2FLfJ%2Fh6%2FCHMpaMUGt0z7%2Bt5ad4%2BylY3qlKlpi8fbPehK0; CH=G03%2CA07%2CO00%2CL03"
            }
        });
        const data = await response.json();
        return data;        
    }
    
    async getLaunchData() {
        const data = await this.request(`webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getArtist(artist_id, song_count) {
        const data = await this.request(`artist.getArtistPageDetails&artistId=${artist_id}&type=songs&n_song=${song_count}&category=&sort_order=&_format=json&ctx=web6dot0`);
        return data;
    }

    async getTopSearches() {
        const data = await this.request(`content.getTopSearches&ctx=web6dot0&api_version=4&_format=json&_marker=0`);
        return data;
    }

    async getAlbums(count, page) {
        const data = await this.request(`content.getAlbums&n=${count}&p=${page}&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0`);
        return data;
    }

    async getCharts() {
        const data = await this.request(`content.getCharts&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getFeaturedPlaylists(count, page) {
        const data = await this.request(`content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${page}&n=${count}&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getTopShows(count, page) {
        const data = await this.request(`content.getTopShows&n=${count}&p=${page}&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getTopArtists() {
        const data = await this.request(`social.getTopArtists&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getFeaturedStations() {
        const data = await this.request(`webradio.getFeaturedStations&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }

    async getPlaylistById(id) {
        const data = await this.request(`playlist.getDetails&listid=${id}&_format=json`);
        return data;
    }
    
    async getStationById(name, count=20) {
        const station_id = await this.request(`webradio.createFeaturedStation&language=hindi&pid=&query=&name=${name.replaceAll(" ", "+")}&mode=&artistid=&_format=json&_marker=0&ctx=web6dot0`);
        const data = await this.request(`webradio.getSong&stationid=${station_id.stationid}&k=${count}&next=1&_format=json&_marker=0&ctx=web6dot0`);
        return data;
    }
    
    async getAlbumById(album_id){
        var data = await this.request(`webapi.get&token=${album_id}&type=album&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`);
        return data;
    }

    async getSongById(id) {
        const data = await this.request(`song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`);
        return data[id];
    }
    
    async getLyrics(id) {
        const data = await this.request(`lyrics.getLyrics&lyrics_id=${id}&ctx=web6dot0&api_version=4&_format=json&_marker=0`)
        return data;
    }
    
    async getSearch(query, page, type){
        var command = ["getPlaylistResults", "getResults", "getAlbumResults", `getMoreResults&params=%7B%22type%22:%22podcasts%22%7D&query=${query.replaceAll(" ", "+")}`, "getArtistResults"][type]
        const data = await this.request(`search.${command}&p=${page}&q=${query}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=50`)
        return data;
    }

    async playById(id) {
        const songDetails = await this.request(`song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`);
        const token = songDetails[id].encrypted_media_path;
        const authTokenData = await this.request(`song.generateAuthToken&url=${encodeURIComponent(token)}&bitrate=128&_format=json`);

        const result = {
            ...songDetails[id],
            "streamurl": authTokenData
        };

        return result;
    }
}
module.exports = ServiceProvider;