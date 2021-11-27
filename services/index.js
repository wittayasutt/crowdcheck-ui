import axios from 'axios';
import Cookies from 'js-cookie';

const url = process.env.API_BASE_URL;
const crowdUrl = process.env.API_CROWD_URL;

let $axios = axios.create();
$axios.defaults.timeout = 60000;

const getHeaders = () => {
	const token = Cookies.get('token') || null;

	return {
		Authorization: `Token ${token}`,
	};
};

// #region AUTH

export const service_login = (username, password) => {
	return $axios
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
	return $axios
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

export const service_auth = () => {
	return $axios
		.get(`${url}/api/users/auth`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		});
};

// #endregion

// #region VENUE

export const service_get_venue_list = () => {
	return $axios
		.get(`${url}/api/venues`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_venue = (id) => {
	return $axios
		.get(`${url}/api/venues/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_create_venue = (payload) => {
	return $axios
		.post(
			`${url}/api/venues`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_update_venue = (payload, id) => {
	return $axios
		.put(
			`${url}/api/venues/${id}`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_remove_venue = (id) => {
	return $axios
		.delete(`${url}/api/venues/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_venue_nearby = (id) => {
	return $axios
		.get(`${url}/api/venues/suggest/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

// #endregion

// #region PROGRAM

export const service_get_program_list = (venueId) => {
	return $axios
		.get(`${url}/api/venues/${venueId}/programs`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_program = (venueId, id) => {
	return $axios
		.get(`${url}/api/venues/${venueId}/programs/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_create_program = (payload, venueId) => {
	return $axios
		.post(
			`${url}/api/venues/${venueId}/programs`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_update_program = (payload, venueId, id) => {
	return $axios
		.put(
			`${url}/api/venues/${venueId}/programs/${id}`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_remove_program = (venueId, id) => {
	return $axios
		.delete(`${url}/api/venues/${venueId}/programs/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

// #endregion

// #region AREA AND EVENT

export const service_get_area_and_event = () => {
	return $axios
		.get(`${url}/api/areas/events/all`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

// #region AREA

export const service_get_area_list = () => {
	return $axios
		.get(`${url}/api/areas`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_area = (id) => {
	return $axios
		.get(`${url}/api/areas/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_create_area = (payload) => {
	return $axios
		.post(
			`${url}/api/areas`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_update_area = (payload, id) => {
	return $axios
		.put(
			`${url}/api/areas/${id}`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_remove_area = (id) => {
	return $axios
		.delete(`${url}/api/areas/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

// #endregion

// #region EVENT

export const service_get_event_list = (areaId) => {
	return $axios
		.get(`${url}/api/areas/${areaId}/events`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_event = (areaId, id) => {
	return $axios
		.get(`${url}/api/areas/${areaId}/events/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_create_event = (payload, areaId) => {
	return $axios
		.post(
			`${url}/api/areas/${areaId}/events`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_update_event = (payload, areaId, id) => {
	return $axios
		.put(
			`${url}/api/areas/${areaId}/events/${id}`,
			{
				...payload,
			},
			{
				headers: getHeaders(),
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_remove_event = (areaId, id) => {
	return $axios
		.delete(`${url}/api/areas/${areaId}/events/${id}`, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

// #endregion

export const service_upload_image = (payload) => {
	return $axios
		.post(`${url}/api/images/upload`, payload, {
			headers: getHeaders(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};

export const service_get_crowd = () => {
	return $axios
		.get(crowdUrl)
		.then((response) => {
			return response.data;
		})
		.catch((err) => err);
};
