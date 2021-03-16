import styled from 'styled-components';
import Link from 'next/link';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
	width: ${(props) => props.theme.breakpoint};
	max-width: 100%;
	position: relative;
	background-color: ${(props) => props.theme.color.white};

	margin: auto;
	padding: 16px 16px 0;

	h2 {
		margin-bottom: 16px;
	}

	p {
		margin-bottom: 32px;
	}
`;

const IconCaretDown = styled(FontAwesomeIcon)`
	height: 24px;
	width: 24px;

	position: absolute;
	right: 24px;

	cursor: pointer;

	@media (min-width: ${(props) => props.theme.breakpoint}) {
		display: none;
	}
`;

const About = () => {
	return (
		<Wrapper>
			<Link href='/'>
				<a>
					<IconCaretDown icon={faCaretDown} />
				</a>
			</Link>

			<h2>Project Background</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
				nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
				ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
				Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
				molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
				eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
				zzri.
			</p>

			<h2>Safety and Privacy</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
				nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
				ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
				Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
				molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
				eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
				zzri.
			</p>
		</Wrapper>
	);
};

export default About;
