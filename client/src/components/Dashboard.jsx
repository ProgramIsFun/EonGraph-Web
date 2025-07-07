import React, {Component, useEffect, useState} from 'react';
import Graph from "./Graph";
import { connect } from 'react-redux';
import {l} from "../autil/log11";

const Dashboard = (pppp) => {
    l("Dashboard render", pppp);
    return (
            <Graph />
    );
};



export default connect(
    state => state
)(
        Dashboard
);
