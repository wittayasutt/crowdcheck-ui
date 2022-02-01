import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getContent } from '../../../helpers';

// services
import { service_get_venue } from '../../../services';

// components
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';

// lang
import t from '../../../translate';

const Wrapper = styled.div`
	max-width: ${(props) => props.theme.breakpoint};
	margin: auto;
	padding: 16px;

	overflow: auto;
`;

const Title = styled.h1`
	display: flex;
	margin-bottom: 16px;
`;

const NotFound = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	min-height: 20vh;
`;

const Columns = styled.div`
	display: flex;
	margin-bottom: 16px;

	.column:first-child {
		margin-right: 8px;
	}
`;

const Column = styled.div`
	flex: 1;
`;

const Label = styled.div`
	margin-bottom: 8px;
`;

const Input = styled.input``;

const MiniCrowdcheckList = () => {
	const router = useRouter();
	const { locale } = router;
	const { id } = router.query;

	const [loading, setLoading] = useState(true);
	const [venue, setVenue] = useState([]);
	const [height, setHeight] = useState(300);
	const [width, setWidth] = useState(300);
	const [isError, setIsError] = useState(false);

	const getVenue = async () => {
		try {
			setLoading(true);

			const res = await service_get_venue(id);
			if (res.status === 'success') {
				setVenue(res.data);
				setLoading(false);
			} else {
				setIsError(true);
				setLoading(false);
			}
		} catch {
			setIsError(true);
		}
	};

	useEffect(() => {
		if (id) {
			getVenue();
		}
	}, [id]);

	return (
		<>
			<Header>
				<title>Mini Crowdcheck | Crowdcheck.info</title>
			</Header>
			{!loading ? (
				<Layout>
					<Wrapper>
						{isError ? (
							<NotFound>{t[locale].venueNotFound}</NotFound>
						) : (
							<>
								<Title>{getContent(venue.name, locale)}</Title>
								<Columns>
									<Column className='column'>
										<Label>{t[locale].width}</Label>
										<Input className='input' type='number' value={width} onChange={(e) => setWidth(e.target.value)} />
									</Column>
									<Column className='column'>
										<Label>{t[locale].height}</Label>
										<Input className='input' type='number' value={height} onChange={(e) => setHeight(e.target.value)} />
									</Column>
								</Columns>

								<Label>{t[locale].copyThisLink}</Label>
								<Input
									className='input'
									type='text'
									value={`<iframe src="https://${
										window.location.host
									}/mini/${id}" height="${height}" width="${width}" title="${getContent(venue.name, 'en')}"></iframe>`}
									onChange={() => {}}
								/>
							</>
						)}
					</Wrapper>
				</Layout>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default MiniCrowdcheckList;
