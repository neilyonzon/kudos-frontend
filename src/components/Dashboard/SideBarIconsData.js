import React from 'react';

import { FaAward } from '@react-icons/all-files/fa/FaAward'
import { IoIosHome } from '@react-icons/all-files/io/IoIosHome'
import { IoIosPeople } from '@react-icons/all-files/io/IoIosPeople'
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings'

export const SideBarIconsData = [
    {
        component: 'Home',
        icon: <IoIosHome />,
        className: 'nav-text'
    },
    {
        component: 'Students',
        icon: <IoIosPeople />,
        className: 'nav-text'
    },
    {
        component: 'Award',
        icon: <FaAward />,
        className: 'nav-text'
    },
    {
        component: 'Settings',
        icon: <IoIosSettings />,
        className: 'nav-text'
    },
]