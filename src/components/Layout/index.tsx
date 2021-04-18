import React from 'react';
import cn from 'classnames';

import s from './Layout.module.scss';

interface LayoutProps {
  className?: string;
  children: React.ReactElement | React.ReactElement []
}

const Layout: React.FC<LayoutProps> = ({ children, className = null }) => (
  <div className={cn(s.root, className)}>{children}</div>
);

export default React.memo(Layout);