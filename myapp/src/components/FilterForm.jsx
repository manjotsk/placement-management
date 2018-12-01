import React, { Component } from 'react'
import { Select, Button } from 'antd';
import axios from 'axios'
import { Row, Col } from 'antd/lib/grid';
const hostname = 'localhost'
const Option = Select.Option
export default class FilterForm extends Component {
    
    state = {
        options: [],
        organizationsSelected: [],
        programsSelected: ['B.E.', 'MCA'],
        yearSelected: '2013-14',
    }
    componentDidMount() {
        axios.get('http://'+hostname+':3000/organisations')
        .then(async (organisations) => {
            this.setState({
                options: organisations.data
            })
            console.log(organisations)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    handleOrganizationChange(value) {
        console.log(value);
        this.setState({
            organizationsSelected:value
        })
    }
    handleProgramChange(value) {
        console.log(value);
        this.setState({
            programsSelected:value
        })
    }
    handleYearChange(value) {
        console.log(value);
        this.setState({
            yearSelected:value
        })
    }
    handleClick(){
        this.props.updateValues(
            {
                organizations:this.state.organizationsSelected,
                programs:this.state.programsSelected,
                year:this.state.yearSelected,
            }
        )
        this.props.onFilter()
    }
    
    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={6}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select Multiple Organizations"
                            onChange={(e)=>this.handleOrganizationChange(e)}
                        >
                            {
                                this.state.options.map(value => {
                                    return <Option key={value.company_name}>{value.company_name}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select Program(s)"
                            defaultValue={this.state.programsSelected}
                            onChange={(e)=>this.handleProgramChange(e)}
                            >
                            {
                                ['B.E.', 'MCA'].map(value => {
                                    return <Option key={value}>{value}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Please select a Year"
                            defaultValue={this.state.yearSelected}
                            onChange={(e)=>this.handleYearChange(e)}
                            >
                            {
                                [
                                    '2012-13',
                                    '2013-14',
                                    '2014-15',
                                    '2015-16',
                                    '2016-17',
                                ].map(value => {
                                    return <Option key={value}>{value}</Option>
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                <br/>
                <Row type="flex" justify="center" align="middle">
                    <Col span = {4}>
                            <Button type="primary" onClick={()=>{
                                this.handleClick()
                            }} > filter</Button>
                    </Col>
                </Row>


            </div>
        )
    }
}
