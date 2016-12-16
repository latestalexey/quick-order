import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getGoodsVisibleIds } from './../../../../store/reducers/goods';
import * as cartActions from './../../../../actions/cart';
import * as goodsActions from './../../../../actions/goods';
import * as modalActions from './../../../../lib/modal/actions/modal';
import * as catalogQtyActions from './../../../../actions/catalog-qty';
import * as optionsActions from './../../../../actions/options';

import IconButton from 'material-ui/IconButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconDone from 'material-ui/svg-icons/action/done';

import Column from './column';
import styles from './styles1';

class ListContainer extends Component {
  
  constructor() {
    super();
    this.state = {current: '', headerSettingsMode: false};
    this.setFocused = this.setFocused.bind(this);
    this.setHeaderSettingsMode = this.setHeaderSettingsMode.bind(this);
    this.removeHeaderSettingsMode= this.removeHeaderSettingsMode.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
  }

  handleKeyUp(e) {
    if(e.which === 13 && document.activeElement.className === "catalogQtyInput") {
      const index = $('.catalogQtyInput').index(document.activeElement) + 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 40 && document.activeElement.className === "catalogQtyInput") {
      const index = $('.catalogQtyInput').index(document.activeElement) + 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 38 && document.activeElement.className === "catalogQtyInput") {
      const index = $('.catalogQtyInput').index(document.activeElement) - 1;
      $('.catalogQtyInput').eq(index).focus();
    }
    if (e.which === 34) {
      this.props.moveGoodsForward();
    }
    if (e.which === 33) {
      this.props.moveGoodsBack();
    }
  }
  
  setFocused(key) {
    this.setState({current: key});
  }
  
  setHeaderSettingsMode() {
    this.setState({headerSettingsMode: true});
  }
  
  removeHeaderSettingsMode() {
    this.setState({headerSettingsMode: false});
  }
  
  getSettingsBtnJsx() {
    const { headerSettingsIBStyle, headerSettingsIconStyle } = styles;
    const { headerSettingsMode} = this.state;
    return (
      <div style={headerSettingsIBStyle}>
        {!headerSettingsMode &&
          <IconButton 
            tabIndex={-1}
            style={headerSettingsIconStyle}
            onClick={this.setHeaderSettingsMode}
          >
            <IconSettings color='#ccc' />
          </IconButton>
        }
        {headerSettingsMode &&
          <IconButton 
            tabIndex={-1}
            style={headerSettingsIconStyle}
            onClick={this.removeHeaderSettingsMode}
          >
            <IconDone />
          </IconButton>
        }
      </div>
    );
  }
  
  render() {
    const props = {
      ...this.props, 
      setFocused: this.setFocused, 
      headerSettingsMode: this.state.headerSettingsMode, 
      setHeaderSettingsMode: this.setHeaderSettingsMode.bind(this), 
      removeHeaderSettingsMode: this.removeHeaderSettingsMode.bind(this) 
    }; 
    return (
      <div style={styles.style}>
        {this.getSettingsBtnJsx()}
        {props.catalogListSettings.map((key, i) => <Column {...props } key={`${key}column`}  columnKey={key} i={i} columnsQty={props.catalogListSettings.length} />)}
      </div>
    );
    
  }
}

export default connect(
  state => ({ 
    items: state.goods.items, 
    itemsIds: getGoodsVisibleIds(state.goods), 
    cartItems: state.cart.items, 
    prices: state.prices , 
    catalogQty: state.catalogQty,
    catalogListSettings: state.options.catalogListSettings
  }),
  { ...cartActions, ...modalActions, ...goodsActions, ...catalogQtyActions, ...optionsActions }
)(ListContainer); 