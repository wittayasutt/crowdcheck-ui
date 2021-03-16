import styled from 'styled-components';

// components
import Zoom from '../Base/zoom';
import Marker from '../Marker';

const Wrapper = styled.div``;

const Row = styled.div`
	min-height: 42px;
	display: flex;
	align-items: center;
	margin: 8px 0;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-left: 16px;

		strong {
			font-size: 13px;
		}
	}
`;

const LegendContent = () => {
	return (
		<Wrapper>
			<Row>
				<Marker level={0} />
				<p>Find where you are</p>
			</Row>
			<Row>
				<Zoom />
				<p>Zoom in for spacific location</p>
			</Row>
			<Row>
				<Marker level={1} />
				<p>
					Exceed capacity of the venue. ‘Maybe this is not the right time,{' '}
					<strong>avoid</strong> the crowd is better than join it’
				</p>
			</Row>
			<Row>
				<Marker level={2} />
				<p>
					Max capacity of the venue. ‘If it the place for you,{' '}
					<strong>wait</strong> until the right moment ’
				</p>
			</Row>
			<Row>
				<Marker level={3} />
				<p>
					75% capacity of the venue. ‘Don’t you feel it right,{' '}
					<strong>go</strong> and have some fun with the place’
				</p>
			</Row>
			<Row>
				<Marker level={4} />
				<p>
					50% capacity of the venue. ‘Perspective is how we see,{' '}
					<strong>go ahead!</strong>
					Plenty of space is best for a good shot’
				</p>
			</Row>
		</Wrapper>
	);
};

export default LegendContent;
