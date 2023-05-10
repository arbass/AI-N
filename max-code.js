async function detectImageByUrl(url) {
    const baseUrl = 'https://results-api.optic.xyz/api/detector/reports/json'
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            object: url
        })
    }

    return await fetch(baseUrl, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
async function detectImageByBinary(file) {
    const baseUrl = 'https://results-api.optic.xyz/api/detector/reports/raw'
    const formData = new FormData();
    formData.append('binary', file, 'file_name.png');

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    }

    return await fetch(baseUrl, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}