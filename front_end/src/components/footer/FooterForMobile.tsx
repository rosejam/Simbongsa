import React from "react";
import { Menu, Responsive } from "semantic-ui-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as pageActions from 'redux/modules/page';
// import "assets/mycss";
import './Footer.css'
interface Props { }

// export default function Header({ }: Props): ReactElement {
class Footer extends React.Component<any, any>{
  state = { activeItem: "" }

  handleItemClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name })
    const { history, PageActions } = this.props
    PageActions.setCurrentTab(0);
    if (name === 'HOME') {
      history.push('/mainpage')
    } else if (name === 'FEED') {
      history.push('/feed');
    } else if (name === 'MY') {
      history.push('/mypage')
    }
  }

  render() {
    const { activeItem } = this.state
    const { loginCheck } = this.props;
    return (
      <div>
        {/* 작은 화면에서 보여줌 */}
        {loginCheck &&
          <Responsive
            {...Responsive.onlyMobile}
          >
            <Menu
              borderless widths={3} fixed="bottom"
            >
              <Menu.Item name="HOME" active={activeItem === 'HOME'} onClick={this.handleItemClick}>
                HOME</Menu.Item>
              <Menu.Item name="FEED" active={activeItem === 'FEED'} onClick={this.handleItemClick} >FEED</Menu.Item>
              <Menu.Item name="MY" active={activeItem === 'MY'} onClick={this.handleItemClick} >MY</Menu.Item>
            </Menu>
          </Responsive>}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    loginCheck: state.auth.get("loginCheck")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    PageActions: bindActionCreators(pageActions, dispatch)
  })
)(Footer);