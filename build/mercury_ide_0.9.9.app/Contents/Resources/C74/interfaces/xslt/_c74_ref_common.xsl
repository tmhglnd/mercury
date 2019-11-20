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
  <xsl:variable name="doctype" select="'refpage'"/>

  <xsl:variable name="isbox">
    <xsl:choose>
      <xsl:when test="/c74object/@name != 'jbox' and not(number(/c74object/@box)=0)">1</xsl:when>
      <xsl:otherwise>0</xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:include href='./_c74_platform.xsl'/>

  <xsl:variable name="refs_root_loc">
    <xsl:value-of select="concat($thisdir, '..')"/>
  </xsl:variable>

  <xsl:variable name="refs_root_loc_local">
    <xsl:value-of select="concat($thisdir, '..')"/>
  </xsl:variable>

  <xsl:variable name="refs_root_link" select="concat($thisdir, '..')"/>

  <xsl:variable name="patchname" /> <!-- for openfilefront -->
  <xsl:variable name="patchfile" /> <!-- for openfilefront -->

  <xsl:variable name="reftitle">
    <xsl:choose>
      <xsl:when test="/liveapidoc/@title">
        <xsl:value-of select="/liveapidoc/@title"/>
      </xsl:when>
      <xsl:when test="/c74object/@title">
        <xsl:value-of select="/c74object/@title"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="/c74object/@name"/>
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
        <title><xsl:value-of select="$reftitle"/>
        <xsl:if test="not(/c74object/@title)"><xsl:text> Reference</xsl:text></xsl:if>
        </title>
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
      c74object: root element; this determines how the entire doc will be rendered
      -->
  <xsl:template match="c74object">
    <xsl:if test="not(starts-with(/c74object/@module, 'gen-'))">
      <a>
        <xsl:attribute name="class">open_help</xsl:attribute>
        Open Help
      </a>
    </xsl:if>
    <xsl:choose>
      <xsl:when test="@private='1'"><h2>This file for Cycling '74 internal use only.</h2></xsl:when>
      <xsl:otherwise>
        <h1 draggable="true" class="ref_title">
          <xsl:value-of select="$reftitle"/>
        </h1>
        <p class="digest">
          <xsl:apply-templates select="digest"/>
        </p>
        <xsl:if test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
          <section class="object_description">
            <h2>Description</h2>
            <p><xsl:apply-templates select="description"/></p>
          </section>
        </xsl:if>
        <xsl:apply-templates select="examplelist"/>
        <xsl:if test="discussion and normalize-space(discussion) != '' and normalize-space(discussion) != 'TEXT_HERE'">
          <section class="object_discussion open">
            <h2>Discussion</h2>
            <p><xsl:apply-templates select="discussion"/></p>
          </section>
        </xsl:if>

        <xsl:if test="objarglist">
          <section class="argument_section">
            <h2>Arguments</h2>
            <xsl:apply-templates select="objarglist" />
          </section>
        </xsl:if>

        <xsl:apply-templates select="constructorlist"/> <!-- GEN -->
        <xsl:apply-templates select="geninletlist"/> <!-- GEN -->

        <xsl:apply-templates select="mop"/>

        <xsl:if test="(attributelist and count(attributelist/attribute) &gt; 0) or $isbox=1 or OB3D or snapshot or mcwrapper">
          <section class="attribute_section">
            <h2>Attributes</h2>
            <xsl:apply-templates select="attributelist"/>
            <xsl:call-template name="jboxattrs"/>
            <xsl:call-template name="OB3Dattrs"/>
            <xsl:call-template name="snapshotattrs"/>
            <xsl:call-template name="mcwrapperattrs"/>
            <xsl:apply-templates select="parameter" />
          </section>
        </xsl:if>

        <!-- <xsl:apply-templates select="liveapi_object"/> --> <!-- ONLY USED IN VIGNETTES -->
        <xsl:apply-templates select="apiinletlist"/>
        <xsl:apply-templates select="apioutletlist"/>

        <xsl:if test="(methodlist and count(methodlist/method) &gt; 0) or OB3D or snapshot or mcwrapper">
          <section class="method_section">
            <h2>Messages</h2>
            <xsl:apply-templates select="methodlist"/>
            <xsl:call-template name="OB3Dmethods"/>
            <xsl:call-template name="snapshotmethods"/>
            <xsl:call-template name="mcwrappermethods"/>
          </section>
        </xsl:if>

        <!-- <xsl:apply-templates select="entrylist"/>  --> <!-- ONLY PARAMETER USES THIS, DISABLING -->
        <xsl:apply-templates select="menuitemlist"/>
        <xsl:apply-templates select="misc"/>
        <xsl:apply-templates select="seealsolist"/>
        <!-- <xsl:apply-templates select="topiclist"/> -->
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

