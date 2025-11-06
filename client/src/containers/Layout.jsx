import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    children: PropTypes.node.isRequired,
    contentCenter: PropTypes.bool
};

const defaultProps = {
    contentCenter: false
};

const Layout = ({children, contentCenter}) => {
    return (
        <div className="aaaaaaa"
        >
            {/*<div>*/}
            {/*    <h1>Github repo relations visualizer</h1>*/}
            {/*</div>*/}
            <div>{children}</div>
            {/*<div>*/}
            {/*</div>*/}
        </div>
    );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
