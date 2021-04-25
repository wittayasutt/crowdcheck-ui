import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

// components
import Marker from '../Marker';

// lang
import t from '../../translate';

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

const mockDensity = [
	{ name: 'CROWDED PLACE', level: 4 },
	{ name: 'CROWDED PLACE', level: 4 },
	{ name: 'CROWDED PLACE', level: 4 },
	{ name: 'CROWDED PLACE', level: 4 },
	{ name: 'BAAN LIM NAME', level: 2 },
	{ name: 'BAAN Lek Tee Neung ( House No. 1 )', level: 1 },
];

const DensityContent = () => {
	const density = mockDensity;

	const router = useRouter();
	const { locale } = router;

	return (
		<Wrapper>
			<TitleWrapper>
				<span className='title'>{t[locale].densityListTitle}</span>
				<div className='updated-time'>
					({t[locale].update} {dayjs(Date.now()).format('DD/MM/YYYY , hh:mm a')}
					)
				</div>
			</TitleWrapper>
			{density.map((item, index) => (
				<Row key={index}>
					{item.level ? <Marker level={item.level} /> : <Marker level={0} />}
					{item.name && <PlaceName>{item.name}</PlaceName>}
				</Row>
			))}
		</Wrapper>
	);
};

export default DensityContent;