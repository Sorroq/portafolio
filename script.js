const formularioSolicitudElement = document.getElementById("formulario-solicitud");
const mensajeSolicitudElement = document.getElementById("mensaje-solicitud");
const nombreSolicitudElement = document.getElementById("nombre-solicitud");
const correoSolicitudElement = document.getElementById("correo-solicitud");
const comentarioSolicitudElement = document.getElementById("comentario-solicitud");

const formularioSolicitud = (evento) => {
    evento.preventDefault();

    const nombre = nombreSolicitudElement.value.trim();
    const correo = correoSolicitudElement.value.trim();
    const comentario = comentarioSolicitudElement.value.trim();

    if (!nombre || !correo || !comentario) {
        mensajeSolicitudElement.textContent = "Completa todos los campos antes de enviar la solicitud.";
        return;
    }

    if (!formularioSolicitudElement.checkValidity()) {
        formularioSolicitudElement.reportValidity();
        mensajeSolicitudElement.textContent = "Ingresa un correo electrónico válido.";
        return;
    }

    const solicitud = {
        nombre,
        correo,
        comentario,
        fecha: new Date().toISOString()
    };

    try {
        const solicitudesGuardadas = localStorage.getItem("solicitudesTrabajo");
        const solicitudes = solicitudesGuardadas ? JSON.parse(solicitudesGuardadas) : [];

        if (!Array.isArray(solicitudes)) {
            throw new Error("El almacenamiento de solicitudes no tiene un formato válido.");
        }

        localStorage.setItem("solicitudesTrabajo", JSON.stringify([...solicitudes, solicitud]));
        formularioSolicitudElement.reset();
        mensajeSolicitudElement.textContent = "¡Solicitud guardada! Tus datos quedaron en este navegador.";
        console.log("Solicitud guardada correctamente.");
    } catch (error) {
        mensajeSolicitudElement.textContent = "No se pudo guardar la solicitud. Revisa el almacenamiento del navegador e inténtalo de nuevo.";
        console.error("Error al guardar la solicitud:", error);
    }
};
