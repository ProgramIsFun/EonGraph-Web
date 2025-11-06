import React, {Component, useEffect, useState} from 'react';
import Home from "./Graph";
import { connect } from 'react-redux';
import {l} from "../util/log11";

const Dashboard = (pppp) => {
    l("Dashboard render", pppp);
    return (

            <Home />
    );
};



export default connect( state => state )(Dashboard);
