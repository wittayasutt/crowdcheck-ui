import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const getLevelColor = (level) => {
	switch (level) {
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
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
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

export const formatDate = (date) => {
	const day = dayjs(date, 'DD/MM/YYYY').format();

	return new Date(day);
};

export const formatTime = (time) => {
	const day = dayjs(time, 'HH:mm').format();

	return new Date(day);
};
