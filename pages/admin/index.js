import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
	service_get_venue_list,
	service_remove_venue,
	service_get_program_list,
	service_remove_program,
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

	const getVenue = () => {
		setLoading(true);

		service_get_venue_list()
			.then((res) => {
				if (res.status === 'success') {
					setVenue(res.data);
				} else {
					router.push('/admin/login');
				}

				setLoading(false);
			})
			.catch(() => {
				router.push('/admin/login');
			});
	};

	const removeVenueById = (id) => {
		service_remove_venue(id).then((res) => {
			if (res.status === 'success') {
				getVenue();
			}
		});
	};

	const getProgram = (id) => {
		service_get_program_list(id).then((res) => {
			if (res.status === 'success') {
				setProgram(res.data);
			}
		});
	};

	const removeProgramById = (id, subId) => {
		service_remove_program(id, subId).then((res) => {
			if (res.status === 'success') {
				getVenue();
				getProgram(id);
			}
		});
	};

	useEffect(() => {
		getVenue();
	}, []);

	return (
		<>
			<Header />
			{!loading ? (
				<Layout>
					<Wrapper>
						<List
							title={t[locale].venue}
							data={venue}
							subData={program}
							type='venue'
							onSelect={getProgram}
							onRemove={removeVenueById}
							onRemoveSub={removeProgramById}
						/>
						{/* <List title='Others' /> */}
					</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default Admin;
