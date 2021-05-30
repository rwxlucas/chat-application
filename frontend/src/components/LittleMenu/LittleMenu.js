import React from 'react'
import './LittleMenu.scss'

const LittleMenu = ({options, open}) => {
	
	const littleMenuStyle = {
		height: open ? `${options.length * 41}px` : '0px'
	}

	return (
		<div className={'littleMenu'} style={littleMenuStyle} >
			{/* { options.map((op, index) => <div key={`menuOption${index}`} >{op}</div> ) } */}
			{ options.map((op, index) => <div key={`menuOption${index}`} onClick={op.exec} >{op.name}</div> ) }
		</div>
	)
}

export default LittleMenu
