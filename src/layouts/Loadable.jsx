import React, { Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LinearProgress style={{ margin: '10px 0' }} />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;