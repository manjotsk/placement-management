import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { 
  Drawer, 
  Button, 
  Radio, 
  Layout, 
  Menu, 
  Skeleton, 
  Card, 
  Icon, 
  Avatar, 
  Modal,
  Popover,
  Select,
  Switch
} from 'antd';
import FilterForm from "./components/FilterForm";
import ShowGraph from "./components/ShowGraph";
import axios from 'axios';
const Option= Select.Option
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const hostname = 'localhost'
class App extends Component {
  state = {
    visible: false,
    popoverVisible:false,
    placement: 'top',
    studentPlacements: [],
    noOfStudentsPlacedYearly:[],
    modalVisible:false,
    xAxisGraph:[],
    graphTitle:'',
    graphType:'line'
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalOk = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

  handleModalCancel = (e) => {
    console.log(e);
    this.setState({
      modalVisible: false,
    });
  }

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
  handleVisibleChange = () => {
    this.setState({ popoverVisible:!this.state.popoverVisible });
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
            <FilterForm onFilter={()=>{
              this.setState({
                visible:false
              })
            }} updateValues={(e) => {
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
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={(e)=>{
              this.setState({
                graphToBeShown:e
              },()=>{
                switch(e){
                  case 'PlacementVsYear':{
                    return  axios.get('http://'+hostname+':3000/placements/noOfStudentsPlaced')
                    .then((counts)=>{
                      this.setState({
                        xAxisGraph:counts.data.map(content=>{
                          return content.count
                        })
                      },()=>{
                        this.setState({
                          modalVisible:true,
                          graphTitle:'Number of Students placed, per year'
                        })
                      })
                    })
                  }
                  case 'AvgSal':{
                    return  axios.get('http://'+hostname+':3000/placements/getAvergeSalaryYearWise')
                    .then((AvgSals)=>{
                      this.setState({
                        xAxisGraph:AvgSals.data.map(content=>{
                          console.log(JSON.stringify(content.yearly_organizations[0].AvgSal))
                          return content.yearly_organizations[0].AvgSal
                        })
                      },()=>{
                        this.setState({
                          modalVisible:true,
                          graphTitle:'Average Salary Per Year'
                        })
                      })
                    })  
                  }
                  

                }
              })
            }}>
              <Option value="PlacementVsYear">Yearly Placements</Option>
              <Option value="AvgSal">Average Salary Per Year</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
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
          <div>
          <Modal
            title={this.state.graphTitle}
            visible={this.state.modalVisible}
            onOk={()=>this.handleModalOk()}
            onCancel={()=>this.handleModalCancel()}
          >
          <Switch defaultChecked onChange={(e)=>{
            this.setState({
              graphType:e?'line':'bar'
            })
          }} />
          <ShowGraph labels={
            [
              "2012-13",
              "2013-14",
              "2014-15",
              "2015-16",
              "2016-17"
            ]
          }
          graphType={this.state.graphType}
          dataset={this.state.xAxisGraph}
          graphTitle={this.state.graphTitle}
          />
          </Modal>
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
