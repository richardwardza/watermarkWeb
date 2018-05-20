import { API_SERVER } from './constants';

export async function apiRequest(url, body = {}, method = "POST", headers) {

	const request = {
		body,
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			...headers
		},
		method: method
	}
	try {
		url = API_SERVER+url;
		return await fetch(url, request);
	}
	catch(err) {
		console.log("Error contacting API");
	}
}