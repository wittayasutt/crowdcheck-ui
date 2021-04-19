import styled from 'styled-components';
import { useRouter } from 'next/router';

// components
import Marker from '../Marker';

// lang
import t from '../../translate';

const Wrapper = styled.div``;

const Title = styled.h4`
	font-size: 14px;
	font-weight: 500;

	margin-bottom: 8px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 4px;
`;

const PlaceName = styled.div`
	font-size: 10px;
	font-weight: 500;

	margin-left: 8px;
`;

const mockSuggest = [
	{ name: 'BAAN Lek Tee Neung ( House No. 1 )', level: 1 },
	{ name: 'BAAN LIM NAME', level: 2 },
	{ name: 'CROWDED PLACE', level: 4 },
];

const Suggest = () => {
	const router = useRouter();
	const { locale } = router;

	const suggest = mockSuggest;

	return (
		suggest && (
			<Wrapper>
				<Title>{t[locale].suggestionPlace}</Title>
				{suggest.map((item, index) => (
					<Row key={index}>
						{item.level ? <Marker level={item.level} /> : <Marker level={0} />}
						{item.name && <PlaceName>{item.name}</PlaceName>}
					</Row>
				))}
			</Wrapper>
		)
	);
};

export default Suggest;
