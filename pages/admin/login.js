import styled from 'styled-components';

// components
import Header from '../../components/Header/admin';
import Layout from '../../components/Layout/admin';
import LoginBox from '../../components/LoginBox';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: calc(100vh - 64px);
	width: 100%;
	padding: 16px;
`;

const AdminLoginPage = () => {
	return (
		<>
			<Header />
			<Layout>
				<Wrapper>
					<LoginBox />
				</Wrapper>
			</Layout>
		</>
	);
};

export default AdminLoginPage;
