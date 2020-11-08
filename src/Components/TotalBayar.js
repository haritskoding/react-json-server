import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {
    Button,
    Col,
    Row
} from 'react-bootstrap'
import axios from 'axios'
import { numberWithCommas } from '../utils/utils';
import { API_URL } from '../utils/constant';

export default class TotalBayar extends Component {

    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }
        axios.post(API_URL + "pesanans", pesanan).then((res) => {
            this.props.history.push('/success')
        })
    }

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga
        }, 0);

        return (
            <>
                <div className="fixed-bottom d-none d-md-block">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h6>Total Harga :<strong className="float-right mr-2">Rp. {numberWithCommas(totalBayar)}</strong> </h6>
                            <Button variant="primary"
                                onClick={() => this.submitTotalBayar(totalBayar)}
                                block className="mb-2 mt-2 mr-2"
                                size="lg">
                                <FontAwesomeIcon icon={faShoppingBasket} />  <strong>Bayar</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>
                {/**mobie */}
                <div className="d-sm-block d-md-none">
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">
                            <h6>Total Harga :<strong className="float-right mr-2">Rp. {numberWithCommas(totalBayar)}</strong> </h6>
                            <Button variant="primary"
                                onClick={() => this.submitTotalBayar(totalBayar)}
                                block className="mb-2 mt-2 mr-2"
                                size="lg">
                                <FontAwesomeIcon icon={faShoppingBasket} />  <strong>Bayar</strong>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
