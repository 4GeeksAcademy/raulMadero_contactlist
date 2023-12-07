import { faEdit, faEnvelope, faLocationArrow, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Container, Image, Row } from "react-bootstrap"
import profile from "../img/profile.jpg"
import { useContext, useEffect } from "react"
import { ContactContext } from "../store/ContactProvider"
import { Link, useNavigate } from "react-router-dom"

const Contact = () => {
    const {contacts, setContacts} = useContext(ContactContext)
    const navigate = useNavigate()
    const getContacts = async () => {
        try {
            const contact = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/raul')
            const data = await contact.json()
            setContacts(data)
            console.log(contacts)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        window.location.reload()
    }
    const handleEdit = (id) => {
        navigate(`/editcontact?id=${id}`)
    }
    useEffect(() => {
        getContacts()
    }, [])
    return (
        <Container>
            <Link className="btn btn-outline-success my-2" to="/newcontact">Crear Contacto</Link>
            {contacts.length === 0 ? <h2>No hay contactos para mostrar</h2> : contacts.map((contact, key) => (
                <Row className="border border-2 rounded-2 my-1 p-2" key={key}>
                <Col className="col-2 d-flex align-items-center justify-content-center">
                    <Image src={profile} alt="Profile picture" width={100} height={100}/>
                </Col>
                <Col className="col-7 d-flex flex-column justify-content-center">
                    <h2 className="my-1">{contact.full_name}</h2>
                    <p className="my-0">
                        <FontAwesomeIcon  className="mx-3" icon={faLocationArrow}/>
                        {contact.address}
                    </p>
                    <p className="my-0">
                        <FontAwesomeIcon className="mx-3" icon={faPhone}/>
                        {contact.phone}
                    </p>
                    <p className="my-0">
                        <FontAwesomeIcon className="mx-3" icon={faEnvelope}/>
                        {contact.email}
                    </p>
                </Col>
                <Col className="d-flex align-items-center">   
                    <FontAwesomeIcon onClick={() => handleEdit(contact.id)} className="mx-3" icon={faEdit}/>
                    <FontAwesomeIcon onClick={(e) => handleDelete(contact.id)} className="mx-3" icon={faTrash}/>
                </Col>
            </Row>
            ))}
            
        </Container>
    )
}

export default Contact