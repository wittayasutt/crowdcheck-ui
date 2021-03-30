import styled from 'styled-components';

// components
import Marker from '../Marker';

const Wrapper = styled.div``;

const Title = styled.h4`
	font-size: 14px;
	font-weight: 600;

	margin-bottom: 8px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 4px;
`;

const PlaceName = styled.div`
	font-size: 12px;
	font-weight: 600;

	margin-left: 8px;
`;

const mockSuggest = [
	{ name: 'BAAN Lek Tee Neung ( House No. 1 )', level: 1 },
	{ name: 'BAAN LIM NAME', level: 2 },
	{ name: 'CROWDED PLACE', level: 4 },
];

const Suggest = () => {
	const suggest = mockSuggest;

	return (
		suggest && (
			<Wrapper>
				<Title>Suggestion Place</Title>
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
