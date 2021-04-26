import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent, transformCrowdData } from '../../helpers';

// components
import Marker from '../Marker';
import Loading from '../Loading';

// lang
import t from '../../translate';

const useRedux = () => {
	const crowd = useSelector((state) => state.crowdData);

	return { crowd };
};

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

	const { crowd } = useRedux();

	const [suggest, setSuggest] = useState(null);

	useEffect(() => {
		if (data === 'loading') {
			setSuggest(data);
			return;
		}

		const suggestData = transformCrowdData(data, crowd);
		if (suggestData && suggestData.length > 0) {
			setSuggest(suggestData);
		} else {
			setSuggest(null);
		}
	}, [data]);

	return (
		suggest && (
			<Wrapper>
				<Title>{t[locale].suggestionPlace}</Title>
				{suggest !== 'loading' ? (
					suggest.map(
						(item, index) =>
							item.crowd.value &&
							item.name && (
								<Row key={index}>
									<Marker level={item.crowd.value} />

									<PlaceName>{getContent(item.name, locale)}</PlaceName>
								</Row>
							)
					)
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
