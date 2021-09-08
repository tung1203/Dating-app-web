import { Login } from 'app/pages/Login/Loadabled';
import {
  // Component,
  ComponentType,
} from 'hoist-non-react-statics/node_modules/@types/react';
import { HomePage } from '../pages/HomePage/Loadable';

export const autheRouter = [
  {
    path: '/',
    Component: HomePage,
    fullLayout: true,
  },
];
export const notAutheRouter = [
  {
    path: '/login',
    Component: Login,
  },
];

export interface RouterConfigType {
  path: string;
  Component: ComponentType;
  fullLayout?: Boolean;
}
