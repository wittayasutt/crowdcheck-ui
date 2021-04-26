import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getContent, getLevelColor } from '../../helpers';
import dayjs from 'dayjs';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// lang
import t from '../../translate';

const useRedux = () => {
	const dispatch = useDispatch();
	const deselectPlace = () => dispatch({ type: 'DESELECT_PLACE' });

	return { deselectPlace };
};

const Wrapper = styled.div`
	height: 80px;
	padding: 16px;
	display: flex;
	color: ${(props) => props.theme.color.black};
	position: relative;

	background-color: ${(props) => props.theme.color[props.levelColor]};

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		height: 56px;
	}
`;

const Left = styled.div`
	min-width: 80px;
	display: flex;
	align-items: center;

	font-size: 18px;
	font-weight: 600;
	line-height: 1.25;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		min-width: 64px;
		font-size: 14px;
	}
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

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		flex-direction: row;
		align-items: center;

		.updated-time {
			margin-right: 8px;
		}
	}
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 14px;
	width: 14px;

	cursor: pointer;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		position: absolute;
		top: 4px;
		right: 4px;
	}
`;

const PlaceTitle = ({ data, updatedTime }) => {
	const router = useRouter();
	const { locale } = router;

	const { deselectPlace } = useRedux();

	const handleClosePlace = () => {
		deselectPlace();
	};

	const getTitle = (level) => {
		switch (level) {
			case 1:
				return t[locale].place.goAhead;
			case 2:
				return t[locale].place.go;
			case 3:
				return t[locale].place.wait;
			case 4:
				return t[locale].place.avoid;
			default:
				'';
		}
	};

	// TODO: add real level
	return data ? (
		<Wrapper levelColor={getLevelColor(data.level)} onClick={handleClosePlace}>
			<Left>{getTitle(data.level)}</Left>
			<Right>
				<div className='place-name'>{getContent(data.name, locale)}</div>
				<div className='updated-time'>
					<span>
						({t[locale].update}{' '}
						{dayjs(updatedTime).format('DD/MM/YYYY , hh:mm a')})
					</span>

					<IconCaretDown icon={faCaretDown} />
				</div>
			</Right>
		</Wrapper>
	) : null;
};

PlaceTitle.propTypes = {
	data: PropTypes.object,
	updatedTime: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.instanceOf(Date),
	]),
};

PlaceTitle.defaultProps = {
	data: null,
	updatedTime: new Date(),
};

export default PlaceTitle;
