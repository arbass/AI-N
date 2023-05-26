//elements
const reportScreen = document.getElementById('report-screen')
const reportButton_submit = document.querySelector('#button-report-submit')
const reportInput = document.querySelector('#input-report-comment')
const reportButton_true = document.querySelector('#button-report_true')
const reportButton_false = document.querySelector('#button-report_false')
const reportButton_close = document.querySelector('#button-report_close')
const testImages = document.querySelectorAll('.test-image')
const uiEl_urlError = document.querySelector('#url-error-message')
const buttonEl_processClose = document.querySelector('#processing_cancel')
const inputEl_fileInput = document.querySelector('#file-input')
const imageEl_currentImage = document.querySelector('#ai-or-not-current-image')
const imageEl_currentImageEmpty = document.querySelector('#empty-preview-img')
const textEl_inputError = document.querySelector('#input-error-text')
const inputEl_urlWaiter = document.querySelector('#ai-or-not_image-url')
const buttonEl_urlCheck = document.querySelector('#ai-or-not_submit')
const uiEl_dropZone = document.querySelector('#ai-or-not_dropzone')
const textEl_dropZoneError = document.querySelector('#ai-or-not_dropzone-text')
const uiEl_resultCol = document.querySelector('#result-screen_col')
//element's arrays
const arrayEl_testImages = document.querySelectorAll('[test-image-url]')
//variables
let pastedUrl
let fileUpload_way
let fileSizeAllow
let currentResultId

let visitorId
//functions

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3').then(
	FingerprintJS => FingerprintJS.load()
)

async function initFingerPrint() {
	visitorId = await fpPromise
		.then(fp => fp.get())
		.then(result => {
			// console.log(result)
			return result.visitorId
		})
}

initFingerPrint()

function uiReported_false() {
	let buttonText = document.querySelector('#button-report_false-text')
	buttonText.classList.remove('hide')
	buttonText.textContent = buttonText.getAttribute(
		'report-button-text-default_reported'
	)
	reportButton_false.classList.add('is-reported')
	reportButton_true.classList.add('hide')
}

function uiReported_true() {
	let buttonText = document.querySelector('#button-report_true-text')
	buttonText.classList.remove('hide')
	buttonText.textContent = buttonText.getAttribute(
		'report-button-text-default_reported'
	)
	reportButton_true.classList.add('is-reported')
	reportButton_false.classList.add('hide')
}

function uiReported_initialState() {
	reportInput.value = ''

	let buttonText_true = document.querySelector('#button-report_true-text')
	let buttonText_false = document.querySelector('#button-report_false-text')
	buttonText_false.classList.add('hide')
	buttonText_true.classList.remove('hide')

	buttonText_true.textContent = buttonText_true.getAttribute(
		'report-button-text-default'
	)
	buttonText_false.textContent = buttonText_false.getAttribute(
		'report-button-text-default'
	)

	reportButton_true.classList.remove('is-reported')
	reportButton_false.classList.remove('is-reported')
	reportButton_true.classList.remove('hide')
	reportButton_false.classList.remove('hide')
}

function updateReportResult(id, reportPredict, reportComment) {
	const url = `https://results-api.optic.xyz/api/detector/reports/result/${id}`
	const body = {
		is_proper_predict: reportPredict,
		comment: reportComment,
	}

	const options = {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}

	fetch(url, options)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error))
}

