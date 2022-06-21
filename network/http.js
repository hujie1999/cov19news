import request from "./request"


const http = {
	post: (url, data, header) => {
		const options = {
			url: url,
			method: 'POST',
			data: data || null,
			header: header || null
		}
		return request(options)
	},
	get: (url) => {
		const options = {
			url: url,
			method: 'GET'
		}
		return request(options)
	}
}

export default http