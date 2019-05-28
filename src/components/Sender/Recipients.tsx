import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { green, lime, red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EmailEditor from 'components/Editor/EmailEditor';
import { EmailCtx, EmailData, EmailStatus } from 'context/email';
import { useStyles } from 'hooks/useStyles';
import React, { memo, useContext, useState } from 'react';

const Recipients = () => {
  const classes = useStyles(styles);
  const { data, setEmails } = useContext(EmailCtx);
  const [expanded, setExpanded] = useState(-1);

  const onChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const item: EmailData = {
      ...data[index],
      active: checked,
    };

    setEmails([...data.slice(0, index), item, ...data.slice(index + 1)]);
  };

  const onClick = (index: number) => () => {
    if (expanded === index) {
      setExpanded(-1);
    } else {
      setExpanded(index);
    }
  };

  const update = (index: number) => (item: EmailData) => {
    setEmails([...data.slice(0, index), item, ...data.slice(index + 1)]);
  };

  const formatStatus = (status: EmailStatus) => {
    switch (status) {
      case 1:
        return <Typography color={'inherit'} className={classes.statusPending}>Pending...</Typography>;
      case 2:
        return <Typography color={'inherit'} className={classes.statusSent}>Sent.</Typography>;
      case 3:
        return <Typography color={'inherit'} className={classes.statusError}>Error</Typography>;
      default:
        return null;
    }
  };

  if (data) {
    return (
      <Grid container={true} alignItems={'center'} justify={'center'}>
        <Grid item={true} xs={12} md={6} className={classes.center}>
          <List>
            {data.map((userData: EmailData, index: number) => (
              <>
                <div key={userData.recipient} className={classes.root}>
                  <Checkbox
                    edge={'start'}
                    checked={userData.active}
                    disableRipple={false}
                    onChange={onChange(index)}
                    value={userData.recipient}
                  />
                  <ListItem
                    dense={false}
                    button={true}
                    onClick={onClick(index)}
                  >
                    <ListItemText className={classes.recipient} primary={`${userData.recipient}`} />
                    <ListItemText primary={formatStatus(userData.status)} />
                    {expanded === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                </div>
                <Collapse in={expanded === index} unmountOnExit={true}>
                  <List component="div" disablePadding={true}>
                    <EmailEditor item={userData} updater={update(index)} />
                  </List>
                </Collapse>
              </>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
  return null;
};

const styles = {
  center: {
    textAlign: 'center' as 'center',
  },
  recipient: {
    width: '200px',
  },
  root: {
    display: 'flex',
  },
  statusError: {
    color: red['600']
  },
  statusPending: {
    color: lime['700']
  },
  statusSent: {
    color: green['600']
  },
};

export default memo(Recipients);
