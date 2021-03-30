import styled from 'styled-components';
import PropTypes from 'prop-types';

const getMarker = (level) => {
	switch (level) {
		case 0:
			return 'pointer';
		case 1:
			return 'green';
		case 2:
			return 'softGreen';
		case 3:
			return 'softRed';
		case 4:
			return 'red';
		default:
			return 'green';
	}
};

const Marker = ({ level }) => {
	const marker = getMarker(level);

	return (
		<img
			src={`/images/${marker}.png`}
			alt='marker'
			style={{ height: '32px', width: '32px' }}
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
