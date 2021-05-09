import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getLevelColor } from '../../helpers';

const useRedux = () => {
	const showPlaceName = useSelector((state) => state.showPlaceName);

	return { showPlaceName };
};

const Image = styled.img`
	cursor: pointer;
`;

const Span = styled.span`
	display: flex;
	width: max-content;
	font-size: 14px;
	font-weight: 600;
	text-shadow: 1px 1px 4px ${(props) => props.theme.color.white};

	position: absolute;
	top: 8px;
	left: 36px;
`;

const Marker = ({ level, title, onClick }) => {
	const { showPlaceName } = useRedux();
	const marker = getLevelColor(level);

	return (
		<>
			<Image
				src={`/images/${marker}.png`}
				alt='marker'
				style={{ height: '32px', width: '32px' }}
				onClick={onClick}
			/>
			{showPlaceName && <Span>{title}</Span>}
		</>
	);
};

Marker.propTypes = {
	level: PropTypes.number,
};

Marker.defaultProps = {
	level: 0,
};

export default Marker;
