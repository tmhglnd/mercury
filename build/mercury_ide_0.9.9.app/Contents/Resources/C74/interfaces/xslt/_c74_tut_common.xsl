<?xml version="1.0"?>

<!--
  Copyright (c) 2012 Cycling '74

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:variable name="doctype" select="'tutorial'"/>
  <xsl:include href='./_c74_platform.xsl'/>

  <xsl:variable name="refs_root_loc">
    <xsl:value-of select="concat($thisdir, '../../refpages')"/>
  </xsl:variable>

  <xsl:variable name="refs_root_link" select="'../../refpages'"/>


  <!-- for openfilefront -->
  <xsl:variable name="patchname" >
    <xsl:choose>
      <xsl:when test="/chapter/openfile">
        <xsl:value-of select="/chapter/openfile/@name" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="/chapter/setdocpatch/@name" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:variable name="patchfile" >
    <xsl:choose>
      <xsl:when test="/chapter/openfile">
        <xsl:value-of select="/chapter/openfile/@patch" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="/chapter/setdocpatch/@patch" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:template match="/">
    <html>
      <head>
        <!-- <style type="text/factorydir">
          <xsl:value-of select="document('_c74_common.factorydir')" disable-output-escaping="yes" />
        </style> -->
        <link rel="stylesheet" type="text/css">
          <xsl:attribute name="href"><xsl:value-of select="concat($xsltdir, '_c74_common.css')" /></xsl:attribute>
        </link>
        <title><xsl:value-of select="/chapter/@name"/></title>
      </head>
      <body>
        <xsl:if test="$patchfile != ''">
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="concat('max:openfilefront/', $patchname, '/', $patchfile)"/>
            </xsl:attribute>
            <xsl:attribute name="class">open_tutorial</xsl:attribute>
            Open Tutorial
          </a>
        </xsl:if>
        <!--
              Go and apply all the templates for the root
              -->
        <xsl:apply-templates select="chapter" />
      </body>
    </html>
  </xsl:template>

  <xsl:template match="chapter">
    <div class="basestyle">
      <xsl:apply-templates select = "*[not(self::previous | self::next | self::parent)]" />
      <div class="related">
        <div class="prev">
          <xsl:apply-templates select = "*[self::previous]" />
        </div>
        <div class="parent">
          <xsl:apply-templates select = "*[self::parent]" />
        </div>
        <div class="next">
          <xsl:apply-templates select = "*[self::next]" />
        </div>
      </div>
    </div>
  </xsl:template>

<!--
      Body styles
      -->

  <xsl:template match="previous">
    <xsl:call-template name="handle_link">
      <xsl:with-param name="linkname" select="@name" />
      <xsl:with-param name="linktype" select="'tutorial'" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="next">
    <xsl:call-template name="handle_link">
      <xsl:with-param name="linkname" select="@name" />
      <xsl:with-param name="linktype" select="'tutorial'" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="parent">
    <xsl:call-template name="handle_link">
      <xsl:with-param name="linkname" select="@name" />
      <xsl:with-param name="linktype" select="'tutorial'" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="openpatchlink">
    <xsl:if test="$patchfile != ''">
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="concat('max:openfilefront/', $patchname, '/', $patchfile)"/>
        </xsl:attribute>
        <xsl:apply-templates />
      </a>
    </xsl:if>
  </xsl:template>

<!--
      markup elements
      -->
  <xsl:template match="o">
    <xsl:call-template name="object_link">
      <xsl:with-param name="objname">
        <xsl:if test="@objname"><xsl:value-of select="@objname"/></xsl:if>
      </xsl:with-param>
      <xsl:with-param name="name">
        <xsl:value-of select="."/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

<!-- <xsl:template match="seealsolist">
  <div class="header2">
    <xsl:apply-templates/>
  </div>
</xsl:template> -->

  <xsl:template match="methodlist">
    <div class="boxedtext">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- <xsl:template match="example">
    <div class="imagebox">
      <img>
        <xsl:attribute name="src">
          <xsl:value-of select="concat($thisdir, @name)"/>
        </xsl:attribute>
      </img>
      <br />
    </div>
    <span class="caption"><xsl:value-of select="."/></span>
  </xsl:template> -->

</xsl:stylesheet>