<!--
      a few common elements
      -->

  <xsl:template match="digest">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="description">
    <xsl:if test="normalize-space() != 'TEXT_HERE'">
      <xsl:apply-templates/>
    </xsl:if>
  </xsl:template>

  <xsl:template match="discussion">
    <xsl:if test="normalize-space() != 'TEXT_HERE'">
      <xsl:apply-templates/>
    </xsl:if>
  </xsl:template>

  <xsl:template match="sig">
    <i>
      <xsl:apply-templates/>
    </i>
  </xsl:template>

<!--
      markup elements
      -->
<!--
      Inlets and Outlets (not used)
      -->
  <xsl:template match="inletlist" />
  <xsl:template match="outletlist" />

  <!--
      Arguments
    -->
  <xsl:template match="objarglist">
    <xsl:variable name="none">
<!--    <xsl:for-each select="objarg"> -->
      <xsl:if test="not(objarg) or translate(objarg/description, ' &#9;&#13;&#10;', ' ')='None.' or (count(objarg)=1 and translate(objarg/description, ' &#9;&#13;&#10;', ' ')='TEXT_HERE')">1</xsl:if>
<!--    </xsl:for-each> -->
    </xsl:variable>
    <xsl:variable name="nested">
      <xsl:if test="parent::objarg">1</xsl:if>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$none='1' and $nested=''">
        <p class="description no_arguments">None.</p>
      </xsl:when>
      <xsl:otherwise>
        <xsl:for-each select="objarg">
          <div class="argument_group">
            <h3 class="argument_name">
              <xsl:if test="$nested = '' ">
                <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
              </xsl:if>
              <xsl:value-of select="@name"/><span class="type"> [<xsl:value-of select="@type"/>]</span>
            </h3>
            <xsl:if test="@optional = 1">
              <div class="optional">Optional</div>
            </xsl:if>
            <xsl:if test="@units">
            <div class="units">
              <span class="heading">Units</span><span class="value"><xsl:value-of select="@units"/></span>
            </div>
            </xsl:if>
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
          <!-- TODO: Is the following needed anymore? come back to it later [TAP] ... -->
          <xsl:if test="objarglist">
            <tr>
              <td colspan="4">
                <xsl:apply-templates select="./objarglist"/>
              </td>
            </tr>
          </xsl:if>
        </xsl:for-each>
      </xsl:otherwise>
    </xsl:choose>
    <!-- class="argument_section" -->
  </xsl:template>
