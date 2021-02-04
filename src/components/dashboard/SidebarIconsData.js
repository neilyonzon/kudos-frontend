import React from 'react';

import { FaAward } from '@react-icons/all-files/fa/FaAward'
import { IoIosHome } from '@react-icons/all-files/io/IoIosHome'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings'

export const SidebarIconsData = [
    {
        component: 'Home',
        icon: <IoIosHome />,
    },
    {
        component: 'Students',
        icon: <IoIosPeople />,
    },
    {
        component: 'TreasureBox',
        icon: <FaAward />,
    },
    {
        component: 'Settings',
        icon: <IoIosSettings />,
    },
]