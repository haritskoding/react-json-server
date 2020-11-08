import React, { Component } from 'react';
import {
    Hasil,
    ListCategories,
    Menus,
} from '../Components'
import { Row, Col, Container } from 'react-bootstrap';
import { API_URL } from '../utils/constant'
import axios from "axios"
import swal from 'sweetalert';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            categoriYangDipilih: 'Makanan',
            keranjangs: []
        }
    }

    componentDidMount() {
        axios
            .get(`${API_URL}products?category.nama=${this.state.categoriYangDipilih}`)
            .then(res => {
                const menus = res.data;
                this.setState({ menus })
            })
            .catch(error => {
                console.log(error);
            });

        this.getListKeranjang()
    }

    getListKeranjang = () => {
        axios
            .get(`${API_URL}keranjangs`)
            .then(res => {
                const keranjangs = res.data;
                this.setState({ keranjangs })
            })
            .catch(error => {
                console.log(error)
            })

    }
    // componentDidUpdate(prevState) {
    //     if (this.state.keranjangs !== prevState.keranjangs) {
    //         axios
    //             .get(`${API_URL}keranjangs`)
    //             .then(res => {
    //                 const keranjangs = res.data;
    //                 this.setState({ keranjangs })
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }
    // }

    changeCategory = (value) => {
        this.setState({
            categoriYangDipilih: value,
            menus: [],
            keranjangs: []
        })

        axios
            .get(`${API_URL}products?category.nama=${value}`)
            .then(res => {
                const menus = res.data;
                this.setState({ menus })
            })
            .catch(error => {
                console.log(error);
            })
    }

    masukKeranjang = (value) => {
        axios
            .get(`${API_URL}keranjangs?product.id=${value.id}`)
            .then(res => {
                this.getListKeranjang()
                if (res.data.length === 0) {

                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }
                    axios
                        .post(`${API_URL}keranjangs`, keranjang)
                        .then(res => {
                            this.getListKeranjang()
                            swal({
                                title: 'Sukses',
                                text: keranjang.product.nama + " Berhasil di tambahkan ke keranjang",
                                icon: 'success',
                                button: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {

                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    }

                    console.log('aris ', res.data[0].id)
                    axios
                        .put(API_URL + 'keranjangs/' + res.data[0].id, keranjang)
                        .then(res => {
                            this.getListKeranjang()
                            swal({
                                title: 'Sukses',
                                text: keranjang.product.nama + " Berhasil di tambahkan ke keranjang",
                                icon: 'success',
                                button: false,
                                timer: 1500
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                console.log(error);
            })

    }


    render() {
        const {
            menus,
            categoriYangDipilih,
            keranjangs } = this.state;
        return (
            <div className="mt-3">
                <Container fluid>
                    <Row >
                        <ListCategories
                            changeCategory={this.changeCategory}
                            categoriYangDipilih={categoriYangDipilih}
                        />
                        <Col className="mt-3">
                            <h6><strong>Daftar Produk</strong></h6>
                            <hr />
                            <Row className="overflow-auto menu">
                                {
                                    menus && menus.map((menu) => (
                                        <Menus
                                            key={menu.id}
                                            menu={menu}
                                            masukKeranjang={this.masukKeranjang}
                                        />
                                    ))
                                }
                            </Row>
                        </Col>
                        <Hasil
                            keranjangs={keranjangs}
                            {...this.props}
                            getListKeranjang={this.getListKeranjang}
                        />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;