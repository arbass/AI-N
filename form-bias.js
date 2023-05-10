async function submitFormForAPI() {
	const name = document.querySelector('#name').value
	const email = document.querySelector('#E-Mail').value
	const company = document.querySelector('#Company').value

	let message = `Application from the site <b>${window.location.href}</b>\n`
	message += `<b>Имя:</b> ${name}\n`
	message += `<b>E-mail:</b> ${email}\n`
	message += `<b>Company:</b> ${company}\n`
	message += `<b>Stay informed:</b> ${true ? '✅' : '❌'}\n`
	message += `<b>I have read and accepted the Privacy Policy:</b> ${
		true ? '✅' : '❌'
	}\n`

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
