import { useEffect, useState } from "react"
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const ContactForm = () => {
    const [ full_name, setFull_name ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ address, setAddress ] = useState("")
    const location = useLocation()
    const id = location.search.substr(4)

    useEffect(() => {
        getContact(id)
    }, [])

    const handleChange = (e) => {
        console.log(e)
        switch (e.target.name) {
            case "full_name":
                setFull_name(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "phone":
                setPhone(e.target.value)
                break;
            default:
                setAddress(e.target.value)
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await fetch(id ?`https://playground.4geeks.com/apis/fake/contact/${id}` : "https://playground.4geeks.com/apis/fake/contact/", {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify({
                    "full_name": full_name,
                    "email": email,
                    "agenda_slug": "raul",
                    "address": address,
                    "phone": phone
                }),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const mensaje = await user.json()
            console.log(mensaje)
            setAddress("")
            setFull_name("")
            setPhone("")
            setEmail("")
        } catch (error) {
            console.log(error)
        }
    }
    const getContact = async (id) => {
        const contact = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`)
        const data = await contact.json()
        setFull_name(data.full_name)
        setAddress(data.address)
        setEmail(data.email)
        setPhone(data.phone)
    }
    return (
        <Form className="container-lg mt-4" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-center">Ingresa los datos de contacto</h1>
            <Link to="/" className="btn btn-outline-info">Volver a Contactos</Link>
            <FormGroup controlId="formFull_name">
                <FormLabel>Nombre completo:</FormLabel>
                <FormControl type="text" name="full_name" placeholder="Tu nombre" value={full_name} onChange={(e) => handleChange(e)}/>
            </FormGroup>
            <FormGroup controlId="formEmail">
                <FormLabel>Correo electronico:</FormLabel>
                <FormControl type="email" name="email" placeholder="Tu email" value={email} onChange={(e) => handleChange(e)}/>
            </FormGroup>
            <FormGroup controlId="formPhone">
                <FormLabel>Numero de telefono:</FormLabel>
                <FormControl type="text" name="phone" placeholder="Tu telefono" value={phone} onChange={(e) => handleChange(e)}/>
            </FormGroup>
            <FormGroup controlId="formFull_name">
                <FormLabel>Dirección:</FormLabel>
                <FormControl type="text" name="address" placeholder="Tu domicilio" value={address} onChange={(e) => handleChange(e)}/>
            </FormGroup>
            <Button type="submit" variant="outline-primary" className="my-2">Enviar</Button>
        </Form>
    )
}

export default ContactForm