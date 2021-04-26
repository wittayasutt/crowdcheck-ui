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
	height: calc((100vh - 64px) * 0.9 - 80px);
	padding: 8px 16px;
	overflow-y: auto;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		height: calc((100vh - 112px) - 56px);
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

const PlaceContent = ({ data }) => {
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

	const showDate =
		data.openingTime && data.openingTime.dates
			? getShowDate(data.openingTime.dates)
			: null;

	const showTime =
		data.openingTime && data.openingTime.hours
			? getShowTime(data.openingTime.hours)
			: null;

	const link = data.website ? getLink(data.website) : null;

	const linkTitle = data.website ? getLinkTitle(data.website) : null;

	return data ? (
		<Wrapper>
			<People level={1} />
			{data.name && <Title>{getContent(data.name, locale)}</Title>}
			{data.type && <SubTitle>{getContent(data.type, locale)}</SubTitle>}
			{(showDate || (showDate && showTime)) && (
				<DateTime>
					{showDate}
					{showTime && ` | ${showTime}`}
				</DateTime>
			)}
			{data.owner && <Owner>{getContent(data.owner, locale)}</Owner>}

			<Bottom>
				<BottomLeft>
					{data.images &&
						data.images.map((image, index) => (
							<Image
								key={index}
								src={image}
								alt={getContent(data.name, locale)}
							/>
						))}
					{data.description && (
						<Detail className='_hide-mobile'>
							{getContent(data.description, locale)}
						</Detail>
					)}
					<Trend />
					{data.nearby && <Suggest data={data.nearby} />}
				</BottomLeft>

				<BottomRight>
					{data.description && (
						<Detail className='_hide-desktop'>
							{getContent(data.description, locale)}
						</Detail>
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
