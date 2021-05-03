import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const getLevelColor = (level) => {
	switch (level) {
		case 0:
			return 'default';
		case 1:
			return 'green';
		case 2:
			return 'softGreen';
		case 3:
			return 'softRed';
		case 4:
			return 'red';
		default:
			return 'default';
	}
};

export const getPeopleNumber = (level) => {
	switch (level) {
		case 1:
			return 0;
		case 2:
			return 2;
		case 3:
			return 4;
		case 4:
			return 6;
		default:
			return 0;
	}
};

export const getContent = (content, lang) => {
	if (!content || !lang) {
		return null;
	}

	const apiLang = lang.toUpperCase();
	const foundItem = content.find((item) => item.language === apiLang);

	return foundItem.content;
};

export const formatDate = (date, format) => {
	const day = dayjs(date, 'DD/MM/YYYY').format(format);

	return format ? day : new Date(day);
};

export const formatTime = (time, format) => {
	const day = dayjs(time, 'HH:mm').format(format);

	return format ? day : new Date(day);
};


export const transformCrowdData = (venueData, crowdData) => {
	if (!venueData || !crowdData) {
		return null;
	}

	const crowdDataKeys = Object.keys(crowdData);
	const foundData = venueData.filter((item) => {
		return crowdDataKeys.some((key) => key === item.refId);
	});

	return foundData.map((item) => {
		return {
			...item,
			crowd: crowdData[item.refId],
		};
	});
};
// MATCHING DATE

export const checkMatchingDate = (date) => {
	const startDate = formatDate(date.start);
	const endDate = formatDate(date.end);

	return (
		dayjs(startDate).isBefore(new Date()) && dayjs(endDate).isAfter(new Date())
	);
};

export const checkMatchingTime = (date) => {
	const startTime = formatTime(date.start);
	const endTime = formatTime(date.end);

	return (
		dayjs(startTime).isBefore(new Date()) && dayjs(endTime).isAfter(new Date())
	);
};

export const getMatchingProgram = (programs) => {
	return programs.filter((program) => {
		if (!program.openingTime) {
			return [];
		}

		const { dates, hours } = program.openingTime;
		return checkMatchingDate(dates) && checkMatchingTime(hours);
	});
};
