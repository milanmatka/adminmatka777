import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
 
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconCopy,
    href: '/Userdetails',
  },
   {
    id: uniqueId(),
    title: 'Home-image',
    icon: IconCopy,
    href: '/Home-image',
  },
  {
    id: uniqueId(),
    title: 'QR Code',
    icon: IconCopy,
    href: '/Game-result',
  },

  {
    id: uniqueId(),
    title: 'Approve-Payouts',
    icon: IconCopy,
    href: '/Approve-payouts',
  },
   {
    id: uniqueId(),
    title: 'Withdrawals',
    icon: IconTypography,
    href: '/ui/typography',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Bet-History',
  //   icon: IconCopy,
  //   href: '/Bet-history',
  // },
  {
    navlabel: true,
    subheader: 'Galidesawer',
  },
    {
      id: uniqueId(),
      title: 'Add-Galidesawer',
      icon: IconCopy,
      href: '/galidesawer',
    },
    {
      id: uniqueId(),
      title: 'Galidesawer-Result',
      icon: IconCopy,
      href: '/galidesawerresult',
    },
    {
      id: uniqueId(),
      title: 'Galidesawer-AllBets',
      icon: IconCopy,
      href: '/galidesawerwinners',
    },

    {
      navlabel: true,
      subheader: 'Starline',
    },
    {
      id: uniqueId(),
      title: 'Add-Starline',
      icon: IconCopy,
      href: '/starlineadd',
    },
    {
      id: uniqueId(),
      title: 'Starline-All-Bet',
      icon: IconCopy,
      href: '/starlineallbet',
    },
    {
      id: uniqueId(),
      title: 'Starline-Result',
      icon: IconCopy,
      href: '/starlineresult',
    },









  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },

];

export default Menuitems;
