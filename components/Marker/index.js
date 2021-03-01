import PropTypes from 'prop-types'

const getMarker = (level) => {
	switch (level) {
		case 1:
			return 'green'
		case 2:
			return 'soft-green'
		case 3:
			return 'soft-red'
		case 4:
			return 'red'
		default:
			return 'green'
	}
}

const Marker = ({ level }) => {
	const marker = getMarker(level)

	return <img src={`/images/${marker}.png`} alt='marker' />
}

Marker.propTypes = {
	level: PropTypes.number,
}

Marker.defaultProps = {
	level: 1,
}

export default Marker
