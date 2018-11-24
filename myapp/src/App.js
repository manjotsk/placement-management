import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Drawer, Button, Radio, Layout, Menu, Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import FilterForm from "./components/FilterForm";
import axios from 'axios'
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const hostname = 'localhost'
class App extends Component {
  state = {
    visible: false,
    placement: 'top',
    studentPlacements: []
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Drawer
            title="Basic Drawer"
            placement={this.state.placement}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <FilterForm updateValues={(e) => {
              var programs = e.programs.map((value) => {
                return {
                  programCode: value
                }
              })
              axios.post('http://'+hostname+':3000/placements', {
                year: { data: e.year },
                companies: {
                  names: e.organizations
                },
                salary: {
                  types: programs
                }
              }).then((resp) => {
                console.log(resp.data);
                this.setState({
                  studentPlacements: resp.data
                })
              }).catch((err) => {
                console.log(err);
              })
            }} />
          </Drawer>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Button type="primary" onClick={this.showDrawer}>
              Filter
            </Button>
          </Menu>
        </Header>
        <Content style={{ padding: '50px 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
            <Row>
              {
                this.state.studentPlacements.map(val => {

                  return <Col lg={8} md={12} sm={24}>
                    <Card
                      style={{ width: 300, marginTop: 16 }}
                      hoverable
                      actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                      <Skeleton loading={false} avatar active>
                        <Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={val.rollNumber}
                          description={
                            <div style={{ height: '100px', overflowY:'scroll'}}>
                              <p>
                                Student was placed at {val.companyName}
                              </p>
                              <p>
                                Package:- {val.programCode == 'B.E.' ? val.yearly_organizations[0].BESalary : val.yearly_organizations[0].MCASalary} lac.
                              </p>
                              <p>
                                Year:- {val.year}
                              </p>
                            </div>
                          }
                        />
                      </Skeleton>
                    </Card>
                  </Col>

                })
              }
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {'Created with <3 by'} <a href={'https://manjot.in'}>manjot</a>
        </Footer>
      </Layout>
    );
  }
}

export default App;
