import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

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

const Date = styled.p`
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

	return data ? (
		<Wrapper>
			<People data={data} />
			<Title>{data.programName}</Title>
			<SubTitle>{data.programType}</SubTitle>
			<Date>1-9 FEB | 11:00-21:00</Date>
			<Owner>{data.owner}</Owner>

			<Bottom>
				<BottomLeft>
					<Image src={data.programImage} alt={data.programName} />
					<Detail className='_hide-mobile'>{data.detail}</Detail>
					<Trend />
					<Suggest />
				</BottomLeft>

				<BottomRight>
					<Detail className='_hide-desktop'>{data.detail}</Detail>
					<LinkWrapper>
						<a href={data.link.to} target='_blank'>
							<IconAngleLeft icon={faCaretRight} />
							<span>
								{t[locale].linkTo} {data.link.title}
							</span>
						</a>
					</LinkWrapper>
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
