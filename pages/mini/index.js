import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getContent } from '../../helpers';

// services
import { service_get_venue_list } from '../../services';

// components
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';

const Wrapper = styled.div`
	max-width: ${(props) => props.theme.breakpoint};
	margin: auto;
	padding: 16px;
`;

const ListItem = styled.div`
	display: inline-flex;
	align-items: center;
	height: 48px;
	width: 100%;

	background-color: ${(props) => props.theme.color.softGreen};
	color: ${(props) => props.theme.color.white};
	font-weight: 600;

	margin-bottom: 8px;
	padding: 8px;
	border-radius: 2px;

	cursor: pointer;

	&:focus {
		outline: none;
	}
`;

const ListNo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 32px;
	width: 32px;
	border-right: 2px solid ${(props) => props.theme.color.white};
	margin-right: 8px;
`;

const ListName = styled.div``;

const MiniCrowdcheckList = () => {
	const router = useRouter();
	const { locale } = router;

	const [loading, setLoading] = useState(true);
	const [venue, setVenue] = useState([]);

	const getVenue = async () => {
		try {
			setLoading(true);

			const res = await service_get_venue_list();
			if (res.status === 'success') {
				setVenue(res.data);
				setLoading(false);
			}
		} catch {}
	};

	useEffect(() => {
		getVenue();
	}, []);

	return (
		<>
			<Header>
				<title>Mini Crowdcheck | Crowdcheck.info</title>
			</Header>
			{!loading ? (
				<Layout>
					<Wrapper>
						{venue.map((item, index) => (
							<Link href={`mini/${item._id}`} key={item._id}>
								<ListItem>
									<ListNo className='id'>{index + 1}</ListNo>
									<ListName className='item'>{getContent(item.name, locale)}</ListName>
								</ListItem>
							</Link>
						))}
					</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default MiniCrowdcheckList;
