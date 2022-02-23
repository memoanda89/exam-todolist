// material icon

import PeopleIcon from '@material-ui/icons/People'; 
import AssessmentIcon from '@material-ui/icons/Assessment';

// configs
import { PATH_NAME, DRAWER_MENU_LABEL } from 'configs';

export const navBarCommon = [
  {
    subheader: 'Tasks',
    items: [
      {
        title: 'add task',
        href: PATH_NAME.KANBAN,
        icon: AssessmentIcon,
        label: DRAWER_MENU_LABEL.KANBAN,
      }
    ],
  },
 
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Dashboard',
        icon: PeopleIcon,
        href: PATH_NAME.DASHBOARD,
        label: DRAWER_MENU_LABEL.DASHBOARD,
      },
    ],
  },
];
