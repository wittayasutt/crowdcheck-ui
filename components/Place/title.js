import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getLevelColor } from '../../helpers';
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
	height: ${(props) => (props.hasCovidConditions ? '120px' : '80px')};
	padding: 16px;
	display: flex;
	flex-direction: column;
	position: relative;

	background-color: ${(props) => props.theme.color[props.levelColor]};

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		height: ${(props) => (props.hasCovidConditions ? '96px' : '56px')};
	}
`;

const CovidConditions = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.color.white};
`;

const Require = styled.span`
	font-size: 14px;
	margin-right: 16px;
`;

const RequireImage = styled.img`
	margin-right: 8px;
`;

const RequireText = styled.span`
	font-size: 10px;
	margin-right: 16px;
`;

const Content = styled.div`
	display: flex;
	color: ${(props) => props.theme.color.black};
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

const Space = styled.div`
	flex: 1;
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 14px;
	width: 14px;
	color: ${(props) => props.theme.color.black};

	cursor: pointer;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		position: absolute;
		top: 4px;
		right: 4px;
	}
`;

const PlaceTitle = ({ data, updatedTime, isMini }) => {
	const router = useRouter();
	const { locale } = router;

	const { deselectPlace } = useRedux();

	const handleClosePlace = () => {
		deselectPlace();
	};

	const getTitle = (level) => {
		switch (level) {
			case 0:
				return t[locale].place.noData;
			case 1:
				return t[locale].place.goAhead;
			case 2:
				return t[locale].place.go;
			case 3:
				return t[locale].place.wait;
			case 4:
				return t[locale].place.avoid;
			default:
				return t[locale].place.noData;
		}
	};

	const getVaccine = (numberOfVaccine) => {
		switch (numberOfVaccine) {
			case 0:
				return 'notRequire';
			case 1:
				return 'requireOne';
			case 2:
				return 'requireTwo';
			default:
				return null;
		}
	};

	const covidConditions = data.covidConditions;
	const requireVaccine = covidConditions ? getVaccine(covidConditions.numberOfVaccineDosesRequired) : null;

	return data && ((data.crowd && data.crowd.value) || isMini) ? (
		<Wrapper
			levelColor={data.crowd && data.crowd.value ? getLevelColor(data.crowd.value) : getLevelColor(0)}
			onClick={handleClosePlace}
			hasCovidConditions={covidConditions}
		>
			{covidConditions && (
				<CovidConditions>
					<Require>{t[locale].require}</Require>
					{covidConditions.isATKRequiredOnSite && (
						<>
							<RequireImage src={'/images/filter/atkOnSite.svg'} alt='atk' style={{ height: '16px' }} />
							<RequireText>{t[locale].atkTestOnSite}</RequireText>
						</>
					)}
					{covidConditions.isATKRequired && !covidConditions.isATKRequiredOnSite && (
						<>
							<RequireImage src={'/images/filter/atk.svg'} alt='atk' style={{ height: '16px' }} />
							<RequireText>{t[locale].atkTestResult}</RequireText>
						</>
					)}
					{requireVaccine && (
						<>
							<RequireImage src={`/images/filter/${requireVaccine}.svg`} alt='vaccine' style={{ height: '16px' }} />
							<RequireText>{t[locale].vaccine[requireVaccine]}</RequireText>
						</>
					)}
					{!isMini && (
						<>
							<Space />
							<IconCaretDown icon={faCaretDown} />
						</>
					)}
				</CovidConditions>
			)}
			<Content>
				<Left>{data.crowd && data.crowd.value ? getTitle(data.crowd.value) : getTitle(0)}</Left>
				<Right>
					{data.venueName && <div className='place-name'>{data.venueName}</div>}
					<div className='updated-time'>
						<span>
							({t[locale].update} {dayjs(updatedTime).format('DD/MM/YYYY , hh:mm a')})
						</span>

						{!covidConditions && <IconCaretDown icon={faCaretDown} />}
					</div>
				</Right>
			</Content>
		</Wrapper>
	) : null;
};

PlaceTitle.propTypes = {
	data: PropTypes.object,
	updatedTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
};

PlaceTitle.defaultProps = {
	data: null,
	updatedTime: new Date(),
};

export default PlaceTitle;