<!--
      Methods
      -->
  <xsl:template name="method">
    <xsl:param name="showname"/>
    <div class="method_group">
      <h3 class="method_name">
        <xsl:attribute name="name">
            <xsl:value-of select="@name"/>
        </xsl:attribute>
        <xsl:choose>
          <xsl:when test="$showname=''">
            <xsl:value-of select="@name"/>
          </xsl:when>
          <xsl:otherwise>
            <span class="inletname">&#xA0;&#xA0;(inlet<xsl:value-of select="$showname"/>)</span>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:if test="attributelist/attribute[@name='obsolete']"><span class="method_obsolete" /></xsl:if>
        <xsl:if test="attributelist/attribute[@name='renamed']"><span class="method_renamed"><xsl:attribute name="data-newname"><xsl:value-of select="attributelist/attribute[@name='renamed']/@value"/></xsl:attribute></span></xsl:if>
        <xsl:if test="attributelist/attribute[@name='introduced']"><span class="method_introduced"><xsl:value-of select="attributelist/attribute[@name='introduced']/@value"/></span></xsl:if>
      </h3>
      <xsl:choose>
        <xsl:when test="arglist">
          <xsl:apply-templates select="arglist"/>
        </xsl:when>
        <xsl:otherwise></xsl:otherwise>
      </xsl:choose>
      <div class="description">
        <xsl:choose>
          <xsl:when test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
            <xsl:apply-templates select="description"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="digest"/>
          </xsl:otherwise>
        </xsl:choose>
      </div>
    </div>
  </xsl:template>


  <xsl:template name="generate_method">
    <xsl:choose>
      <xsl:when test="@name='int'">
        <xsl:call-template name="method">
          <xsl:with-param name="showname"/>
        </xsl:call-template>
        <xsl:for-each select="../method">
          <xsl:sort select="@name"/>
          <xsl:if test="starts-with(@name,'in') and string-length(@name)=3 and translate(@name, '123456789', '')='in'">
            <xsl:call-template name="method">
              <xsl:with-param name="showname" select="substring-after(@name,'in')"/>
            </xsl:call-template>
          </xsl:if>
        </xsl:for-each>
      </xsl:when>
      <xsl:when test="@name='float'">
        <xsl:call-template name="method">
          <xsl:with-param name="showname"/>
        </xsl:call-template>
        <xsl:for-each select="../method">
          <xsl:sort select="@name"/>
          <xsl:if test="starts-with(@name,'ft') and string-length(@name)=3 and translate(@name, '123456789', '')='ft'">
            <xsl:call-template name="method">
              <xsl:with-param name="showname" select="substring-after(@name,'ft')"/>
            </xsl:call-template>
          </xsl:if>
        </xsl:for-each>
      </xsl:when>
      <xsl:when test="starts-with(@name,'in') and string-length(@name)=3 and translate(@name, '123456789', '')='in'"/>
      <xsl:when test="starts-with(@name,'ft') and string-length(@name)=3 and translate(@name, '123456789', '')='ft'"/>
      <xsl:otherwise>
        <xsl:call-template name="method">
          <xsl:with-param name="showname"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="methodlist">
    <xsl:for-each select="method">
      <xsl:if test="not(attributelist/attribute[@name='obsolete']) or attributelist/attribute[@name='renamed']">
        <xsl:call-template name="generate_method"/>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="OB3Dmethods">
    <xsl:if test="/c74object/OB3D">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'jit-ref/jit.group-gl.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'jit-ref/jit.group-gl.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure">
        <h3>OB3D Messages</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/methodlist/method">
            <xsl:call-template name="generate_method" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="snapshotmethods">
    <xsl:if test="/c74object/snapshot">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'msp-ref/snapshot-group.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'msp-ref/snapshot-group.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure">
        <h3>Snapshot Messages</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/methodlist/method">
            <xsl:call-template name="generate_method" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="mcwrappermethods">
    <xsl:if test="/c74object/mcwrapper">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'msp-ref/mcwrapper-group.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'msp-ref/mcwrapper-group.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure open">
        <h3>Multichannel Group Messages</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/methodlist/method">
            <xsl:call-template name="generate_method" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

