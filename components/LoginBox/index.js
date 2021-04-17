import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { service_login } from '../../services';
import Cookies from 'js-cookie';

// components
import ErrorText from '../Base/errorText';

// lang
import t from '../../translate';

const Form = styled.form`
	width: 400px;
`;

const Submit = styled.input`
	width: 100%;
`;

const LoginBox = () => {
	const router = useRouter();
	const { locale } = router;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');

		service_login(username, password)
			.then((res) => {
				if (res.status === 'success') {
					Cookies.set('token', res.data.token);
					Cookies.set('username', res.data.username);

					router.push('/admin');
				} else {
					setError(t[locale].somethingWentWrong);
				}
			})
			.catch(() => {
				setError(t[locale].somethingWentWrong);
			});
	};

	return (
		<Form className='box' onSubmit={handleSubmit}>
			<div className='field'>
				<label className='label'>{t[locale].username}</label>
				<div className='control'>
					<input
						className='input'
						type='text'
						placeholder='your_username'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
			</div>

			<div className='field'>
				<label className='label'>{t[locale].password}</label>
				<div className='control'>
					<input
						className='input'
						type='password'
						placeholder='********'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>

			<Submit
				className='button is-primary'
				type='submit'
				value={t[locale].signIn}
			/>

			{error && <ErrorText>{error}</ErrorText>}
		</Form>
	);
};

export default LoginBox;