function changeShareUrl(responseId) {
	currentResultId = responseId
	document.querySelector(
		'[fs-socialshare-element="url"]'
	).textContent = `https://results.optic.xyz/aiornot/${responseId}`

	let allShareUrl = document.querySelectorAll('.result-screen_share-item')

	allShareUrl.forEach(el => {
		el.setAttribute(
			'data-url',
			`https://results.optic.xyz/aiornot/${responseId}`
		)
	})
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//ui functions
function fileSizeMessage_ok() {
	// console.log('размер файла ok')
	textEl_dropZoneError.textContent =
		'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.'
	textEl_dropZoneError.classList.remove('text-color-red')
	textEl_inputError.textContent = 'Something went wrong. Try again.'
	uiEl_urlError.classList.add('hide')
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function someThingWentWrong_error() {
	uiEl_urlError.classList.remove('hide')
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function someThingWentWrong_ok() {
	uiEl_urlError.classList.add('hide')
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function fileSizeMessage_error() {
	if (uiEl_resultCol.classList.contains('hide')) {
		// console.log('размер файла слишком велик')
		textEl_dropZoneError.textContent = 'File is too large (max 10 MB)'
		textEl_dropZoneError.classList.add('text-color-red')
	} else {
		// console.log('размер файла слишком велик')
		textEl_inputError.textContent = 'File is too large (max 10 MB)'
		uiEl_urlError.classList.remove('hide')
	}
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
inputEl_fileInput.addEventListener('change', () => {
	const fileSize = inputEl_fileInput.files[0].size
	const maxSize = 10 * 1024 * 1024 // 10 MB in bytes
	if (fileSize > maxSize) {
		fileSizeAllow = false
		fileSizeMessage_error()
	} else {
		fileSizeAllow = true
		fileSizeMessage_ok()
	}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function error_dropZone() {
	// console.log('ошибка dropzone')
	document.querySelector('#processing-screen').classList.add('hide')
	textEl_dropZoneError.classList.add('error')
	uiEl_dropZone.classList.add('red-border')
	textEl_dropZoneError.textContent = 'Something went wrong. Try again.'
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function initial_dropZone() {
	// console.log('стартовый dropzone')
	textEl_dropZoneError.classList.remove('error')
	uiEl_dropZone.classList.remove('red-border')
	textEl_dropZoneError.textContent =
		'We support jpeg, png, webp, gif, tiff, bmp. 10 Mb of maximum size.'
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function screen_homeShow() {
	// console.log('показываем screen_homeShow')
	document.querySelector('#choose-file-row').classList.add('hide')
	document.querySelector('#legal-tip').classList.remove('hide')
	document.querySelector('#processing-screen').classList.add('hide')
	document
		.querySelector('#hero-home_title-description')
		.classList.remove('hide')
	document.querySelector('#hero-home_gallery').classList.remove('hide')
	document.querySelector('#ai-or-not_dropzone').classList.remove('hide')
	document
		.querySelector('#hero-home_drop-zone-divider')
		.classList.remove('hide')
	document.querySelector('#result-screen_col').classList.add('hide')
	document.querySelector('#result-screen_image-wrapper').classList.add('hide')
	imageEl_currentImage.classList.add('hide')
	imageEl_currentImageEmpty.classList.remove('hide')
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function loadingStart() {
	uiReported_initialState()
	// console.log('показываем loadingStart')
	imageEl_currentImage.src = ''
	someThingWentWrong_ok()
	textEl_inputError.textContent = 'Something went wrong. Try again.'
	document.querySelector('#choose-file-row').classList.remove('hide')
	document.querySelector('#legal-tip').classList.add('hide')
	document.querySelector('.processing-screen_triggers_5').click()
	document.querySelector('#processing-screen').classList.remove('hide')
	document.querySelector('.processing-screen_triggers_1').click()
	document.querySelector('#hero-home_title-description').classList.add('hide')
	document.querySelector('#hero-home_gallery').classList.add('hide')
	document.querySelector('#ai-or-not_dropzone').classList.add('hide')
	document.querySelector('#hero-home_drop-zone-divider').classList.add('hide')
	document.querySelector('#result-screen_col').classList.remove('hide')
	document
		.querySelector('#result-screen_image-wrapper')
		.classList.remove('hide')
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function loadingFinish() {
	// console.log('показываем loadingFinish')
	imageEl_currentImage.classList.remove('hide')
	imageEl_currentImageEmpty.classList.add('hide')

	document.querySelector('.processing-screen_triggers_3').click()
	document.querySelector('#processing-screen').classList.add('hide')
	document.querySelector('.processing-screen_triggers_5').click()

	document.querySelector('#scroll-to-top-trigger').click()
	inputEl_fileInput.value = ''
	document.querySelector('#ai-or-not_image-url').value = ''
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//function to check json from file sending result

function getModelTitleByName(name) {
	switch (name) {
		case 'midjourney':
			return 'Midjourney'
		case 'dall_e':
			return 'DALL-E'
		case 'stable_diffusion':
			return 'Stable Diffusion'
		case 'this_person_does_not_exis':
			return 'GAN'
		default:
			return 'AI'
	}
}

function findHighestConfidence(data) {
	let highestConfidence = ''
	let highestConfidenceTask = ''

	const aiConfidence = data.body.report.ai.confidence
	const humanConfidence = data.body.report.human.confidence

	if (aiConfidence > humanConfidence) {
		const reports = Object.entries(data.body.report)
			.map(([property, value]) => {
				if (property === 'version' || property === 'ai') return

				return {
					name: property,
					confidence: value.confidence,
				}
			})
			.filter(value => value !== undefined)

		const maxElement = reports.reduce((max, current) => {
			if (current.confidence === undefined) {
				return max
			}
			return current.confidence > max.confidence ? current : max
		}, reports[0])

		if (aiConfidence > maxElement.confidence && maxElement.confidence < 0.55) {
			highestConfidenceTask = 'AI'
			// highestConfidence = aiConfidence
		} else {
			highestConfidenceTask = getModelTitleByName(maxElement.name)
			// highestConfidence = maxElement.confidence
		}
		highestConfidence = aiConfidence

		document.getElementById('title-human').classList.add('hide')
		document.getElementById('title-ai').classList.remove('hide')
	} else {
		highestConfidenceTask = 'Human'
		highestConfidence = humanConfidence

		document.getElementById('title-human').classList.remove('hide')
		document.getElementById('title-ai').classList.add('hide')
	}

	if (highestConfidence < 0.55) {
		document.getElementById('title-ai').innerHTML =
			'Sorry, but in this case we can’t really say if it’s AI or Not'
		document.getElementById('title-human').innerHTML =
			'Sorry, but in this case we can’t really say if it’s AI or Not'
		document
			.getElementById('ai-or-not_result-message-50')
			.classList.remove('hide')
		document.getElementById('ai-or-not_result-message').classList.add('hide')
		document.getElementById('ai-or-not_result-message-50').innerHTML =
			'Probly the uploaded image has most likely been modified or compressed'
	} else {
		document.getElementById('title-ai').innerHTML =
			'This image is generated by <span class="text-color-green">AI</span>'
		document.getElementById('title-human').innerHTML =
			'This image is generated by <span class="text-color-green">Human</span>'
		document.getElementById('ai-or-not_result-message-50').classList.add('hide')
		document.getElementById('ai-or-not_result-message').classList.remove('hide')
		document.querySelector('#ai-or-not_model-name').textContent =
			highestConfidenceTask
		document.querySelector('#ai-or-not_change-size').textContent = `${Math.ceil(
			highestConfidence * 100
		)}%`
	}
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//function to check image by url

async function postToApi_url() {
	uiEl_urlError.classList.add('hide')
	loadingStart()

	const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/json?source=web&user_id=${visitorId}`

	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			object: pastedUrl,
		}),
	}

	fetch(baseUrl, options)
		.then(response => response.json())

		.then(response => {
			changeShareUrl(response.id)
			imageEl_currentImage.src = pastedUrl
			findHighestConfidence(response.response)
			loadingFinish()
		})
		.catch(error => {
			if (uiEl_resultCol.classList.contains('hide')) {
				someThingWentWrong_error()
			} else {
				someThingWentWrong_error()
				screen_homeShow()
			}
			console.log(error)
		})
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//function to check image by dropped file
const dropzone = document.body
const tipMessage = document.querySelector('#dropzone-fullscreen_message-tip')
const formatMessage = document.querySelector(
	'#dropzone-fullscreen_message-format'
)

// Событие при перетаскивании файла над body
dropzone.addEventListener('dragover', function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.remove('hide')
})
dropzone.addEventListener('dragleave', function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.add('hide')
})

// Событие при отпускании файла в dropzone
dropzone.addEventListener('drop', async function (event) {
	event.preventDefault()
	document.querySelector('.dropzone-fullscreen').classList.add('hide')

	const file = event.dataTransfer.files[0]

	//-----

	const fileSize = file.size
	const maxSize = 10 * 1024 * 1024 // 10 MB in bytes
	if (fileSize > maxSize) {
		fileSizeAllow = false
		fileSizeMessage_error()
	} else {
		fileSizeAllow = true
		fileSizeMessage_ok()
	}
	//-----
	if (fileSizeAllow == true) {
		if (
			file.type !== 'image/png' &&
			file.type !== 'image/jpeg' &&
			file.type !== 'image/webp' &&
			file.type !== 'image/gif' &&
			file.type !== 'image/tiff' &&
			file.type !== 'image/bmp'
		) {
			// console.log('использовать можно только png или jpeg')
		} else {
			loadingStart()

			const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/raw?source=web&user_id=${visitorId}`
			const formData = new FormData()
			formData.append('binary', file, 'file_name.png')

			const options = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					// 'Content-Type': 'multipart/form-data',
				},
				body: formData,
			}

			// Отобразить выбранное изображение в img элементе
			const currentImage = document.querySelector('#ai-or-not-current-image')
			currentImage.src = URL.createObjectURL(file)
			imageEl_currentImage.classList.remove('hide')
			imageEl_currentImageEmpty.classList.add('hide')

			// Отправить запрос на сервер с использованием метода fetch
			fetch(baseUrl, options)
				.then(response => response.json())
				.then(response => {
					changeShareUrl(response.id)
					initial_dropZone()
					findHighestConfidence(response.response)
					loadingFinish()
				})

				.catch(error => {
					console.log(error)
					error_dropZone()
					screen_homeShow()
				})
		}
	} else {
		fileSizeMessage_error()
	}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//function to check image by selected file
inputEl_fileInput.addEventListener('change', event => {
	if (fileSizeAllow == true) {
		loadingStart()
		// Найти элемент input типа файл на текущей веб-странице
		const fileInput = document.querySelector('#file-input')
		const file = fileInput.files[0]

		// Отобразить выбранное изображение в img элементе

		const baseUrl = `https://atrium-prod-api.optic.xyz/results/api/detector/reports/raw?source=web&user_id=${visitorId}`
		const formData = new FormData()
		formData.append('binary', file, 'file_name.png')

		const currentImage = document.querySelector('#ai-or-not-current-image')
		let currentImageUrl = URL.createObjectURL(fileInput.files[0])
		currentImage.setAttribute('src', currentImageUrl)
		// console.log(currentImageUrl)

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				// 'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}
		imageEl_currentImage.classList.remove('hide')
		imageEl_currentImageEmpty.classList.add('hide')

		// Отправить запрос на сервер с использованием метода fetch

		// Отправить запрос на сервер с использованием метода fetch
		fetch(baseUrl, options)
			.then(response => response.json())
			.then(response => {
				changeShareUrl(response.id)
				initial_dropZone()
				findHighestConfidence(response.response)
				loadingFinish()
			})

			.catch(error => {
				console.log(error)
				error_dropZone()
				screen_homeShow()
			})
	} else {
		fileSizeMessage_error()
	}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//functions reacts on events
buttonEl_processClose.addEventListener('click', function () {
	initial_dropZone()
	screen_homeShow()
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document
	.querySelector('#ai-or-not_dropzone')
	.addEventListener('click', function () {
		fileUpload_way = 'screen_home'
		inputEl_fileInput.click()
	})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
document
	.querySelector('#choose-file-row')
	.addEventListener('click', function () {
		fileUpload_way = 'screen_result'
		inputEl_fileInput.click()
	})

// imageEl_currentImage.addEventListener('error', function () {
// 	uiEl_urlError.classList.remove('hide')
// 	// console.log('ошибка загрузки изображения, но апи ответила')
// 	// screen_homeShow()
// })

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
buttonEl_urlCheck.addEventListener('click', () => {
	if (inputEl_urlWaiter.value != '') {
		pastedUrl = inputEl_urlWaiter.value
		postToApi_url()
	}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const element = document.querySelector('#ai-or-not_image-url')

element.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		if (inputEl_urlWaiter.value != '') {
			pastedUrl = inputEl_urlWaiter.value
			postToApi_url()
		}
	}
})

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// const testImages = document.querySelectorAll('.test-image')
// declorated in separate file 'randomize-10.js'
testImages.forEach(testImage => {
	testImage.addEventListener('click', () => {
		const testImageUrl = testImage.getAttribute('test-image-url')
		document.querySelector('#ai-or-not_image-url').value = testImageUrl
		document.querySelector('#ai-or-not_submit').click()
		document.querySelector('#ai-or-not_image-url').value = ''
	})
})

reportButton_true.addEventListener('click', () => {
	uiReported_true()
	reportPredict = true
	reportComment = ''
	updateReportResult(currentResultId, reportPredict, reportComment)
})

reportButton_false.addEventListener('click', () => {})

reportButton_close.addEventListener('click', () => {})

reportButton_submit.addEventListener('click', () => {
	reportPredict = false
	reportComment = reportInput.value
	updateReportResult(currentResultId, reportPredict, reportComment)
	uiReported_false()
})

document.addEventListener('keydown', function (event) {
	if (event.code === 'Escape') {
		if (reportScreen.style.display !== 'none') {
			reportButton_close.click()
		}
	}
})

reportInput.addEventListener('change', () => {
	if (reportInput.value != '') {
		reportButton_submit.classList.remove('is-disabled')
	} else {
		reportButton_submit.classList.add('is-disabled')
	}
})

reportInput.addEventListener('input', () => {
	if (reportInput.value != '') {
		reportButton_submit.classList.remove('is-disabled')
	} else {
		reportButton_submit.classList.add('is-disabled')
	}
})
