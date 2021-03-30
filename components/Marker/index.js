import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getLevelColor } from '../../helpers';

const Image = styled.img`
	cursor: pointer;
`;

const Marker = ({ level, onClick }) => {
	const marker = getLevelColor(level);

	return (
		<Image
			src={`/images/${marker}.png`}
			alt='marker'
			style={{ height: '32px', width: '32px' }}
			onClick={onClick}
		/>
	);
};

Marker.propTypes = {
	level: PropTypes.number,
};

Marker.defaultProps = {
	level: 0,
};

export default Marker;