<!--
      Attributes
      -->
  <xsl:template name="generate_attribute">
    <!-- using a variable to filter out box attrs! -->
    <xsl:variable name="boxattr">
      <xsl:if test="/c74object[@name!='jbox'] and attributelist/attribute[@name='jboxattr'] and attributelist/attribute[@value=1]">1</xsl:if>
    </xsl:variable>
    <xsl:variable name="alias">
      <xsl:if test="attributelist/attribute[@name='alias']">1</xsl:if>
    </xsl:variable>
    <xsl:if test="$boxattr='' and $alias='' and (not(attributelist/attribute[@name='obsolete']) or attributelist/attribute[@name='renamed'])">
      <xsl:variable name="typestr">
        <xsl:choose>
          <xsl:when test="@size and number(@size)!=1"><xsl:value-of select="@size"/><xsl:text> </xsl:text><xsl:value-of select="@type"/>s</xsl:when>
          <xsl:otherwise><xsl:value-of select="@type"/></xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="attribute_group">
        <h3 class="attribute_name">
          <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
          <xsl:value-of select="@name"/> <span class="type"> [<xsl:value-of select="$typestr"/>]</span><xsl:if test="attributelist/attribute[@name='default']"><span class="defaultval"> (default: <xsl:value-of select="attributelist/attribute[@name='default']/@value"/>)</span>
          </xsl:if>
          <!-- <xsl:if test="attributelist/attribute[@name='obsolete']"><span class="attr_obsolete" /></xsl:if> -->
          <xsl:if test="attributelist/attribute[@name='renamed']"><span class="attr_renamed"><xsl:attribute name="data-newname"><xsl:value-of select="attributelist/attribute[@name='renamed']/@value"/></xsl:attribute></span></xsl:if>
          <xsl:if test="attributelist/attribute[@name='introduced']"><span class="attr_introduced"><xsl:value-of select="attributelist/attribute[@name='introduced']/@value"/></span></xsl:if>
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
            <xsl:otherwise>
              <xsl:apply-templates select="digest"/>
            </xsl:otherwise>
          </xsl:choose>
          <xsl:if test="attributelist/attribute[@name='enumvals']/enumlist">
            <br/><br/>Possible values:<br/>
            <xsl:for-each select="attributelist/attribute[@name='enumvals']/enumlist/enum">
              <br/>
              <xsl:choose>
                <xsl:when test="../../../attribute[@name='style']/@value='enum'">
                  '<xsl:value-of select="normalize-space(@name)"/>'
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="position() - 1"/> = '<xsl:value-of select="normalize-space(@name)"/>'
                </xsl:otherwise>
              </xsl:choose>
              <xsl:if test="digest and normalize-space(digest) != '' and normalize-space(digest) != 'TEXT_HERE'"> (<xsl:apply-templates select="digest"/>)</xsl:if>
              <xsl:if test="description and normalize-space(description) != '' and normalize-space(description) != 'TEXT_HERE'">
                <br/><xsl:apply-templates select="description"/><br/>
              </xsl:if>
            </xsl:for-each>
          </xsl:if>
        </p>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template match="attributelist">
    <xsl:for-each select="attribute">
      <xsl:call-template name="generate_attribute" />
    </xsl:for-each>

    <!-- DO WE NEED THIS AT ALL???? APPARENTLY ONLY USED BY FLONUM -->
    <xsl:for-each select="attribute_rgb_legacy">
      <xsl:variable name="boxattr">
        <xsl:if test="/c74object[@name!='jbox'] and attributelist/attribute[@name='jboxattr'] and attributelist/attribute[@value=1]">1</xsl:if>
      </xsl:variable>
      <xsl:if test="position() = 1">
        <!-- input some kind of sublegacy header -->
        <h4 class="legacy">Legacy</h4>
      </xsl:if>
      <xsl:if test="$boxattr=''">
        <div class="attribute_group">
          <h3 class="attribute_name">
            <xsl:value-of select="@name"/>
          </h3>
          <div class="type">
            <span class="heading">Type</span><span class="value"></span>
            <xsl:text>list (3 ints)</xsl:text>
          </div>
          <xsl:choose>
            <xsl:when test="@get=1 and @set=1">
              <div class="type"/>
            </xsl:when>
            <xsl:when test="@get=1">
              <div class="type">(get)</div>
            </xsl:when>
            <xsl:when test="@set=1">
              <div class="type">(set)</div>
            </xsl:when>
            <xsl:otherwise>
              <div class="type">invisible</div> <!-- should not be shown -->
            </xsl:otherwise>
          </xsl:choose>
          <p class="description">
            <!-- <span class="attrname"><xsl:value-of select="@name"/></span> is a legacy RGB alias for the <span class="attrname"><xsl:value-of select="attributelist/attribute[@name='alias']/@value"/></span> attribute. See <a href="../../vignettes/core/maxcolor/maxcolor.maxvig.xml">here</a> for more information. -->
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
      </xsl:if>
    </xsl:for-each>
    <!-- END __ DO WE NEED THIS AT ALL???? APPARENTLY ONLY USED BY FLONUM -->
  </xsl:template>

  <xsl:template name="jboxattrs">
    <xsl:if test="$isbox=1">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'max-ref/jbox.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'max-ref/jbox.maxref.xml')"/>
          </xsl:when>
          <xsl:when test="document(concat($factorydir,'kernel-ref/jbox.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'kernel-ref/jbox.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure">
        <h3>Common Box Attributes</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/attributelist/attribute">
            <xsl:call-template name="generate_attribute" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="OB3Dattrs">
    <xsl:if test="/c74object/OB3D">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'jit-ref/jit.group-gl.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'jit-ref/jit.group-gl.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure">
        <h3>OB3D Attributes</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/attributelist/attribute">
            <xsl:call-template name="generate_attribute" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="snapshotattrs">
    <xsl:if test="/c74object/snapshot">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'msp-ref/snapshot-group.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'msp-ref/snapshot-group.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure">
        <h3>Snapshot Attributes</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/attributelist/attribute">
            <xsl:call-template name="generate_attribute" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="mcwrapperattrs">
    <xsl:if test="/c74object/mcwrapper">
      <xsl:variable name="docpath">
        <xsl:choose>
          <xsl:when test="document(concat($factorydir,'msp-ref/mcwrapper-group.maxref.xml'))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'msp-ref/mcwrapper-group.maxref.xml')"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <div class="disclosure open">
        <h3>Multichannel Group Attributes</h3>
        <div class="disclosure_body">
          <xsl:for-each select="document($docpath)/c74object/attributelist/attribute">
            <xsl:call-template name="generate_attribute" />
          </xsl:for-each>
        </div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template name="generate_entry">
    <div class="entry_group">
      <h3 class="entry_name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:value-of select="@name" />
      </h3>
      <div class="type">
        <span class="heading">Type</span><span class="value"><xsl:value-of select="@type"/></span>
      </div>
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
  </xsl:template>

    <xsl:template name="generate_parameter_entry">
    <div class="entry_group">
      <h3 class="entry_name parameter_name">
        <xsl:attribute name="name"><xsl:value-of select="@anchor"/></xsl:attribute>
        <xsl:value-of select="@name" />
      </h3>
      <div class="type">
        <span class="heading">Type</span><span class="value"><xsl:value-of select="@type"/></span>
      </div>
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
  </xsl:template>

  <xsl:template match="parameter">
    <xsl:variable name="docpath">
      <xsl:choose>
        <xsl:when test="document(concat($factorydir,'m4l-ref/parameters.maxref.xml'))/c74object/@name">
          <xsl:value-of select="concat($factorydir,'m4l-ref/parameters.maxref.xml')"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($factorydir,'max-ref/jbogus.maxref.xml')"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <div class="disclosure">
      <h3>Parameter Attributes</h3>
      <div class="disclosure_body">
        <xsl:for-each select="document($docpath)/c74object/entrylist/entry">
          <xsl:call-template name="generate_parameter_entry" />
        </xsl:for-each>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="entrylist">
    <section id="entry_section">
      <h2><xsl:value-of select="@name"/></h2>
      <xsl:for-each select="entry">
        <xsl:call-template name="generate_entry"/>
      </xsl:for-each>
    </section>
  </xsl:template>

  <!-- GEN -->
  <xsl:template match="constructorlist">
    <section id="constructor_section">
      <h2>Constructors</h2>
      <ul>
        <xsl:for-each select="constructor">
          <div class="constructor_group">
            <li class="description">
              <xsl:apply-templates select="digest"/>
            </li>
          </div>
        </xsl:for-each>
      </ul>
    </section>
  </xsl:template>

  <xsl:template match="geninletlist">
    <section id="geninlet_section">
      <h2>Inlets</h2>
      <xsl:for-each select="geninlet">
        <div class="geninlet_group">
          <h3 class="geninlet_name"><xsl:value-of select="@name"/></h3>
          <div class="type">
            <span class="heading">Type</span><span class="value"><xsl:value-of select="@type"/></span>
          </div>
          <p class="description">
            <xsl:apply-templates select="digest"/>
          </p>
        </div>
      </xsl:for-each>
    </section>
  </xsl:template>

