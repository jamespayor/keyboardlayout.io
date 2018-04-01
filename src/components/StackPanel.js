import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const CSSSizePropType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export default class StackPanel extends Component {

  static propTypes = {
    horizontal: PropTypes.bool,
    wrapContent: PropTypes.bool,
    stretchLast: PropTypes.bool,

    width: CSSSizePropType,
    height: CSSSizePropType,
    flexGrow: PropTypes.number,

    minWidth: CSSSizePropType,
    maxWidth: CSSSizePropType,
    minHeight: CSSSizePropType,
    maxHeight: CSSSizePropType,
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    horizontal: false,
    wrapContent: false,
    stretchLast: false,
  };

  render() {
    const {children, horizontal, wrapContent, stretchLast, width, height, flexGrow, minWidth, minHeight, maxWidth, maxHeight} = this.props;

    const flexContainerStyle = {
      //position: 'absolute',
      top: 0,
      left: 0,

      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      width,
      height,

      display: 'flex',
      flexGrow: flexGrow,
      flexDirection: horizontal ? 'row' : 'column',
      flexWrap: wrapContent ? 'wrap' : 'nowrap',
      alignItems: 'stretch',
      alignContent: 'stretch',
      justifyContent: 'space-between',
    };

    const flexItemStyle = {
      position: 'relative',
      flex: stretchLast ? `0 0 auto` : `${flexGrow} 1 auto`,

      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      flexWrap: wrapContent ? 'wrap' : 'nowrap',
      alignItems: 'stretch',
      alignContent: 'stretch',
    };

    const lastFlexItemStyle = _.assign({}, flexItemStyle, {flex: `${flexGrow} 1 auto`});

    const childContainerStyle = {
      position: 'relative',
      flexGrow: flexGrow,

      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'stretch',
    };

    const childCount = React.Children.count(children);
    return (
      <div style={flexContainerStyle}>
        {React.Children.map(children, (child, index) =>
          <div style={index !== childCount - 1 ? flexItemStyle : lastFlexItemStyle}>
            <div style={childContainerStyle}>
              {child}
            </div>
          </div>
        )}
      </div>
    );
  }
}
