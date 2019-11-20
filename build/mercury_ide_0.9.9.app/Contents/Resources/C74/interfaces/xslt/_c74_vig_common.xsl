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
  <xsl:variable name="doctype" select="'vignette'"/>

  <xsl:include href='./_c74_platform.xsl'/>

  <xsl:variable name="refs_root_loc">
    <xsl:value-of select="concat($thisdir, '../../refpages')"/>
  </xsl:variable>

  <xsl:variable name="refs_root_link" select="'../../refpages'"/> <!-- relative to calling XML page -->

  <xsl:variable name="patchname" /> <!-- for openfilefront -->
  <xsl:variable name="patchfile" /> <!-- for openfilefront -->

  <xsl:template match="/">
    <html>
      <head>
        <!-- <style type="text/factorydir">
          <xsl:value-of select="document('_c74_common.factorydir')" disable-output-escaping="yes" />
        </style> -->
        <link rel="stylesheet" type="text/css">
          <xsl:attribute name="href"><xsl:value-of select="concat($xsltdir, '_c74_common.css')" /></xsl:attribute>
        </link>
        <title><xsl:value-of select="/vignette/@name"/></title>
      </head>
      <body>
        <!--
              Go and apply all the templates for the root
              -->
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

<!--
      Body styles
      -->

  <!-- not used in vignettes, removed, jb -->
  <!-- <xsl:template match="openpatchlink">
    <xsl:if test="$patchfile != ''">
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="concat('max:openfilefront/', $patchname, '/', $patchfile)"/>
        </xsl:attribute>
        <xsl:apply-templates />
      </a>
    </xsl:if>
  </xsl:template> -->

  <!--
        Body styles
        -->

    <xsl:template match="vignette">
      <div class="basestyle">
        <xsl:apply-templates/>
      </div>
    </xsl:template>

    <!-- JS Properties and Methods -->
    <xsl:template match="jsproperty_list">
      <section class="jsproperty_section">
        <h2><xsl:value-of select="@name"/> Properties</h2>
        <xsl:for-each select="jsproperty">
          <xsl:call-template name="jsproperty"/>
        </xsl:for-each>
      </section>
    </xsl:template>

    <xsl:template name="jsproperty">
      <xsl:variable name="typestr">
        <xsl:choose>
          <xsl:when test="@size and number(@size)!=1"><xsl:value-of select="@size"/><xsl:text> </xsl:text><xsl:value-of select="@type"/>s</xsl:when>
          <xsl:otherwise><xsl:value-of select="@type"/></xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="jsproperty_group">
        <h3 class="jsproperty_name">
          <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
          <xsl:value-of select="@name"/> <span class="type"> [<xsl:value-of select="$typestr"/>]</span><xsl:if test="@default"><span class="defaultval"> (default: <xsl:value-of select="@default" />)</span>
          </xsl:if>
        </h3>
        <xsl:if test="(@get=1 and @set!=1) or (@get!=1 and @set=1)">
          <div class="gs">
            <span class="heading">g/s</span><span class="value">
              <xsl:choose>
                <xsl:when test="@get=1">(get)</xsl:when>
                <xsl:when test="@set=1">(set)</xsl:when>
              </xsl:choose>
            </span>
          </div>
        </xsl:if>
        <p class="description">
          <xsl:choose>
            <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
              <xsl:apply-templates select="description"/>
            </xsl:when>
            <xsl:otherwise></xsl:otherwise>
          </xsl:choose>
        </p>
      </div>
    </xsl:template>

    <xsl:template match="jsmethod_list">
      <section class="jsmethod_list">
        <h2><xsl:value-of select="@name"/> Methods</h2>
        <xsl:for-each select="jsmethod">
          <xsl:call-template name="jsmethod"/>
        </xsl:for-each>
      </section>
    </xsl:template>

    <xsl:template name="jsmethod" >
      <div class="jsmethod_group">
        <h3 class="jsmethod_name">
          <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
          <xsl:value-of select="@name"/>
        </h3>
        <xsl:choose>
          <xsl:when test="arglist">
            <xsl:apply-templates select="arglist"/>
          </xsl:when>
          <xsl:otherwise></xsl:otherwise>
        </xsl:choose>
        <p class="description">
          <xsl:choose>
            <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
              <xsl:apply-templates select="description"/>
            </xsl:when>
            <xsl:otherwise></xsl:otherwise>
          </xsl:choose>
        </p>
      </div>
    </xsl:template >

    <!-- JSMethod arguments -->
    <xsl:template match="arglist">
      <xsl:if test="count(arg)">
        <h4>Arguments</h4>
        <div class="arguments">
          <xsl:for-each select="*">
            <xsl:choose>
              <xsl:when test="name()='arg'">
                <xsl:apply-templates select="."/>
              </xsl:when>
              <xsl:when test="name()='arggroup'">
                <span class="arglist_arggroup">
                  <u>
                    <xsl:if test="@type"><xsl:value-of select="@type"/> </xsl:if>
                    group
                    <xsl:if test="@optional=1"> (optional)</xsl:if>
                  </u>
                  <br/>
                  <xsl:apply-templates select="."/>
                  <u>end<xsl:if test="@type"> <xsl:value-of select="@type"/></xsl:if> group</u><br/>
                </span>
              </xsl:when>
              <xsl:otherwise>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
        </div>
      </xsl:if>
    </xsl:template>

    <xsl:template match="arg">
      <span class="arglist_arg">
        <xsl:value-of select="@name"/>
        <xsl:if test="@unit"> (<xsl:value-of select="@units"/>)</xsl:if>
        [<xsl:value-of select="@type"/>]
        <xsl:if test="@optional=1"> (optional)</xsl:if>
        <br/>
      </span>
    </xsl:template>

    <xsl:template match="arggroup">
      <xsl:for-each select="*">
        <xsl:apply-templates select="."/>
      </xsl:for-each>
    </xsl:template>

  <!--
        markup elements
        -->
    <xsl:template match="o">
      <xsl:call-template name="object_link">
        <xsl:with-param name="name" select="."/>
        <xsl:with-param name="objname" select="@objname"/>
      </xsl:call-template>
    </xsl:template>

    <xsl:template match="intro">
      <h2>Introduction</h2>
      <p>
      <xsl:apply-templates/>
      </p>
    </xsl:template>

    <xsl:template match="chapter">
      <h2><xsl:value-of select="@name"/></h2>
      <p>
      <xsl:apply-templates/>
      </p>
    </xsl:template>

    <xsl:template name="lastword">
      <xsl:param name="in" />
      <xsl:choose>
        <xsl:when test="substring-after($in, ' ')!=''">
          <xsl:call-template name="lastword">
            <xsl:with-param name="in" select="substring-after($in, ' ')"/>
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise><xsl:value-of select="$in"/></xsl:otherwise>
      </xsl:choose>
    </xsl:template>


  <xsl:template match="liveapi_object">
    <div class="liveapi_object_section">
      <h3 class="liveapi_object_name">
        <a>
          <xsl:attribute name="name"><xsl:value-of select="@name" /></xsl:attribute>
          <xsl:value-of select="@name"/>
        </a>
      </h3>
      <p class="description">
          <xsl:choose>
            <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
              <xsl:apply-templates select="description"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="digest"/>
            </xsl:otherwise>
          </xsl:choose>
      </p>
      <div class="liveapi_object_details">
        <xsl:apply-templates select="liveapi_path"/>
        <xsl:apply-templates select="liveapi_children"/>
        <xsl:apply-templates select="liveapi_properties"/>
        <xsl:apply-templates select="liveapi_functions"/>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="liveapi_path">
    <xsl:param name="path" />
    <h4>Canonical path</h4>
    <div class="path">
      <xsl:value-of select="@path"/>
    </div>
  </xsl:template>

  <xsl:template name="liveapi_typelink">
    <xsl:param name="type" />
    <xsl:variable name="trim">
      <xsl:call-template name="lastword">
        <xsl:with-param name="in" select="$type"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="substring-before($type, $trim)" />
    <a>
      <xsl:attribute name="href"><xsl:value-of select="concat('#', $trim)"/></xsl:attribute>
      <xsl:value-of select="$trim"/>
    </a>
  </xsl:template>

  <xsl:template match="liveapi_children">
    <h4>Children</h4>
    <xsl:choose>
      <xsl:when test="count(liveapi_child) > 0">
        <xsl:for-each select="liveapi_child">
          <div class="liveapi_child_group">
            <h5 class="liveapi_child_name">
              <xsl:value-of select="@name"/>
            </h5>
            <div class="type">
              <span class="heading">Type</span>
              <span class="value">
                <xsl:call-template name="liveapi_typelink">
                  <xsl:with-param name="type" select="@type"/>
                </xsl:call-template>
              </span>
            </div>
            <div class="access">
              <span class="heading">Access</span>
              <span class="value">
                <xsl:choose>
                  <xsl:when test="@gso='gso'">get, set, observe</xsl:when>
                  <xsl:when test="@gso='gs-'">get, set</xsl:when>
                  <xsl:when test="@gso='g-o'">get, observe</xsl:when>
                  <xsl:when test="@gso='-so'">set, observe</xsl:when>
                  <xsl:when test="@gso='g--'">get</xsl:when>
                  <xsl:when test="@gso='-s-'">set</xsl:when>
                  <xsl:when test="@gso='--o'">observe</xsl:when>
                  <xsl:otherwise>none</xsl:otherwise>
                </xsl:choose>
              </span>
            </div>
            <h6>Description</h6>
            <p class="description">
              <xsl:choose>
                <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
                  <xsl:apply-templates select="description"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:apply-templates select="digest"/>
                </xsl:otherwise>
              </xsl:choose>
            </p>
          </div>
        </xsl:for-each>
      </xsl:when>
      <xsl:otherwise>
        <div class="none">
          None
        </div>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="liveapi_properties">
    <h4>Properties</h4>
    <xsl:choose>
      <xsl:when test="count(liveapi_property) > 0">
        <xsl:for-each select="liveapi_property">
          <div class="liveapi_property_group">
            <h5 class="liveapi_property_name">
              <xsl:value-of select="@name"/>
            </h5>
            <div class="type">
              <span class="heading">Type</span>
              <span class="value">
                <xsl:call-template name="liveapi_typelink">
                  <xsl:with-param name="type" select="@type"/>
                </xsl:call-template>
              </span>
            </div>
            <div class="access">
              <span class="heading">Access</span>
              <span class="value">
                <xsl:choose>
                  <xsl:when test="@gso='gso'">get, set, observe</xsl:when>
                  <xsl:when test="@gso='gs-'">get, set</xsl:when>
                  <xsl:when test="@gso='g-o'">get, observe</xsl:when>
                  <xsl:when test="@gso='-so'">set, observe</xsl:when>
                  <xsl:when test="@gso='g--'">get</xsl:when>
                  <xsl:when test="@gso='-s-'">set</xsl:when>
                  <xsl:when test="@gso='--o'">observe</xsl:when>
                  <xsl:otherwise>none</xsl:otherwise>
                </xsl:choose>
              </span>
            </div>
            <h6>Description</h6>
            <p class="description">
              <xsl:choose>
                <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
                  <xsl:apply-templates select="description"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:apply-templates select="digest"/>
                </xsl:otherwise>
              </xsl:choose>
            </p>
          </div>
        </xsl:for-each>
      </xsl:when>
      <xsl:otherwise>
        <div class="none">
          None
        </div>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="liveapi_functions">
    <h4>Functions</h4>
    <xsl:for-each select="liveapi_function">
      <div class="liveapi_function_group">
        <h5 class="liveapi_function_name">
          <xsl:value-of select="@name"/>
        </h5>
        <p class="description">
          <xsl:choose>
            <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
              <xsl:apply-templates select="description"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:apply-templates select="digest"/>
            </xsl:otherwise>
          </xsl:choose>
        </p>
      </div>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="thesaurus">
    <xsl:for-each select="thesaurusentrygroup">
      <div class="thesaurusgroup">
        <h2><xsl:apply-templates select="thesaurusheader" /></h2>
        <table>
          <xsl:for-each select="thesaurusentry">
            <tr>
              <td class="thesauruskey"><xsl:apply-templates select="thesauruskey" /></td>
              <td class="thesaurusobjects"><xsl:apply-templates select="thesaurusobjectlist" /></td>
            </tr>
          </xsl:for-each>
        </table>
      </div>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="thesaurusobjectlist">
    <xsl:variable name="objcount"><xsl:value-of select="count(./thesaurusobject)"/></xsl:variable>
    <xsl:if test="$objcount > 0">
      <xsl:for-each select="thesaurusobject">
        <xsl:apply-templates />
        <xsl:if test="position() != $objcount">, </xsl:if>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
