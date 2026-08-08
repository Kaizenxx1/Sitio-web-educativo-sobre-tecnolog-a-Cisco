<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/">
        <html lang="es">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Productos Cisco</title>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body class="cuerpo-xml">
                <div class="resumen-catalogo">
                    <p><strong><xsl:value-of select="count(catalogo/producto)"/></strong> productos cargados desde XML</p>
                    <p>Actualizado: <xsl:value-of select="catalogo/@fecha"/></p>
                </div>
                <div class="productos-grid">
                    <xsl:for-each select="catalogo/producto">
                        <article class="producto">
                            <div class="producto-cabecera">
                                <span class="producto-id"><xsl:value-of select="@id"/></span>
                                <span class="producto-categoria"><xsl:value-of select="categoria"/></span>
                            </div>
                            <h2><xsl:value-of select="nombre"/></h2>
                            <p><xsl:value-of select="descripcion"/></p>
                            <div class="producto-pie">
                                <strong><xsl:value-of select="precio/@moneda"/> $<xsl:value-of select="format-number(precio, '#,##0.00')"/></strong>
                                <span class="estado"><xsl:value-of select="disponibilidad"/></span>
                            </div>
                        </article>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
