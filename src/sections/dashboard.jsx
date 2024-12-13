import React, { useState, useEffect } from 'react';

import TimeFunctions from '../helper/timeFunctions';

function Dashboard() {
    return (
        <div className="attendance-dashboard">
            <h1 className="attendance-title">Dashboard</h1>
            <div className="attendance-dashboard-container">
                <TimeFunctions />
            </div>
        </div>
    );
}

export default Dashboard;
