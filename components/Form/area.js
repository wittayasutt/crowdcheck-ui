import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { getContent } from '../../helpers';

// components
import Input2Lang from './input2Lang';

// lang
import t from '../../translate';

const AdminFormArea = ({ data, isView, onUpdate }) => {
	const router = useRouter();
	const { locale } = router;

	// form
	const initData = {
		th: '',
		en: '',
	};

	const [name, setName] = useState(initData);

	const lang = (item) => {
		return item.en && item.th;
	};

	useEffect(() => {
		if (!isView) {
			const payload = {
				name: [
					{
						language: 'EN',
						content: name.en,
					},
					{
						language: 'TH',
						content: name.th,
					},
				],
			};

			const isError = !lang(name);
			onUpdate({ payload, isError });
		}
	}, [name]);

	useEffect(() => {
		if (!data) {
			return;
		}

		if (data.name) {
			setName({
				th: getContent(data.name, 'th'),
				en: getContent(data.name, 'en'),
			});
		}
	}, [data]);

	return <Input2Lang title={t[locale].areaName} data={name} onChange={(e) => setName(e)} isView={isView} require />;
};

AdminFormArea.propTypes = {
	data: PropTypes.object,
	isView: PropTypes.bool,
	onUpdate: PropTypes.func,
};

AdminFormArea.defaultProps = {
	data: null,
	isView: false,
	onUpdate: () => {},
};

export default AdminFormArea;
