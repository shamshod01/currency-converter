import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Input, Col, Row, Alert, message} from 'antd';
import {currencyAPI} from "../api/api";

const {Search} = Input;

const CurrencyConverter = () => {

    const [curs, setCurs] = useState('');

    const [rate, setRate] = useState('To convert the currency type as shown below');

    const convert = async (cur) => {
        let args = cur.toUpperCase().split(' ')
        if (curs.hasOwnProperty(args[1]) && curs.hasOwnProperty(args[3])) {
            let converted = curs[args[3]] / curs[args[1]] * args[0]
            return setRate(`${args[0]} ${args[1]} = ${converted} ${args[3]}`)
        }
        message.error('Please make that you entering current currency');
    };


    const getRates = async () => {
        let data = await currencyAPI.getAllCurrencies()
        setCurs(data)
    }

    useEffect(() => {
        getRates()
    }, [])

    return (
        <>
            <Row justify="center">
                <h1>Currency Converter</h1>
            </Row>
            <br/>
            <Row justify="center">
                <Col span={16}>
                    <Alert
                        message={rate}
                        type="info"
                    />
                </Col>
            </Row>
            <br/>
            <Row justify="center">
                <Col span={16}>
                    <Search
                        placeholder="1 usd in rub"
                        enterButton="Convert"
                        size="large"
                        onSearch={convert}
                    />
                </Col>
            </Row>
            <br/>
            <Row justify="center">
                <NavLink to={'/list'}>Want to see list of rates ?</NavLink>
            </Row>
        </>
    );
};

export default CurrencyConverter
