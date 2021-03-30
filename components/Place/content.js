import styled from 'styled-components';
import PropTypes from 'prop-types';

// components
import People from './people';
import Trend from './trend';
import Suggest from './suggest';

const Wrapper = styled.div`
	height: calc((100vh - 64px) * 0.9 - 88px);
	padding: 8px 16px;
	overflow-y: auto;
`;

const Title = styled.h2`
	font-size: 16px;
	text-transform: uppercase;

	margin-top: 4px;
`;

const Date = styled.p`
	font-size: 14px;
	font-weight: 500;

	margin: 8px 0;
`;

const Image = styled.img``;

const Detail = styled.p`
	font-size: 12px;

	margin: 8px 0;
`;

const PlaceContent = ({ data }) => {
	return data ? (
		<Wrapper>
			<People data={data} />
			<Title>{data.programName}</Title>
			<Date>1-9 FEB | 11:00-21:00</Date>
			<Image src={data.programImage} alt={data.programName} />
			<Detail>{data.detail}</Detail>
			<Trend />
			<Suggest />
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
