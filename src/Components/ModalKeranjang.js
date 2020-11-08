import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const ModalKeranjang = ({
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {

    if (keranjangDetail) {
        console.log('jarum', keranjangDetail);
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}
                        {" "}
                        <strong>
                            (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga</Form.Label>
                            <p>
                                <strong> Rp. {numberWithCommas(totalHarga)}</strong>
                            </p>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Button variant="danger" size="sm" className="mr-2" onClick={() => kurang()} >
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>

                            <strong className="mr-2">{jumlah}</strong>

                            <Button variant="primary" size="sm">
                                <FontAwesomeIcon icon={faPlus} onClick={() => tambah()} />
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="contoh :pedas "
                                onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onChange={(event) => handleSubmit(event)}
                            type="submit">
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => hapusPesanan(keranjangDetail.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        {" "}Hapus Pesanan
                      </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Kosong
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }


}

export default ModalKeranjang
