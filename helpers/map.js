import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

const RADIUS_OFFSET = 0.002;
const PLUS_OFFSET = 0.0005;

export const compare = (val, compareVal) => {
	return val + RADIUS_OFFSET >= compareVal && val - RADIUS_OFFSET <= compareVal;
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
	const length = locations.length;

	let location = locations.reduce((acc, cur) => {
		return {
			latitude: acc.latitude + cur.latitude,
			longtitude: acc.longtitude + cur.longtitude,
		};
	});

	return {
		latitude: location.latitude / length,
		longtitude: location.longtitude / length,
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
	const data = [...oldData];

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

			return {
				...found,
				location: {
					...location,
					latitude: location.latitude + PLUS_OFFSET * index,
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
