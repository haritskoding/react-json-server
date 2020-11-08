import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constant'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUtensils,
    faCoffee,
    faCheese
} from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
    if (nama === 'Makanan') {
        return <FontAwesomeIcon icon={faUtensils} className="mr-3" />
    } else if (nama === 'Minuman') {
        return <FontAwesomeIcon icon={faCoffee} />
    } else if (nama === 'Cemilan') {
        return <FontAwesomeIcon icon={faCheese} className="mr-3" />
    } else {
        return <FontAwesomeIcon icon={faUtensils} className="mr-3" />
    }
}

export default class ListCategories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }


    componentDidMount() {
        axios.get(API_URL + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories });

            })
            .catch(error => {
                console.log('error ya' + error);
            })
    }

    render() {
        const { categories } = this.state
        const { changeCategory, categoriYangDipilih } = this.props;
        return (

            <Col md={2} mt="4">
                <h5><strong>Daftar Kategori</strong></h5>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (

                        <ListGroup.Item
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categoriYangDipilih === category.nama && "category-aktif"}
                        >
                            <h6>
                                <Icon nama={category.nama} />    {category.nama}
                            </h6>
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </Col>
        )
    }
}
