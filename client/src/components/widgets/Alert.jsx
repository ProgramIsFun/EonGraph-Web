import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert111 = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert111);