<!--
      Arguments (methods)
      -->
  <xsl:template match="arglist">
    <xsl:if test="count(arg) and not(starts-with(arg[1]/@name, 'ARG_NAME_'))">
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
                  <xsl:if test="@optional"> (optional)</xsl:if>
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
      <br/>
    </span>
  </xsl:template>

  <xsl:template match="arggroup">
    <xsl:for-each select="*">
      <xsl:apply-templates select="."/>
    </xsl:for-each>
  </xsl:template>

  <!--
        Menu Items
        -->
  <xsl:template match="menuitemlist">
    <xsl:if test="menuitem">
      <section class="menuitem_section">
        <h2>Menu Items</h2>
        <xsl:for-each select="menuitem">
          <div class="menuitem_group">
            <h3 class="menuitem_name">
              <xsl:value-of select="@name"/>
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
          </div>
        </xsl:for-each>
      </section>
    </xsl:if>
  </xsl:template>
<!--
      Examples
      -->
  <xsl:template match="examplelist">
    <xsl:variable name="imgname">
      <xsl:call-template name="name_replace">
        <xsl:with-param name="name" select="/c74object/@name"/>
      </xsl:call-template>
    </xsl:variable>
    <div class="examples_section">
      <h2>Examples</h2>
      <div class="imagebox">
      <xsl:for-each select="example">
        <img>
          <xsl:attribute name="src">
            <xsl:value-of select="concat($fileurl, 'images/', $imgname, '.png')" />
            <!-- <xsl:value-of select="concat($thisdir, 'images/', $imgname, '.png')" /> -->
          </xsl:attribute>
        </img>
        <div class="caption"><xsl:value-of select="@caption"/></div>
      </xsl:for-each>
      </div>
      <xsl:apply-templates/>
    </div>
