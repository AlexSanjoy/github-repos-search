import axios from 'axios'

const apiUrl = 'https://api.github.com'

axios.defaults.paramsSerializer = function(params) {
	let res = ''
	
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			res += `${encodeURI(key)}=${encodeURI(params[key])}&`
		}
	}
	
	res = res.slice(0, -1)
	
	return res
}


class RequestService {
	asyncQuery = async (method, url, params) => {
		let errors
		let res
		try {
			res = await axios({
				method: method,
				url: `${apiUrl}${url}`,
				[method === 'get' ? 'params' : 'data']: params
			})
				.catch((error) => {
					errors = error.response
				})
		} catch (err) {
			throw new Error(err)
		}
		
		return res
	}
	
	fetchRepos = (params) => this.asyncQuery('get', '/search/repositories', params)
}

export default new RequestService()
