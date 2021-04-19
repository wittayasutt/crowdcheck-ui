import styled from 'styled-components';
import { useRouter } from 'next/router';
import { getLevelColor } from '../../helpers';

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

const mockTrend = [
	{
		10: 1,
		11: 1,
		12: 2,
		13: 0,
		14: 0,
		15: 0,
		16: 0,
		17: 0,
		18: 0,
	},
	{
		10: 1,
		11: 1,
		12: 2,
		13: 3,
		14: 4,
		15: 4,
		16: 3,
		17: 1,
		18: 1,
	},
	{
		10: 1,
		11: 2,
		12: 2,
		13: 3,
		14: 3,
		15: 4,
		16: 4,
		17: 1,
		18: 1,
	},
	{
		10: 1,
		11: 1,
		12: 2,
		13: 4,
		14: 4,
		15: 2,
		16: 3,
		17: 1,
		18: 2,
	},
	{
		10: 1,
		11: 1,
		12: 3,
		13: 2,
		14: 4,
		15: 2,
		16: 3,
		17: 1,
		18: 1,
	},
];

const Trend = () => {
	const router = useRouter();
	const { locale } = router;

	const timeToIndex = (time) => {
		// 10 o'clock return to index 0
		return time - 10;
	};

	const transformTimeData = (data) => {
		let array = [];

		for (const [key, value] of Object.entries(data)) {
			const index = timeToIndex(key);
			array[index] = value;
		}

		return array;
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

	const trendRecord = transformDataToTime(mockTrend);

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

export default Trend;
