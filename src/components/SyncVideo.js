import React from 'react'
import PropTypes from 'prop-types'

const SyncVideo = (props) => {

	return (
		<section id="sync-video">
			<button onClick={(e) => {
					props.dispatch("Input", 'Me')
				}}>Sync</button><br/>
		</section>
	)
}

SyncVideo.propTypes = {
	dispatch: PropTypes.func.isRequired
}

export default SyncVideo