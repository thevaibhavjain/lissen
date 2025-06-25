class ServiceProvider {
    constructor() {
        this.baseURL = 'https://www.jiosaavn.com/api.php?__call=';
        this.commonHeaders = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.6",
            "Priority": "u=1, i",
            "Referer": "https://www.jiosaavn.com/",
            "Sec-Ch-Ua": `"Brave";v="137", "Chromium";v="137", "Not/A)Brand";v="24"`,
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": `"Windows"`,
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Gpc": "1",
            "Cookie": [
                "geo=152.59.147.226%2CIN%2CBihar%2CPatna%2C800001",
                "mm_latlong=25.5943%2C85.1352",
                "CH=G03%2CA07%2CO00%2CL03",
                "_pl=web6dot0-",
                "DL=english",
                "B=5e732d3ddc3c25e7a8364c5c59c072b1",
                "CT=NjgxODI4NDE0",
                "L=hindi"
            ].join("; ")
        };
    }

    async request(dir) {
        const response = await fetch(`${this.baseURL}${dir}`, {
            method: "GET",
            headers: this.commonHeaders
        });

        const data = await response.json();
        return data;
    }

    async getLaunchData() {
        return await this.request(`webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getArtist(artist_id, song_count) {
        return await this.request(`artist.getArtistPageDetails&artistId=${artist_id}&type=songs&n_song=${song_count}&category=&sort_order=&_format=json&ctx=web6dot0`);
    }

    async getTopSearches() {
        return await this.request(`content.getTopSearches&ctx=web6dot0&api_version=4&_format=json&_marker=0`);
    }

    async getAlbums(count, page) {
        return await this.request(`content.getAlbums&n=${count}&p=${page}&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getCharts() {
        return await this.request(`content.getCharts&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getFeaturedPlaylists(count, page) {
        return await this.request(`content.getFeaturedPlaylists&fetch_from_serialized_files=true&p=${page}&n=${count}&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getTopShows(count, page) {
        return await this.request(`content.getTopShows&n=${count}&p=${page}&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getTopArtists() {
        return await this.request(`social.getTopArtists&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getFeaturedStations() {
        return await this.request(`webradio.getFeaturedStations&api_version=4&_format=json&_marker=0&ctx=web6dot0`);
    }

    async getPlaylistById(id) {
        return await this.request(`playlist.getDetails&listid=${id}&_format=json`);
    }

    async getStationById(name, count = 20) {
        const station_id = await this.request(`webradio.createFeaturedStation&language=hindi&pid=&query=&name=${name.replaceAll(" ", "+")}&mode=&artistid=&_format=json&_marker=0&ctx=web6dot0&api_version=4`);
        return await this.request(`webradio.getSong&stationid=${station_id.stationid}&k=${count}&next=1&_format=json&_marker=0&ctx=web6dot0&api_version=4`);
    }

    async getAlbumById(album_id) {
        return await this.request(`webapi.get&token=${album_id}&type=album&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`);
    }

    async getSongById(id) {
        const data = await this.request(`song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`);
        return data[id];
    }

    async getLyrics(id) {
        return await this.request(`lyrics.getLyrics&lyrics_id=${id}&ctx=web6dot0&api_version=4&_format=json&_marker=0`);
    }

    async getSearch(query, page, type) {
        const commands = [
            "getPlaylistResults",
            "getResults",
            "getAlbumResults",
            `getMoreResults&params=%7B%22type%22:%22podcasts%22%7D&query=${query.replaceAll(" ", "+")}`,
            "getArtistResults"
        ];
        const cmd = commands[type];
        return await this.request(`search.${cmd}&p=${page}&q=${query}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=50`);
    }

    async playById(id) {
        const songDetails = await this.request(`song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`);
        const token = songDetails[id].encrypted_media_url;
        const authTokenData = await this.request(`song.generateAuthToken&url=${encodeURIComponent(token)}&bitrate=160&api_version=4&_format=json&ctx=web6dot0&_marker=0`);
        authTokenData.auth_url = authTokenData.auth_url.replace("ac.cf.", "aac.");

        return {
            ...songDetails[id],
            streamurl: authTokenData
        };
    }
}

module.exports = ServiceProvider;
