import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { getContent, formatDate, formatTime } from '../../helpers';

// components
import People from './people';
import Trend from './trend';
import Suggest from './suggest';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	height: ${(props) => (props.isMini ? '100%' : 'calc((100vh - 64px) * 0.9 - 80px)')};
	padding: 8px 16px;
	overflow-y: auto;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		height: ${(props) => (props.isMini ? '100%' : 'calc((100vh - 112px) - 56px)')};
	}

	._hide-mobile {
		@media (min-width: ${(props) => props.theme.breakpoint}) {
			display: none;
		}
	}

	._hide-desktop {
		display: none;

		@media (min-width: ${(props) => props.theme.breakpoint}) {
			display: initial;
		}
	}
`;

const Program = styled.div`
	margin-bottom: ${(props) => (props.last ? '0' : '8px')};
	padding-bottom: ${(props) => (props.last ? '0' : '8px')};
	border-bottom: ${(props) => (props.last ? '0' : '1px')} solid ${(props) => props.theme.color.darkGray};
`;

const Title = styled.h2`
	font-size: 16px;
	font-weight: 500;
	text-transform: uppercase;

	margin-top: 8px;
`;

const SubTitle = styled.p`
	font-size: 10px;
	margin: 4px 0;
`;

const DateTime = styled.p`
	font-size: 12px;
	font-weight: 500;

	margin: 4px 0;
`;

const Owner = styled.p`
	font-size: 10px;
	margin: 4px 0;
`;

const Image = styled.img`
	margin: 8px 0;
`;

const Detail = styled.p`
	font-size: 10px;
	margin: 8px 0;
`;

const LinkWrapper = styled.div`
	font-size: 14px;
	font-style: italic;

	margin-top: 8px;

	a {
		display: flex;
		align-items: center;
	}

	svg {
		height: 16px;
		width: 16px;
	}
`;

const Bottom = styled.div`
	display: flex;
`;

const BottomLeft = styled.div`
	width: 100%;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		width: 50%;
	}
`;

const BottomRight = styled.div`
	display: none;
	padding-left: 8px;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: initial;
		width: 50%;
	}
`;

const IconAngleLeft = styled(FontAwesomeIcon)`
	height: 24px;
	width: 24px;
`;

const Logo = styled.img`
	display: flex;
	height: 56px;
	margin: auto;
`;

const PlaceContent = ({ data, isMini }) => {
	const router = useRouter();
	const { locale } = router;

	const getShowDate = (dates) => {
		const FORMAT_DATE = 'DD MMM';

		const start = formatDate(dates.start, FORMAT_DATE);
		const end = formatDate(dates.end, FORMAT_DATE);

		if (start === end) {
			return start;
		}

		return `${start} - ${end}`;
	};

	const getShowTime = (hours) => {
		const FORMAT_TIME = 'HH:mm';

		const start = formatTime(hours.start, FORMAT_TIME);
		const end = formatTime(hours.end, FORMAT_TIME);

		if (start === end) {
			return start;
		}

		return `${start} - ${end}`;
	};

	const getLink = (website) => {
		if (!website[0] || !website[0].url) {
			return;
		}

		const { url } = website[0];
		if (url.indexOf('http') === -1) {
			return `http://${url}`;
		}

		return url;
	};

	const getLinkTitle = (website) => {
		if (!website[0] || !website[0].name) {
			return;
		}

		return getContent(website[0].name, locale);
	};

	return data ? (
		<Wrapper isMini>
			{data.crowd && data.crowd.value && <People level={data.crowd.value} />}

			{!isMini &&
				data.programs &&
				data.programs.map((program, index) => {
					const link = program.website ? getLink(program.website) : null;
					const linkTitle = program.website ? getLinkTitle(program.website) : null;
					const showDate =
						program.openingTime && program.openingTime.dates ? getShowDate(program.openingTime.dates) : null;
					const showTime =
						program.openingTime && program.openingTime.hours ? getShowTime(program.openingTime.hours) : null;

					return (
						<Program last={index === data.programs.length - 1} key={index}>
							{program.name && <Title>{getContent(program.name, locale)}</Title>}
							{program.type && <SubTitle>{getContent(program.type, locale)}</SubTitle>}
							{(showDate || (showDate && showTime)) && (
								<DateTime>
									{showDate}
									{showTime && ` | ${showTime}`}
								</DateTime>
							)}
							{program.owner && <Owner>{getContent(program.owner, locale)}</Owner>}

							<Bottom>
								<BottomLeft>
									{program.images &&
										program.images.map((image, index) => (
											<Image key={index} src={image} alt={getContent(program.name, locale)} />
										))}
									{program.description && (
										<Detail className='_hide-mobile'>{getContent(program.description, locale)}</Detail>
									)}
								</BottomLeft>

								<BottomRight>
									{program.description && (
										<Detail className='_hide-desktop'>{getContent(program.description, locale)}</Detail>
									)}
									{link && linkTitle && (
										<LinkWrapper>
											<a href={link} target='_blank'>
												<IconAngleLeft icon={faCaretRight} />
												<span>
													{t[locale].linkTo} {linkTitle}
												</span>
											</a>
										</LinkWrapper>
									)}
								</BottomRight>
							</Bottom>
						</Program>
					);
				})}
			{data.crowd && data.crowd.historic && <Trend data={data.crowd.historic} />}
			{!isMini && data.nearby && <Suggest data={data.nearby} />}
			{isMini && <Logo src='/logo.png' alt='logo' />}
		</Wrapper>
	) : null;
};

PlaceContent.propTypes = {
	data: PropTypes.object,
};

PlaceContent.defaultProps = {
	data: null,
};

export default PlaceContent;
