import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbar = ({ children }) => {
  const renderThumbVertical = (props) => {
    const { style, ...restProps } = props;
    const thumbStyle = {
      backgroundColor: 'black',
      borderRadius: '4px',
      ...style,
    };
    return <div style={thumbStyle} {...restProps} />;
  };

  const renderTrackVertical = (props) => {
    const { style, ...restProps } = props;
    const trackStyle = {
      backgroundColor: 'red',
      borderRadius: '4px',
      ...style,
    };
    return <div style={trackStyle} {...restProps} />;
  };

  return (
    <Scrollbars
      renderThumbVertical={renderThumbVertical}
      renderTrackVertical={renderTrackVertical}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;