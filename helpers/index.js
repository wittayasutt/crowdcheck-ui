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
