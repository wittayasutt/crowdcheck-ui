import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getContent, getMatchingProgram } from '../../helpers';

// services
import { service_get_venue, service_get_program_list, service_get_crowd } from '../../services';

// components
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Content from '../../components/Place/content';
import PlaceTitle from '../../components/Place/title';

// lang
import t from '../../translate';

// Initial
const BYPASS = true;

const NotFound = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100%;
	min-height: 20vh;
`;

const MiniCrowdcheck = () => {
	const router = useRouter();
	const { locale } = router;
	const { id } = router.query;

	const [loading, setLoading] = useState(true);
	const [place, setPlace] = useState([]);
	const [updatedTime, setUpdatedTime] = useState(Date.now());

	const getVenue = async () => {
		try {
			setLoading(true);

			const resVenue = await service_get_venue(id);
			const resProgram = await service_get_program_list(id);
			const resCrowd = await service_get_crowd();

			if (resVenue.status !== 'success' || resProgram.status !== 'success' || !resCrowd) {
				return;
			}

			const matchedPrograms = getMatchingProgram(resProgram.data, BYPASS);
			const placeData = {
				programs: matchedPrograms.length > 0 ? matchedPrograms : 'NO_EVENT',
				venueName: getContent(resVenue.data.name, locale),
				crowd: BYPASS ? { value: 1 } : resCrowd[resVenue.data.refId],
				covidConditions: resVenue.data.covid19Conditions,
			};

			setPlace(placeData);
			setUpdatedTime(Date.now());
			setLoading(false);
		} catch {}
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
			{!loading && place ? (
				<>
					<PlaceTitle data={place} updatedTime={updatedTime} isMini />
					{place.programs === 'NO_EVENT' ? (
						<NotFound>{t[locale].programNotFound}</NotFound>
					) : (
						<Content data={place} isMini />
					)}
				</>
			) : (
				<Loading fullpage />
			)}
		</>
	);
};

export default MiniCrowdcheck;
