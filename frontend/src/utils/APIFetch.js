const APIFetch = async (endpoint) => {
    const response = await fetch(`/api/${endpoint}`, {
        headers:{
            Cookie: "DL=english; B=0829219470faf183150022ea217284c7; CT=MTA3Mjc3NTMwMw%3D%3D; L=hindi; CH=G03%2CA07%2CO00%2CL03; geo=2409%3A40d1%3A100e%3A3406%3A2859%3A53c4%3A422a%3A5b9a%2CIN%2CChandigarh%2CChandigarh%2C160020; mm_latlong=30.7339%2C76.7889; _fp=447e78fdf3e907cb33da16a32332e1f1; ATC=l6qBA3wqQQkdu5AUAZM%2FLfJ%2Fh6%2FCHMpaMUGt0z7%2Bt5ad4%2BylY3qlKlpi8fbPehK0; jwplayer.volume=75"
        }
    });
    const data = await response.json();
    return data;
}

export default APIFetch