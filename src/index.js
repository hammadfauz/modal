import React from 'react';
import PropTypes from 'prop-types';
import palette from './palette';

class Modal extends React.Component{
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps (newProps) {
    if (newProps.open === false && newProps.open !== this.props.open || newProps.disableScroll) {
      document.body.style.overflow = null;
      document.body.style.position = null;
      document.body.style.width = null;
    }else if (newProps.open === true && newProps.open !== this.props.open) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }
  }
  render () {
    var styles  = {
      overlay : {
        'transition' : 'all 300ms ease-in-out',
        'transform' : this.props.open?'scale(1)':'scale(0)',
        'opacity' : this.props.open?'1':'0',
        'position' : 'fixed',
        'top' : '0px',
        'right' : '0px',
        'bottom' : '0px',
        'left' : '0px',
        'height' : '100vh',
        'width' : '100vw',
        'display' : 'table',
        'backgroundColor' : this.props.overlayColor || palette.greyLightTransparent,
        'zIndex' : '1101'
      },
      main : {
        'display' : 'table-cell',
        'verticalAlign' : 'middle',
        'textAlign' : 'center'
      },
      center : {
        'display' : 'inline-block',
        'margin' : 'auto',
      }
    };
    return (<div style={styles.overlay}
      onClick={this.props.dismissable?this.props.onClose:null}>
      <div style={styles.main}>
        <div style={styles.center} onClick={function (evt) {evt.stopPropagation();}}>{this.props.children}</div>
      </div>
    </div>);
  }
};

Modal.propTypes = {
  open : PropTypes.bool,
  disableScroll: PropTypes.bool,
  dismissable : PropTypes.bool,
  onClose : PropTypes.func,
  overlayColor : PropTypes.string
};
module.exports = Modal;
