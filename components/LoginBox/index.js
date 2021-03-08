import styled from 'styled-components'
import Link from 'next/link'

const Form = styled.form`
	width: 400px;
`

const Submit = styled.button`
	width: 100%;
`

const LoginBox = () => {
	return (
		<Form className='box'>
			<div className='field'>
				<label className='label'>Email</label>
				<div className='control'>
					<input
						className='input'
						type='email'
						placeholder='youremail@crowdcheck.info'
					/>
				</div>
			</div>

			<div className='field'>
				<label className='label'>Password</label>
				<div className='control'>
					<input className='input' type='password' placeholder='********' />
				</div>
			</div>

			<Link href='/admin'>
				<Submit className='button is-primary'>Sign in</Submit>
			</Link>
		</Form>
	)
}

export default LoginBox
