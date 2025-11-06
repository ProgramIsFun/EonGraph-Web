import React, {Component, useEffect, useState} from 'react';
import buttonList from './initialButtonList';
import Layout from '../../containers/Layout';
import {auth} from '../../firebase';
import './Dashboard.css';
import Home from "../Home";
import {cgg} from "../../util/helperfile";

const Dashboard = ({ providerData }) => {

    return (
        <Layout>
            <Home />
        </Layout>
    );
};



export default Dashboard;
