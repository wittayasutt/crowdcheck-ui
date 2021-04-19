import axios from 'axios';
import Cookies from 'js-cookie';

const url = 'https://crowdcheck-api.df.r.appspot.com';
const token = Cookies.get('token') || null;

const headers = {
	Authorization: `Token ${token}`,
};

// #region AUTH

export const service_login = (username, password) => {
	return axios
		.post(`${url}/api/users/login`, {
			user: {
				username,
				password,
			},
		})
		.then((response) => {
			return response.data;
		});
};

export const service_register = (username, password) => {
	return axios
		.post(`${url}/api/users/register`, {
			user: {
				username,
				password,
			},
		})
		.then((response) => {
			return response.data;
		});
};

// #endregion

// #region VENUE

export const service_get_venue_list = () => {
	return axios
		.get(`${url}/api/venues`, {
			headers,
		})
		.then((response) => {
			console.log('response', response);
			return response.data;
		});
};

export const service_get_venue = (token, id) => {
	return axios
		.get(`${url}/api/venues/${id}`, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

export const service_create_venue = (token, payload) => {
	return axios
		.post(
			`${url}/api/venues`,
			{
				...payload,
			},
			{
				headers: headers(token),
			}
		)
		.then((response) => {
			return response.data;
		});
};

export const service_update_venue = (token, id, payload) => {
	return axios
		.post(
			`${url}/api/venues${id}`,
			{
				...payload,
			},
			{
				headers: headers(token),
			}
		)
		.then((response) => {
			return response.data;
		});
};

export const service_remove_venue = (token, id) => {
	return axios
		.delete(`${url}/api/venues${id}`, null, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

export const service_get_venue_nearby = (token, id) => {
	return axios
		.get(`${url}/api/venues/suggest/${id}`, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

// #endregion

// #region PROGRAM

export const service_get_program_list = (token, venueId) => {
	return axios
		.get(`${url}/api/venues/${venueId}/programs`, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

export const service_get_program = (token, venueId, id) => {
	return axios
		.get(`${url}/api/venues/${venueId}/programs/${id}`, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

export const service_create_program = (token, venueId, payload) => {
	return axios
		.post(
			`${url}/api/venues/${venueId}/programs`,
			{
				...payload,
			},
			{
				headers: headers(token),
			}
		)
		.then((response) => {
			return response.data;
		});
};

export const service_update_program = (token, venueId, id, payload) => {
	return axios
		.post(
			`${url}/api/venues/${venueId}/programs/${id}`,
			{
				...payload,
			},
			{
				headers: headers(token),
			}
		)
		.then((response) => {
			return response.data;
		});
};

export const service_remove_program = (token, venueId, id) => {
	return axios
		.delete(`${url}/api/venues/${venueId}/programs/${id}`, null, {
			headers: headers(token),
		})
		.then((response) => {
			return response.data;
		});
};

// #endregion

export const service_upload_image = (token, payload) => {
	return axios
		.post(
			`${url}/api/images/upload`,
			{
				...payload,
			},
			{
				headers: headers(token),
			}
		)
		.then((response) => {
			return response.data;
		});
};
