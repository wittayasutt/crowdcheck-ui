import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent } from '../../helpers';

// components
import Marker from '../Marker';
import Loading from '../Loading';

// lang
import t from '../../translate';

const Wrapper = styled.div``;

const Title = styled.h4`
	font-size: 14px;
	font-weight: 500;

	margin-bottom: 8px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 4px;
`;

const PlaceName = styled.div`
	font-size: 10px;
	font-weight: 500;

	margin-left: 8px;
`;

const Suggest = ({ data }) => {
	const router = useRouter();
	const { locale } = router;

	return (
		data && (
			<Wrapper>
				<Title>{t[locale].suggestionPlace}</Title>
				{data !== 'loading' ? (
					data.map((item, index) => (
						<Row key={index}>
							{item.level ? <Marker level={1} /> : <Marker level={1} />}
							{/* {item.level ? <Marker level={1} /> : <Marker level={0} />} */}
							{item.name && (
								<PlaceName>{getContent(item.name, locale)}</PlaceName>
							)}
						</Row>
					))
				) : (
					<Loading />
				)}
			</Wrapper>
		)
	);
};

Suggest.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Suggest.defaultProps = {
	data: null,
};

export default Suggest;