<!-- class="examples_section" -->
  </xsl:template>
<!--
      "misc": Output, Inspector, etc.
      -->
  <xsl:template match="misc">
    <section class="misc_section">
      <h2>
        <xsl:value-of select="@name"/>
      </h2>
      <xsl:for-each select="entry">
        <xsl:sort select="@name"/>
        <div class="misc_group">
          <h3 class="misc_name"><xsl:value-of select="@name"/></h3>
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
        <!-- I WANT TO BE ABLE TO FILTER OUT LABEL IF PREVIOUS MATCHES @name
              BUT THIS IS IMPOSSIBLE IN XSLT 1.0 -->
        <!-- <div class="outputmessage">
          <xsl:if test="$oldname != @name">
            <div class="name"><xsl:value-of select="@name"/>:</div>
          </xsl:if>
          <xsl:apply-templates select="digest"/>
        </div>
        <div class="description">
          <xsl:apply-templates select="description"/>
        </div> -->
      </xsl:for-each>
    </section>
<!-- class="misc_section" -->
  </xsl:template>

<!--
      MOP: Jitter
      -->
  <xsl:template match="mop">
    <section class="mop_section">
      <h2>Matrix Operator</h2>
      <div>matrix inputs:<xsl:value-of select="@matrixinputcount"/>, matrix outputs:<xsl:value-of select="@matrixoutputcount"/></div>
      <table class="mop_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IOProc</th>
            <th>Planelink</th>
            <th>Typelink</th>
            <th>Dimlink</th>
            <th>Plane</th>
            <th>Dim</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="matrixinput">
            <tr>
            <td><xsl:value-of select="@name"/></td>
            <td><xsl:value-of select="@ioproc"/></td>
            <td><xsl:value-of select="@planelink"/></td>
            <td><xsl:value-of select="@typelink"/></td>
            <td><xsl:value-of select="@dimlink"/></td>
            <td><xsl:value-of select="@minplanecount"/></td>
            <td><xsl:value-of select="@mindimcount"/></td>
            <td><xsl:value-of select="types"/></td>
            </tr>
          </xsl:for-each>
          <xsl:for-each select="matrixoutput">
            <tr>
            <td><xsl:value-of select="@name"/></td>
            <td><!--<xsl:value-of select="@ioproc"/> -->n/a</td>
            <td><xsl:value-of select="@planelink"/></td>
            <td><xsl:value-of select="@typelink"/></td>
            <td><xsl:value-of select="@dimlink"/></td>
            <td><xsl:value-of select="@minplanecount"/></td>
            <td><xsl:value-of select="@mindimcount"/></td>
            <td><xsl:value-of select="types"/></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
      <div class="disclosure">
        <h3>More about Matrix Operators</h3>
        <div class="disclosure_body">
          <div class="disclosure">
            <h3>The Jitter MOP</h3>
            <div class="disclosure_body">
              <xsl:apply-templates select="document(concat($factorydir,'jit-ref/jit.group-mop.maxref.xml'))/c74object/description"/>
            </div>
          </div>
          <div class="disclosure">
            <h3>MOP Arguments</h3>
            <div class="disclosure_body">
              <xsl:apply-templates select="document(concat($factorydir,'jit-ref/jit.group-mop.maxref.xml'))/c74object/objarglist"/>
            </div>
          </div>
          <div class="disclosure">
            <h3>MOP Attributes</h3>
            <div class="disclosure_body">
              <xsl:apply-templates select="document(concat($factorydir,'jit-ref/jit.group-mop.maxref.xml'))/c74object/attributelist"/>
            </div>
          </div>
          <div class="disclosure">
            <h3>MOP Messages</h3>
            <div class="disclosure_body">
              <xsl:apply-templates select="document(concat($factorydir,'jit-ref/jit.group-mop.maxref.xml'))/c74object/methodlist"/>
            </div>
          </div>
        </div>
      </div>
    </section>
