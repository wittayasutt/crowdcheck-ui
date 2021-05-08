import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getContent, getMatchingProgram } from '../../helpers';

import {
	service_get_program_list,
	service_get_venue_nearby,
} from '../../services';

// components
import Marker from '../Marker';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const selectPlace = (place) => dispatch({ type: 'SELECT_PLACE', place });
	const toLocation = (coord) => dispatch({ type: 'TO_LOCATION', coord });

	return { selectPlace, toLocation };
};

const Wrapper = styled.div``;

const TitleWrapper = styled.div`
	margin: 8px 0 16px;

	.title {
		font-size: 12px;
		font-weight: 600;

		margin-right: 16px;
	}

	.updated-time {
		display: flex;
		font-size: 10px;

		span {
			flex: 1;
		}
	}

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		margin: 0 0 8px;

		.title {
			display: none;
		}
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 8px;
`;

const PlaceName = styled.div`
	font-size: 12px;
	font-weight: 500;

	margin-left: 8px;
`;

const DensityContent = ({ data, updatedTime }) => {
	const router = useRouter();
	const { locale } = router;

	const { selectPlace, toLocation } = useRedux();

	const handleSelectPlace = (id, venueName, crowd) => {
		service_get_program_list(id).then((res) => {
			if (res.status === 'success') {
				const matchedPrograms = getMatchingProgram(res.data);

				if (matchedPrograms.length > 0 && crowd.value) {
					selectPlace({
						programs: matchedPrograms,
						venueName,
						crowd,
						nearby: 'loading',
					});

					handleGetNearlyPlace(id, matchedPrograms, venueName, crowd);
				} else {
					selectPlace({
						programs: 'NO_EVENT',
						venueName,
						crowd,
					});
				}
			}
		});
	};

	const handleGetNearlyPlace = (id, programs, venueName, crowd) => {
		service_get_venue_nearby(id).then((res) => {
			if (res.status === 'success') {
				selectPlace({
					programs,
					venueName,
					crowd,
					nearby: res.data,
				});
			}
		});
	};

	return (
		<Wrapper>
			<TitleWrapper>
				<span className='title'>{t[locale].densityListTitle}</span>
				<div className='updated-time'>
					({t[locale].update}{' '}
					{dayjs(updatedTime).format('DD/MM/YYYY , hh:mm a')})
				</div>
			</TitleWrapper>
			{data &&
				data.map((item) => {
					return item.crowd && item.crowd.value ? (
						<Row
							key={item._id}
							onClick={() => {
								handleSelectPlace(
									item._id,
									getContent(item.name, locale),
									item.crowd
								);

								toLocation(item.location);
							}}
						>
							{item.crowd.value && <Marker level={item.crowd.value} />}
							{item.name && (
								<PlaceName>{getContent(item.name, locale)}</PlaceName>
							)}
						</Row>
					) : null;
				})}
		</Wrapper>
	);
};

DensityContent.propTypes = {
	data: PropTypes.array,
	updatedTime: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.instanceOf(Date),
	]),
};

DensityContent.defaultProps = {
	data: [],
	updatedTime: new Date(),
};

export default DensityContent;
