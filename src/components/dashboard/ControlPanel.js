import React from 'react'

import { FaAward } from '@react-icons/all-files/fa/FaAward'
import { IoIosHome } from '@react-icons/all-files/io/IoIosHome'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings'

import controlPanelStyles from './controlPanel.module.css'

const ControlPanel = props => {

    return (
        <nav className={controlPanelStyles.controlPanel}>
            <ul>
                <li
                    className={controlPanelStyles.icon}
                    onClick={() => props.onSelectHandler('Home')}
                >
                    <IoIosHome className={ props.selectedComponent === 'Home' ? controlPanelStyles.iconCircle : null } />
                </li>
                <li
                    className={controlPanelStyles.icon}
                    onClick={() => props.onSelectHandler('Students')}
                >
                    <IoIosPeople className={ props.selectedComponent === 'Students' ? controlPanelStyles.iconCircle : null } />
                </li>
                <li
                    className={controlPanelStyles.icon}
                    onClick={() => props.onSelectHandler('TreasureBox')}
                >
                    <FaAward className={ props.selectedComponent === 'TreasureBox' ? controlPanelStyles.iconCircle : null } />
                </li>
                <li
                    className={controlPanelStyles.icon}
                    onClick={() => props.onSelectHandler('Settings')}
                >
                    <IoIosSettings className={ props.selectedComponent === 'Settings' ? controlPanelStyles.iconCircle : null } />
                </li>
            </ul>
        </nav>
    )
};

export default ControlPanel;