import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { service_upload_image } from '../../services';

// components
import ErrorText from '../Base/errorText';

// lang
import t from '../../translate';

const Wrapper = styled.div``;

const File = styled.label`
	width: 100%;

	input {
		cursor: pointer;
	}
`;

const IconUpload = styled(FontAwesomeIcon)`
	height: 24px;
	width: 24px;

	margin-bottom: 8px;
`;

const UploadImage = ({ image, onUploadImage }) => {
	const router = useRouter();
	const { locale } = router;

	const [error, setError] = useState(false);

	const types = ['image/png', 'image/jpeg', 'image/jpg'];

	const handleChange = (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];

			if (types.includes(file.type)) {
				const formData = new FormData();
				formData.append('file', file);

				service_upload_image(formData)
					.then((res) => {
						onUploadImage(res.data[0].path);
						setError(false);
					})
					.catch(() => {
						onUploadImage(null);
						setError(true);
					});
			} else {
				onUploadImage(null);
				setError(true);
			}
		}
	};

	return (
		<Wrapper>
			<div className='file is-boxed'>
				<File className='file-label'>
					<input className='file-input' type='file' onChange={handleChange} />

					{image ? (
						<img src={image} alt={t[locale].chooseAFile} />
					) : (
						<span className='file-cta'>
							<IconUpload icon={faUpload} />
							<span className='file-label'>{t[locale].chooseAFile}</span>
						</span>
					)}
				</File>
			</div>
			{error && <ErrorText>{t[locale].pleaseSelectAnImageFile}</ErrorText>}
		</Wrapper>
	);
};

UploadImage.propTypes = {
	image: PropTypes.string,
	onUploadImage: PropTypes.func,
};

UploadImage.defaultProps = {
	image: null,
	onUploadImage: () => {},
};

export default UploadImage;
