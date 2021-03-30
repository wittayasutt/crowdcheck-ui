import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getLevelColor } from '../../helpers';
import dayjs from 'dayjs';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const usePlace = () => {
	const dispatch = useDispatch();
	const deselectPlace = () => dispatch({ type: 'DESELECT_PLACE' });

	return { deselectPlace };
};

const Wrapper = styled.div`
	height: 88px;
	padding: 16px;
	display: flex;
	color: ${(props) => props.theme.color.black};

	background-color: ${(props) => props.theme.color[props.levelColor]};
`;

const Left = styled.div`
	min-width: 80px;
	display: flex;
	align-items: center;

	font-size: 18px;
	font-weight: 600;
	line-height: 1.25;
`;

const Right = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	margin-left: 16px;

	.place-name {
		font-size: 12px;
		font-weight: 600;
		line-height: 1.25;
	}

	.updated-time {
		display: flex;
		font-size: 10px;

		span {
			flex: 1;
		}
	}
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 14px;
	width: 14px;

	cursor: pointer;
`;

const PlaceTitle = ({ data }) => {
	const { deselectPlace } = usePlace();

	const handleClosePlace = () => {
		deselectPlace();
	};

	const getTitle = (level) => {
		switch (level) {
			case 1:
				return 'Go Ahead!';
			case 2:
				return 'Go Ahead!';
			case 3:
				return 'Avoid';
			case 4:
				return 'Avoid';
			default:
				'';
		}
	};

	return data ? (
		<Wrapper levelColor={getLevelColor(data.level)} onClick={handleClosePlace}>
			<Left>{getTitle(data.level)}</Left>
			<Right>
				<div className='place-name'>{data.programName}</div>
				<div className='updated-time'>
					<span>
						(update {dayjs(data.date).format('DD/MM/YYYY , hh:mm a')})
					</span>

					<IconCaretDown icon={faCaretDown} />
				</div>
			</Right>
		</Wrapper>
	) : null;
};

PlaceTitle.propTypes = {
	data: PropTypes.object,
};

PlaceTitle.defaultProps = {
	data: null,
};

export default PlaceTitle;
