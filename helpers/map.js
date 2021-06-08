import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import Big from 'big.js';

Big.strict = true;

// Calculated value
const RADIUS_OFFSET = 0.0001;

// Show value
const PLUS_OFFSET = 0.0001;

export const compare = (val, compareVal) => {
	const bigVal = new Big(val.toString());
	const bigOffset = new Big(RADIUS_OFFSET.toString());

	return (
		bigVal.plus(bigOffset).toPrecision() >= compareVal &&
		bigVal.minus(bigOffset).toPrecision() <= compareVal
	);
};

export const compareLocation = (val, compareVal) => {
	if (!val || !compareVal) {
		return false;
	}

	const mactchedLatitude = compare(val.latitude, compareVal.latitude);
	const mactchedLongtitude = compare(val.longtitude, compareVal.longtitude);

	return mactchedLatitude && mactchedLongtitude;
};

export const centerLocation = (locations) => {
	const length = new Big(locations.length.toString());

	let location = locations.reduce((acc, cur) => {
		const bigAccLatitude = new Big(acc.latitude.toString());
		const bigAccLongtitude = new Big(acc.longtitude.toString());

		const bigCurLatitude = new Big(cur.latitude.toString());
		const bigCurtitude = new Big(cur.longtitude.toString());

		return {
			latitude: bigAccLatitude.plus(bigCurLatitude).toPrecision(),
			longtitude: bigAccLongtitude.plus(bigCurtitude).toPrecision(),
		};
	});

	const bigLatitude = new Big(location.latitude.toString());
	const bigLongtitude = new Big(location.longtitude.toString());

	return {
		latitude: bigLatitude.div(length).toPrecision(),
		longtitude: bigLongtitude.div(length).toPrecision(),
	};
};

export const findMatchingVenue = (data, location) => {
	return data
		.filter((item) => {
			return compareLocation(item.location, location);
		})
		.map((item) => {
			return {
				refId: item.refId,
				location: item.location,
			};
		});
};

export const findMostMatching = (data, checkData) => {
	const length = checkData.pin.length;
	const allLength = checkData.pin.map((checkDataItem) => {
		const found = data.find((item) => item.refId === checkDataItem.refId);
		return found.pin.length;
	});

	return length === Math.max(...allLength);
};

export const findMatching = (data) => {
	return data
		.map((item) => {
			if (!item.location) {
				return false;
			}

			return {
				refId: item.refId,
				pin: findMatchingVenue(data, item.location),
			};
		})
		.filter((item) => {
			return item.pin.length > 1;
		});
};

export const getRenderVenue = (oldData) => {
	const tempData = [...oldData];
	const data = tempData.filter(
		(item) => item && item.crowd && item.crowd.rawValue && item.crowd.value
	);

	const matchingData = findMatching(data);
	const mostMatchingData = matchingData
		.filter((item) => findMostMatching(matchingData, item))
		.map((item) => item.pin);

	const matchingRefId = mostMatchingData.map((item) =>
		item.map((pin) => pin.refId)
	);

	const matchingRefIdAndLocation = mostMatchingData.map((item) => {
		return {
			refIds: item.map((pin) => pin.refId),
			location: item.map((pin) => pin.location),
		};
	});

	const uniqMatching = uniqBy(matchingRefIdAndLocation, JSON.stringify);
	const uniqMatchingWithLocation = uniqMatching.map((item) => {
		return {
			...item,
			location: centerLocation(item.location),
		};
	});

	const allPin = uniqMatching.map((item) => {
		return {
			number: item.location.length,
			location: centerLocation(item.location),
		};
	});

	const matchingRefIdList = uniq([].concat.apply([], matchingRefId));

	let newData = data.filter((item) => {
		return !matchingRefIdList.some((refId) => refId === item.refId);
	});

	const adjustedVenue = uniqMatchingWithLocation.map((item) => {
		const location = item.location;

		return item.refIds.map((refId, index) => {
			const found = data.find((venue) => {
				return venue.refId === refId;
			});

			const bigOffset = new Big(PLUS_OFFSET.toString());
			const bigIndex = new Big(index.toString());
			const offset = bigOffset.times(bigIndex);

			const bigLatitude = new Big(location.latitude.toString());

			return {
				...found,
				location: {
					...location,
					latitude: bigLatitude.plus(offset).toPrecision(),
				},
			};
		});
	});

	const adjustedVenueList = uniq([].concat.apply([], adjustedVenue));

	return {
		zoomIn: [...newData, ...adjustedVenueList],
		zoomOut: [...newData, ...allPin],
	};
};