<!-- id="mop_section" -->
  </xsl:template>

  <xsl:template match="o">
    <xsl:call-template name="object_link">
      <xsl:with-param name="name" select="."/>
      <xsl:with-param name="objname" select="@objname"/>
      <xsl:with-param name="dispname" select="."/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template match="text()">
    <xsl:variable name="trim" select="normalize-space(.)"/>
    <xsl:variable name="first" select="substring($trim,1,1)"/>
    <xsl:variable name="length" select="string-length($trim)"/>
    <xsl:variable name="last" select="substring($trim,$length,1)"/>

    <xsl:if test="$first = translate($first, '.,?!:;-)&quot; &#9;&#13;&#10;', '#')">
      <xsl:text> </xsl:text>
    </xsl:if>
    <xsl:value-of select="$trim"/>
    <xsl:if test="$last = translate($last, '(&quot;', '#')">
      <xsl:text> </xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="apiinletlist">
    <section class="inlet_section">
      <h2>Inlets</h2>
      <xsl:for-each select="inlet">
        <div class="inlet_group">
          <h3 class="inlet_name">
            <xsl:value-of select="@name"/>
          </h3>
          <div class="description">
            <xsl:apply-templates/>
          </div>
        </div>
      </xsl:for-each>
    </section>
<!-- class="inlet_section" -->
  </xsl:template>
<!--
      Outlets
      -->
  <xsl:template match="apioutletlist">
    <section class="outlet_section">
      <h2>Outlets</h2>
      <xsl:for-each select="outlet">
        <div class="outlet_group">
          <h3 class="outlet_name">
            <xsl:value-of select="@name"/>
          </h3>
          <div class="description">
            <xsl:apply-templates/>
          </div>
        </div>
      </xsl:for-each>
    </section>
<!-- class="outlet_section" -->
  </xsl:template>
</xsl:stylesheet>
