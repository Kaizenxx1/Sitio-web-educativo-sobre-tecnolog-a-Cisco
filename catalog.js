const contenedorCatalogo = document.querySelector("#catalogo-dinamico");
const estadoCatalogo = document.querySelector("#estado-catalogo");

/*
   Los navegadores bloquean fetch al abrir una página con file://.
   Por eso catalog.html contiene una vista de respaldo.
   En localhost y GitHub Pages se ejecuta la transformación XML/XSLT real.
*/
if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    cargarCatalogoXML();
}

async function cargarCatalogoXML() {
    try {
        const [respuestaXML, respuestaXSL] = await Promise.all([
            fetch("datos.xml"),
            fetch("catalogo.xsl")
        ]);

        if (!respuestaXML.ok || !respuestaXSL.ok) {
            throw new Error("No se pudieron descargar los archivos del catálogo.");
        }

        const analizador = new DOMParser();
        const documentoXML = analizador.parseFromString(await respuestaXML.text(), "application/xml");
        const documentoXSL = analizador.parseFromString(await respuestaXSL.text(), "application/xml");

        if (documentoXML.querySelector("parsererror") || documentoXSL.querySelector("parsererror")) {
            throw new Error("El XML o el XSLT contiene un error de estructura.");
        }

        if (typeof XSLTProcessor === "undefined") {
            throw new Error("Este navegador no permite la transformación XSLT.");
        }

        const procesador = new XSLTProcessor();
        procesador.importStylesheet(documentoXSL);
        const resultado = procesador.transformToFragment(documentoXML, document);

        const contenidoTransformado = resultado.querySelector(".cuerpo-xml");
        contenedorCatalogo.replaceChildren(...(contenidoTransformado ? contenidoTransformado.children : resultado.children));
        estadoCatalogo.textContent = "Catálogo cargado dinámicamente desde datos.xml y transformado con catalogo.xsl.";
        estadoCatalogo.classList.add("estado-correcto");
    } catch (error) {
        estadoCatalogo.textContent = "No fue posible transformar el XML en este navegador. Se muestra la vista de respaldo con los mismos datos.";
        console.warn(error.message);
    }
}
