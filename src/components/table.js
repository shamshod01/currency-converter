import React, {useEffect, useState} from 'react'
import {Table, Select, Row, Col} from 'antd';
import {currencyAPI} from "../api/api";
import {NavLink} from "react-router-dom";

const { Option } = Select;


const CurrencyTable = () => {
    const [rates, setRates] = useState([])

    const base = localStorage.getItem('base') || 'UZS'

    const columns = [

        {
            title: 'Currency',
            dataIndex: 'name',
            sorter: (a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            },
        },
        {
            title: 'Rates',
            dataIndex: 'rate',
            sorter: (a, b) => a.rate - b.rate,

        },
    ];

    const changeBase = (option) => {
        localStorage.setItem('base', option);
        window.location.reload();
    }

    const getAllRates = async (basedOn) => {
        let data = await currencyAPI.getAllCurrencies()
        let ratesArr = Object.keys(data).map((key) => {
            return {name: key, rate: data[basedOn] / data[key]}
        })
        setRates(ratesArr)
    }


    useEffect(() => {
        getAllRates(base)
        setInterval(async () => {
            getAllRates(base)
        }, 15000);

    }, [])


    return <div>
        <Row justify="center">
            <Col xs={22} sm={10} md={8} lg={5} xl={4}>
                <h2>
                    Rates based on
                </h2>
            </Col>
            <Col xs={22} sm={10} md={8} lg={5} xl={5}>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={changeBase}
                    value={base}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {rates.map(e => <Option value={e.name}>{e.name}</Option>)}
                </Select>
            </Col>
            <Col xs={22} sm={20} md={10} lg={5} xl={5}>
                <NavLink to={'/'}>Want to convert exact amount ?</NavLink>
            </Col>
        </Row>
        <br/>
        <Row justify="center">
            <Col xs={22} sm={20} md={18} lg={14} xl={18}>
                {rates.length > 0 && <Table columns={columns} dataSource={rates}/>}
            </Col>
        </Row>

    </div>
}

export default CurrencyTable










