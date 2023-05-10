fetch('https://results-api.optic.xyz/api/system/notify', {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		text: message,
	}),
})
	.then(response => response.json())
	.catch(error => {
		console.error('There was a problem with the fetch request:', error)
	})
