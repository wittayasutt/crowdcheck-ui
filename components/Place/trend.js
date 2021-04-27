import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getLevelColor } from '../../helpers';
import dayjs from 'dayjs';

// lang
import t from '../../translate';

const Wrapper = styled.div`
	margin-bottom: 16px;
`;

const Title = styled.h4`
	font-size: 14px;
	font-weight: 500;

	margin-bottom: 8px;
`;

const Row = styled.div`
	height: 12px;
	display: flex;
	align-items: center;

	margin-bottom: 1px;
`;

const ColTitle = styled.div`
	width: 56px;
	font-size: 10px;
`;

const ColData = styled.div`
	height: 12px;
	width: 16px;

	border-radius: 2px;
	margin-right: 1px;
	background-color: ${(props) => props.theme.color[props.levelColor]};
`;

const ColText = styled.div`
	width: 34px;
	font-size: 8px;
`;

const Trend = ({ data }) => {
	const router = useRouter();
	const { locale } = router;

	const timeToIndex = (time) => {
		return parseInt(time) - 10;
	};

	const transformTimeData = (data) => {
		let newDate = [];

		for (const item in data) {
			if (data.hasOwnProperty(item)) {
				const key = item.substring(0, 2);
				const index = timeToIndex(key);

				newDate[index] = data[item];
			}
		}

		return newDate;
	};

	const transformDataToTime = (data) => {
		return data.map((item, index) => {
			switch (index) {
				case 0:
					return {
						title: t[locale].trend.today,
						data: transformTimeData(item),
					};
				case 1:
					return {
						title: t[locale].trend.yesterday,
						data: transformTimeData(item),
					};
				default:
					return {
						title: `${index} ${t[locale].trend.daysAgo}`,
						data: transformTimeData(item),
					};
			}
		});
	};

	const transformRawData = (data) => {
		let newDate = [];

		for (const item in data) {
			if (data.hasOwnProperty(item)) {
				const diff = dayjs(item).diff(new Date(), 'day');
				const day = Math.abs(diff);

				newDate[day] = data[item];
			}
		}

		return newDate;
	};

	const transformedData = transformRawData(data);
	const trendRecord = transformDataToTime(transformedData);

	return (
		trendRecord && (
			<Wrapper>
				<Title>{t[locale].venueTrendRecord}</Title>
				{trendRecord.map((item, index) => (
					<Row key={index}>
						<ColTitle>{item.title}</ColTitle>
						{item.data &&
							item.data.map((dataItem, indexItem) => (
								<ColData key={indexItem} levelColor={getLevelColor(dataItem)} />
							))}
					</Row>
				))}
				<Row>
					<ColTitle />
					<ColText>10am</ColText>
					<ColText>12am</ColText>
					<ColText>14am</ColText>
					<ColText>16am</ColText>
					<ColText>18am</ColText>
				</Row>
			</Wrapper>
		)
	);
};

Trend.propTypes = {
	data: PropTypes.object,
};

Trend.defaultProps = {
	data: {},
};

export default Trend;
