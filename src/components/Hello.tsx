import Typography from '@material-ui/core/Typography';
import React, {memo} from 'react';
import { UserCtx } from '../contexts/user.context';

const Hello = () => {
  const [user] = React.useContext(UserCtx);

  return (
    <Typography variant="overline" color="inherit" style={{ marginRight: 20 }}>
      Hello, {user.name}
    </Typography>
  );
};

export default memo(Hello);
