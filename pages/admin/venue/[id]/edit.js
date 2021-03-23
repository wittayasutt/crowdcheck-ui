import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// components
import Header from '../../../../components/Header/admin';
import Layout from '../../../../components/Layout/admin';
import Form from '../../../../components/Form';

// mock
import mockData from '../../../../mock/venueList';

const Wrapper = styled.div`
	padding: 16px;
`;

const AdminItemEditVenue = () => {
	const router = useRouter();
	const { id } = router.query;

	const [data, setData] = useState({});

	useEffect(() => {
		// TODO: Check id
		console.log('id', id);
		setData(mockData[0]);
	}, [id]);

	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<Wrapper>
						{data && <Form action='EDIT' formType='VENUE' data={data} />}
					</Wrapper>
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminItemEditVenue;
