import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components'

import Dashboard from "./sections/dashboard";
import AttendanceManage from './sections/attendanceManage';

function App() {
    const [isOpenDashboard, openDashboard] = useState(true);
    const [isOpenAttendanceManage, openAttendanceManage] = useState(false);
    const [isOpenSettings, openSettings] = useState(false);

    const handleOpenDashboard = () => {
        openDashboard(true);
        openAttendanceManage(false);
        openSettings(false);
    }

    const handleOpenAttendanceManage = () => {
        openAttendanceManage(true);
        openDashboard(false);
        openSettings(false);
    }

    const handleOpenSettings = () => {
        openSettings(true);
        openDashboard(false);
        openAttendanceManage(false);
    }

    return(
        <>
            <div className="attendance-top-bar">
			    <h2>{__( 'Attendance', 'attendance' )}</h2>
                <div className="attendance-top-bar-navigate-menu">
                    <Button type="button" onClick={handleOpenDashboard} >{__( 'Dashboard', 'attendance-addon-from-innentasolutions' )}</Button>
                    <Button type="button" onClick={handleOpenAttendanceManage} >{__( 'Attendance Manage', 'attendance-addon-from-innentasolutions' )}</Button>
                    <Button type="button" onClick={handleOpenSettings} >{__( 'Settings', 'attendance-addon-from-innentasolutions' )}</Button>
                </div>
			</div>
            <div id="attendance-app-body">
                {isOpenDashboard && <Dashboard />}
                {isOpenAttendanceManage && <AttendanceManage />}
            </div>
            <footer>
                <p>© Copyright 2024 Innenta Solutions. All rights reserved.</p>
            </footer>
        </>
    );
}

export default App;