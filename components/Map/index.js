import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'

import { defaultCenter, defaultZoom } from './const'
import mapStyles from './theme'

// components
import Marker from '../Marker'

// TODO: add real key
const bootstrapURLKeys = {
	key: 'AIzaSyCER7hN0p-_U36bIxFR3W_fRD6BZ_Kf3CI',
	libraries: ['places', 'geometry'],
}

const Wrapper = styled.nav`
	height: ${(props) => `calc(100vh - ${props.offset})`};
	width: 100%;
`

const Map = ({ offset }) => {
	const [instance, setInstance] = useState(null)
	const [mapApi, setMapApi] = useState({
		loaded: false,
		api: null,
	})

	const apiHasLoaded = (instance, api) => {
		setInstance(instance)
		setMapApi({
			loaded: true,
			api,
		})
	}

	return (
		<Wrapper offset={offset}>
			<GoogleMapReact
				bootstrapURLKeys={bootstrapURLKeys}
				defaultCenter={defaultCenter}
				center={defaultCenter}
				defaultZoom={defaultZoom}
				options={{
					styles: mapStyles,
					fullscreenControl: false,
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
			>
				<Marker level={1} lat={13.746774} lng={100.5126445} />
				<Marker level={2} lat={13.736774} lng={100.5326445} />
				<Marker level={3} lat={13.746774} lng={100.5526445} />
				<Marker level={4} lat={13.756774} lng={100.5326445} />
			</GoogleMapReact>
		</Wrapper>
	)
}

Map.propTypes = {
	offset: PropTypes.string,
}

Map.defaultProps = {
	offset: '0px',
}

export default Map
