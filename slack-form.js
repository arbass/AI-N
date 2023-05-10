async function submitFormForAPI() {
	const TELEGRAM_TOKEN = '6203285403:AAHMIg3eW5YcnmwPTnmJ4pVKA8ofpEbLKuY'
	const CHAT_ID = '-1001980213929'
	const URI_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

	const name = document.querySelector('#name').value
	const email = document.querySelector('#E-Mail').value
	const note = document.querySelector('#Note').value
	const company = document.querySelector('#Company').value

	let message = `Application from the site <b>${window.location.href}</b>\n`
	message += `<b>Имя:</b> ${name}\n`
	message += `<b>E-mail:</b> ${email}\n`
	message += `<b>Company:</b> ${company}\n`
	message += `<b>Note:</b> ${note}\n`
	message += `<b>Stay informed:</b> ${true ? '✅' : '❌'}\n`
	message += `<b>I have read and accepted the Privacy Policy:</b> ${
		true ? '✅' : '❌'
	}\n`

	await fetch(URI_API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text: message,
			parse_mode: 'html',
		}),
	})

	await fetch('https://results-api.optic.xyz/api/system/notify', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: message,
		}),
	})
}

// Получаем элемент формы по идентификатору
const form = document.querySelector('form')

// Привязываем обработчик события submit к форме
form.addEventListener('submit', function (event) {
	// // Отменяем стандартное поведение браузера, чтобы форма не отправлялась
	// event.preventDefault();

	// Вызываем нужную функцию
	submitFormForAPI()
})
