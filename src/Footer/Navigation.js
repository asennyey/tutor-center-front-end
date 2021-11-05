import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ListIcon from '@mui/icons-material/List'
import WorkIcon from '@mui/icons-material/Work'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { MemoryRouter, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import { forwardRef, useMemo, useState } from 'react';

function BottomNavigationLink(props) {
    const { icon, to, label } = props;
  
    const renderLink = useMemo(
      () =>
        forwardRef(function Link(itemProps, ref) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined}/>;
        }),
      [to],
    );
  
    return (
        <BottomNavigationAction label={label} icon={icon} component={renderLink}/>
    );
}

const paths = ["/my-work", '/', '/in-progress']

export default function Nav(){
    const {pathname} = useLocation();

    return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={paths.indexOf(pathname)}
        >
            <BottomNavigationLink label="My Work" icon={<WorkIcon />} to="my-work"/>
            <BottomNavigationLink label="Queue" icon={<ListIcon />} to="./"/>
            <BottomNavigationLink label="In Progress" icon={<AccessTimeIcon />} to="in-progress"/>
        </BottomNavigation>
    </Paper>)
}