import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
	service_auth,
	service_get_venue_list,
	service_remove_venue,
	service_get_program_list,
	service_remove_program,
	service_get_area_list,
	service_remove_area,
	service_get_event_list,
	service_remove_event,
} from '../../services';

// components
import Header from '../../components/Header/admin';
import Layout from '../../components/Layout/admin';
import List from '../../components/List';
import Loading from '../../components/Loading';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	padding: 16px;
`;

const Admin = () => {
	const router = useRouter();
	const { locale } = router;

	const [loading, setLoading] = useState(true);
	const [venue, setVenue] = useState([]);
	const [program, setProgram] = useState([]);
	const [area, setArea] = useState([]);
	const [event, setEvent] = useState([]);

	const checkAuth = () => {
		setLoading(true);

		try {
			service_auth()
				.then((res) => {
					if (res.status === 'success') {
						getVenue();
						getArea();
					} else {
						router.push('/admin/login');
					}
				})
				.catch(() => {
					router.push('/admin/login');
				});
		} catch {
			router.push('/admin/login');
		}
	};

	const getVenue = () => {
		try {
			service_get_venue_list().then((res) => {
				if (res.status === 'success') {
					setVenue(res.data);
				}

				setLoading(false);
			});
		} catch {}
	};

	const removeVenueById = (id) => {
		try {
			service_remove_venue(id).then((res) => {
				if (res.status === 'success') {
					getVenue();
				}
			});
		} catch {}
	};

	const getProgram = (id) => {
		try {
			service_get_program_list(id).then((res) => {
				if (res.status === 'success') {
					setProgram(res.data);
				}
			});
		} catch {}
	};

	const removeProgramById = (id, subId) => {
		try {
			service_remove_program(id, subId).then((res) => {
				if (res.status === 'success') {
					getVenue();
					getProgram(id);
				}
			});
		} catch {}
	};

	const getArea = () => {
		try {
			service_get_area_list().then((res) => {
				if (res.status === 'success') {
					setArea(res.data);
				}

				setLoading(false);
			});
		} catch {}
	};

	const removeAreaById = (id) => {
		try {
			service_remove_area(id).then((res) => {
				if (res.status === 'success') {
					getArea();
				}
			});
		} catch {}
	};

	const getEvent = (id) => {
		try {
			service_get_event_list(id).then((res) => {
				if (res.status === 'success') {
					setEvent(res.data);
				}
			});
		} catch {}
	};

	const removeEventById = (id, subId) => {
		try {
			service_remove_event(id, subId).then((res) => {
				if (res.status === 'success') {
					getArea();
					getEvent(id);
				}
			});
		} catch {}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			<Header />
			{!loading ? (
				<Layout>
					<Wrapper>
						<List
							title={t[locale].area}
							onSelect={getEvent}
							type='area'
							data={area}
							onRemove={removeAreaById}
							subType='event'
							subData={event}
							onRemoveSub={removeEventById}
						/>
						<List
							title={t[locale].venue}
							onSelect={getProgram}
							type='venue'
							data={venue}
							onRemove={removeVenueById}
							subType='program'
							subData={program}
							onRemoveSub={removeProgramById}
						/>
					</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default Admin;
