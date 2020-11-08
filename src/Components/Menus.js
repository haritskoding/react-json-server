import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const Menus = ({ menu, masukKeranjang }) => {

    return (
        <Col lg={4} md={6} xs={6} className="mb-4" >
            <Card
                className="shadow"
                style={{ minHeight: '250px' }}
                onClick={() => masukKeranjang(menu)}

            >
                <Card.Img
                    style={{ maxHeight: '120px', }}
                    variant="top"
                    src={"assets/images/" +
                        menu.category.nama.toLowerCase() +
                        "/" +
                        menu.gambar}
                />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>Rp.{numberWithCommas(menu.harga)}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Menus
