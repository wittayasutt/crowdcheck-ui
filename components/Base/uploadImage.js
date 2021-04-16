import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// components
import ErrorText from '../Base/errorText';

// lang
import t from '../../translate';

const Wrapper = styled.div``;

const File = styled.label`
	width: 100%;
`;

const IconUpload = styled(FontAwesomeIcon)`
	height: 24px;
	width: 24px;

	margin-bottom: 8px;
`;

const UploadImage = () => {
	const router = useRouter();
	const { locale } = router;

	const [file, setFile] = useState(null);
	const [error, setError] = useState(false);

	const types = ['image/png', 'image/jpeg', 'image/jpg'];

	const handleChange = (e) => {
		let file = e.target.files[0];

		if (file) {
			if (types.includes(file.type)) {
				setFile(file);
				setError(false);
			} else {
				setFile(null);
				setError(true);
			}
		}
	};

	return (
		<Wrapper>
			<div className='file is-boxed'>
				<File className='file-label'>
					<input
						className='file-input'
						type='file'
						name='resume'
						onClick={handleChange}
					/>
					<span className='file-cta'>
						<IconUpload icon={faUpload} />
						<span className='file-label'>{t[locale].chooseAFile}</span>
					</span>
				</File>
			</div>
			{error && <ErrorText>{t[locale].pleaseSelectAnImageFile}</ErrorText>}
		</Wrapper>
	);
};

export default UploadImage;
