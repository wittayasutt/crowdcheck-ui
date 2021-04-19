import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// components
import Zoom from '../Base/zoom';
import Marker from '../Marker';
import Switch from './switch';
import Checkbox from './checkbox';

// lang
import t from '../../translate';

const usePlace = () => {
	const dispatch = useDispatch();
	const togglePlaceName = () => dispatch({ type: 'TOGGLE_PLACE_NAME' });

	return { togglePlaceName };
};

const Wrapper = styled.div``;

const Row = styled.div`
	min-height: 42px;
	display: flex;
	align-items: center;
	margin: 8px 0;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-left: 16px;

		strong {
			font-size: 13px;
		}
	}
`;

const SwitchWrapper = styled.div`
	display: flex;
	align-items: center;

	p {
		font-size: 11px;
		line-height: 16px;
		margin-right: 16px;
	}
`;

const Title = styled.h4`
	font-size: 12px;
	font-weight: 600;

	margin: 24px 0 12px;
`;

const LegendContent = () => {
	const router = useRouter();
	const { locale } = router;

	const { togglePlaceName } = usePlace();

	const handleTogglePlaceName = () => {
		togglePlaceName();
	};

	return (
		<Wrapper>
			<SwitchWrapper>
				<p>{t[locale].locationName}</p>
				<Switch onChange={handleTogglePlaceName} />
			</SwitchWrapper>
			<Row>
				<Marker level={0} />
				<p>{t[locale].legend.find}</p>
			</Row>
			<Row>
				<Zoom />
				<p>{t[locale].legend.zoom}</p>
			</Row>
			<Row>
				<Marker level={1} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.avoid,
					}}
				/>
			</Row>
			<Row>
				<Marker level={2} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.wait,
					}}
				/>
			</Row>
			<Row>
				<Marker level={3} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.go,
					}}
				/>
			</Row>
			<Row>
				<Marker level={4} />
				<p
					dangerouslySetInnerHTML={{
						__html: t[locale].legend.goAhead,
					}}
				/>
			</Row>

			<Title>{t[locale].pointOfInterest.title}</Title>
			<Checkbox
				label={t[locale].pointOfInterest.cafeAndRestaurant}
				onChange={() => {}}
			/>
			<Checkbox label={t[locale].pointOfInterest.parking} onChange={() => {}} />
			<Checkbox label={t[locale].pointOfInterest.gallery} onChange={() => {}} />
			<Checkbox
				label={t[locale].pointOfInterest.designStudio}
				onChange={() => {}}
			/>
			<Checkbox label={t[locale].pointOfInterest.craft} onChange={() => {}} />
			<Checkbox label={t[locale].pointOfInterest.fashion} onChange={() => {}} />
		</Wrapper>
	);
};

export default LegendContent;
