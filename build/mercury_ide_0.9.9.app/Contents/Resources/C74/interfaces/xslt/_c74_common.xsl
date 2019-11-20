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
  <xsl:param name="thisdir" select="'./'" />
  <xsl:param name="xsltdir" select="'./'" />
  <xsl:param name="factorydir" select="'./'" />
  <xsl:param name="fileurl" select="'./'" />
  <xsl:param name="readother" select="1"/>

  <xsl:output method="html"
      doctype-public="-//W3C//DTD HTML 4.01//EN"
      doctype-system="http://www.w3.org/TR/html4/strict.dtd"
      encoding="UTF-8"
      xml:lang="en"
      indent="yes" />

  <xsl:variable name="kernel">
    <xsl:choose>
      <xsl:when test="$readother = 1">
        <xsl:value-of select="document('./_c74_common.xml')/root/setting[@name='kernel']/@value"/>
      </xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

<!--
      markup elements
      -->
  <xsl:template name="name_replace">
    <xsl:param name="name"/>
    <xsl:choose>
      <xsl:when test="starts-with($name,'&gt;=')">
        <xsl:value-of select="concat('greaterthaneq',substring-after($name,'&gt;='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&lt;=')">
        <xsl:value-of select="concat('lessthaneq',substring-after($name,'&lt;='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'==')">
        <xsl:value-of select="concat('equals',substring-after($name,'=='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'!=')">
        <xsl:value-of select="concat('notequals',substring-after($name,'!='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'!-')">
        <xsl:value-of select="concat('rminus',substring-after($name,'!-'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'!/')">
        <xsl:value-of select="concat('rdiv',substring-after($name,'!='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&amp;&amp;')">
        <xsl:value-of select="concat('logand',substring-after($name,'&amp;&amp;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'||')">
        <xsl:value-of select="concat('logor',substring-after($name,'||'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&lt;&lt;')">
        <xsl:value-of select="concat('shiftleft',substring-after($name,'&lt;&lt;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&gt;&gt;')">
        <xsl:value-of select="concat('shiftright',substring-after($name,'&gt;&gt;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'+=')">
        <xsl:value-of select="concat('plusequals',substring-after($name,'+='))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'+')">
        <xsl:value-of select="concat('plus',substring-after($name,'+'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'-')">
        <xsl:value-of select="concat('minus',substring-after($name,'-'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'*')">
        <xsl:value-of select="concat('times',substring-after($name,'*'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'/')">
        <xsl:value-of select="concat('div',substring-after($name,'/'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&gt;')">
        <xsl:value-of select="concat('greaterthan',substring-after($name,'&gt;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&lt;')">
        <xsl:value-of select="concat('lessthan',substring-after($name,'&lt;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'&amp;')">
        <xsl:value-of select="concat('bitand',substring-after($name,'&amp;'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'|')">
        <xsl:value-of select="concat('bitor',substring-after($name,'|'))"/>
      </xsl:when>
      <xsl:when test="starts-with($name,'%')">
        <xsl:value-of select="concat('modulo',substring-after($name,'%'))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$name"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="a">
      <xsl:element name="a">
        <xsl:if test="@href">
          <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
        </xsl:if>
        <xsl:if test="@name">
          <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        </xsl:if>
        <xsl:value-of select="."/>
      </xsl:element>
  </xsl:template>

  <xsl:template match="embed">
    <xsl:element name="embed">
      <xsl:attribute name="src"><xsl:value-of select="@src"/></xsl:attribute>
      <xsl:attribute name="width"><xsl:value-of select="@width"/></xsl:attribute>
      <xsl:attribute name="height"><xsl:value-of select="@height"/></xsl:attribute>
      <xsl:attribute name="autoplay"><xsl:value-of select="@autoplay"/></xsl:attribute>
      <xsl:value-of select="."/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="area">
    <xsl:element name="area">
      <xsl:attribute name="shape"><xsl:value-of select="@shape"/></xsl:attribute>
      <xsl:attribute name="coords"><xsl:value-of select="@coords"/></xsl:attribute>
      <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
      <xsl:attribute name="alt"><xsl:value-of select="@alt"/></xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="mappedimg">
    <div class="mapped_img">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="map">
    <xsl:element name="map">
      <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      <xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
    <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="img">
    <xsl:element name="img">
      <xsl:attribute name="src">
        <!-- This is a proof of concept for using hosted virtual directories, but we're not using a web server anymore. -->
        <!-- <xsl:value-of select="concat('/~debug/', substring-after($thisdir, '../../maxmsp-misc/m5-docs/'), @src)" /> -->
        <xsl:value-of select="concat($fileurl, @src)" />
      </xsl:attribute>
      <xsl:if test="@width">
        <xsl:attribute name="width"><xsl:value-of select="@width"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@height">
        <xsl:attribute name="height"><xsl:value-of select="@height"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@border">
        <xsl:attribute name="border"><xsl:value-of select="@border"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@alt">
        <xsl:attribute name="alt"><xsl:value-of select="@alt"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@title">
        <xsl:attribute name="title"><xsl:value-of select="@title"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@usemap">
        <xsl:attribute name="usemap"><xsl:value-of select="@usemap"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="refurl">
    <xsl:param name="name"/>
    <xsl:param name="module" select="''"/>

    <xsl:variable name="tmprefname">
      <xsl:call-template name="name_replace">
        <xsl:with-param name="name" select="$name"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="refname">
      <xsl:call-template name="url-encode">
        <xsl:with-param name="str" select="$tmprefname"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="filename"><xsl:value-of select="$refname"/>.maxref.xml</xsl:variable>

    <xsl:variable name="t1">
      <xsl:if test="$readother = 1">
        <xsl:choose>
          <xsl:when test="not(normalize-space($module)='')"> <!-- module provided, don't search like crazy -->
            <xsl:if test="document(concat($refs_root_loc,'/',normalize-space($module),'/',$filename))/c74object/@name">
              <xsl:value-of select="concat($refs_root_loc,'/',normalize-space($module),'/',$filename)"/>
            </xsl:if>
          </xsl:when>
          <xsl:otherwise> <!-- no module provided -->
            <xsl:for-each select="document(concat($refs_root_loc,'/_c74_ref_modules.xml'))/root/module">
              <xsl:if test="document(concat($refs_root_loc,'/',normalize-space(.),'/',$filename))/c74object/@name">
                <xsl:value-of select="concat($refs_root_loc,'/',normalize-space(.),'/',$filename)"/>
              </xsl:if>
            </xsl:for-each>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:if>
    </xsl:variable>

    <xsl:variable name="t2">
      <xsl:if test="$readother = 1 and normalize-space($t1)=''">
      <!-- look in the factory directory -->
        <xsl:for-each select="document(concat($factorydir,'/_c74_ref_modules.xml'))/root/module">
          <xsl:if test="document(concat($factorydir,'/',normalize-space(.),'/',$filename))/c74object/@name">
            <xsl:value-of select="concat($factorydir,'/',normalize-space(.),'/',$filename)"/>
          </xsl:if>
        </xsl:for-each>
      </xsl:if>
    </xsl:variable>

    <xsl:variable name="temp">
      <xsl:choose>
        <xsl:when test="not(normalize-space($t2)='')">
          <xsl:value-of select="normalize-space($t2)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="normalize-space($t1)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
      <!-- note this delicious hack to return the first one found, even if there are multiples. yummy. -->
      <xsl:when test="not($temp='')">
        <xsl:value-of select="concat(substring-before($temp, '.xml'), '.xml')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="$kernel='1' and document(concat($refs_root_loc,'/kernel-ref/', $filename))/c74object/@name">
            <xsl:value-of select="concat($refs_root_link,'/kernel-ref/', $filename)"/>
          </xsl:when>
          <xsl:otherwise><xsl:value-of select="concat($thisdir,$filename)"/></xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="refpage">
    <xsl:param name="refname"/>
    <xsl:param name="dispname"/>
    <xsl:param name="tingename"/>
    <a>
      <xsl:attribute name="href">
        <xsl:call-template name="refurl">
          <xsl:with-param name="name" select="$refname"/>
        </xsl:call-template>
      </xsl:attribute>
      <xsl:if test="$tingename != ''">
        <xsl:attribute name="OnMouseOver">
        <xsl:value-of select="concat('parent.location.href=', '&quot;', 'max:tinge/', $patchname, '/', $tingename, '&quot;')"/>
        </xsl:attribute>
        <!-- <xsl:attribute name="OnMouseOut">
          <xsl:value-of select="concat('parent.location.href=', '&quot;', 'max:tinge/', '&quot;')"/>
        </xsl:attribute> -->
      </xsl:if>
      <xsl:value-of select="$dispname"/>
      <!-- <xsl:apply-templates/> -->
    </a>
  </xsl:template>

  <xsl:template name="object_link">
    <xsl:param name="name"/>
    <xsl:param name="objname"/>
    <xsl:param name="dispname"/>
    <xsl:variable name="oname">
      <xsl:value-of select="normalize-space($name)"/>
    </xsl:variable>
    <xsl:variable name="dname">
      <xsl:choose>
        <xsl:when test="$dispname!=''">
          <xsl:value-of select="normalize-space($dispname)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="normalize-space($name)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="/c74object/@name=$oname">
        <a class="hilit">
          <xsl:value-of select="normalize-space($dispname)"/>
        </a>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="refpage">
          <xsl:with-param name="refname" select="$oname"/>
          <xsl:with-param name="dispname" select="$dname"/>
          <xsl:with-param name="tingename" select="$objname"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="br">
    <br/>
  </xsl:template>

  <!-- <xsl:template match="m/text()">
  <xsl:value-of select="normalize-space(.)"/>
  <xsl:if test="contains(concat(.,'^$%'),' ^$%') and following-sibling::* and
   not(following-sibling::*[1]/node()[1][self::text() and starts-with(.,' ')])">
    <xsl:text> </xsl:text>
  </xsl:if>
  </xsl:template> -->

  <!-- <xsl:template match="m/*/text()">
  <xsl:if test="starts-with(.,' ')"><xsl:text> </xsl:text></xsl:if>
  <xsl:value-of select="normalize-space(.)"/>
  <xsl:if test="contains(concat(.,'^$%'),' ^$%') or
    ../following-sibling::node()[1][self::text() and starts-with(.,' ')]">
    <xsl:text> </xsl:text>
  </xsl:if>
  </xsl:template> -->

  <xsl:template match="m">
    <span class="messagename" >
      <xsl:attribute name="data-message"><xsl:value-of select="text()"/></xsl:attribute>
      <xsl:apply-templates />
      <!-- <xsl:value-of select="normalize-space(.)"/>
        We wanted to allow <i></i> inside of <m></m>,
        this required to apply templates. Question
        is, if not normalizing spaces causes issues
        in existing Max ref pages.-->
    </span>
  </xsl:template>

  <xsl:template match="ar">
    <span class="objectarg">
      <xsl:apply-templates />
    </span>
  </xsl:template>

  <xsl:template match="at">
    <span class="attrname">
      <xsl:attribute name="data-attribute"><xsl:value-of select="text()"/></xsl:attribute>
      <xsl:value-of select="normalize-space(.)"/>
    </span>
  </xsl:template>

  <!-- removing jargon, never used -->
  <xsl:template match="j">
      <xsl:value-of select="normalize-space(.)"/>
  </xsl:template>

  <xsl:template match="bi">
    <strong><em>
      <xsl:apply-templates/>
    </em></strong>
  </xsl:template>

  <xsl:template match="space">
    <xsl:text> </xsl:text>
  </xsl:template>

  <!-- we may not need this at all -->
  <xsl:template match="basestyle">
    <div class="basestyle">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="header">
    <h1>
      <xsl:apply-templates/>
    </h1>
  </xsl:template>

  <xsl:template match="header1">
    <h1>
      <xsl:apply-templates/>
    </h1>
  </xsl:template>

  <xsl:template match="header2">
    <h2>
      <xsl:apply-templates/>
    </h2>
  </xsl:template>

  <xsl:template match="header3">
    <h3>
      <xsl:apply-templates/>
    </h3>
  </xsl:template>

  <!-- having a template called body is not cool -->
  <xsl:template match="body">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="bodytext">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="sidebartext">
    <div class="sidebartext">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="bluebox">
    <div class="bluebox">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="subhead">
    <h2>
      <xsl:apply-templates/>
    </h2>
  </xsl:template>

  <xsl:template match="summary">
    <h2>
      <xsl:apply-templates/>
    </h2>
  </xsl:template>

  <xsl:template match="subsubhead">
    <h3>
      <xsl:apply-templates/>
    </h3>
  </xsl:template>

  <xsl:template match="illustration">
    <div class="imagebox">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="codeexample">
    <code>
      <xsl:apply-templates/>
    </code>
  </xsl:template>

  <xsl:template match="caption">
    <div class="caption">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="bullet">
    <div class="bodytext">
    &#8226; <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="span">
    <span>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </span>
  </xsl:template>

  <xsl:template match="tab">
    <span class="tabstop"></span>
  </xsl:template>

  <xsl:template match="hr">
    <hr></hr>
  </xsl:template>

  <xsl:template match="techdetail">
    <div class="techdetail">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- removing, not used anywhere -->
  <!-- <xsl:template match="detail">
    <div class="detail">
      <xsl:apply-templates/>
    </div>
  </xsl:template> -->

<!--
      See Also
      -->

  <xsl:template match="seealsolist">
    <section class="seealso_section">
      <h2 class="seealso_header">See Also</h2>
      <table>
        <thead>
          <tr>
            <th class="name">Name</th>
            <th class="description">Description</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="seealso">
            <tr class="seealso-item">
              <xsl:choose>
                <xsl:when test="@type='file'">
                  <td class="name">
                    <xsl:element name="span">
                      <xsl:attribute name="class">file-kind-icon</xsl:attribute>
                      <xsl:attribute name="type">
                        <xsl:choose>
                          <xsl:when test="@filekind"><xsl:value-of select="@filekind" /></xsl:when>
                          <xsl:otherwise>file</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                    </xsl:element>
                    <xsl:call-template name="handle_openfilelink">
                      <xsl:with-param name="filename" select="@name" />
                      <xsl:with-param name="linktext" select="@name" />
                    </xsl:call-template>
                  </td>
                  <td class="description">
                    <xsl:choose>
                      <xsl:when test="@description"><xsl:value-of select="@description" /></xsl:when>
                      <xsl:when test="@filekind"><xsl:value-of select="@filekind" /></xsl:when>
                      <xsl:otherwise>file</xsl:otherwise>
                    </xsl:choose>
                  </td>
                </xsl:when>
                <xsl:otherwise>
                  <td class="name">
                    <xsl:element name="span">
                      <xsl:attribute name="class">file-kind-icon</xsl:attribute>
                      <xsl:attribute name="type">
                        <xsl:choose>
                          <xsl:when test="@type='vignette'">vignette</xsl:when>
                          <xsl:when test="@type='topic'">topic</xsl:when>
                          <xsl:when test="@type='tutorial'">tutorial</xsl:when>
                          <xsl:when test="@type='refpage'">reference</xsl:when>
                          <xsl:when test="@type='genrefpage'">genreference</xsl:when>
                          <xsl:otherwise><xsl:value-of select="@type"/>reference</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                    </xsl:element>
                    <xsl:choose>
                      <xsl:when test="@display">
                        <xsl:call-template name="handle_link">
                          <xsl:with-param name="linkname" select="@name" />
                          <xsl:with-param name="linktype" select="@type" />
                          <xsl:with-param name="linkmodule" select="@module" />
                          <xsl:with-param name="linkanchor" select="@anchor" />
                          <xsl:with-param name="linkdisplay" select="@display" />
                        </xsl:call-template>
                      </xsl:when>
                      <xsl:otherwise>
                        <xsl:call-template name="handle_link">
                          <xsl:with-param name="linkname" select="@name" />
                          <xsl:with-param name="linktype" select="@type" />
                          <xsl:with-param name="linkmodule" select="@module" />
                          <xsl:with-param name="linkanchor" select="@anchor" />
                          <xsl:with-param name="linkdisplay" />
                          <!-- <xsl:with-param name="linkdisplay" select="@name" /> -->
                        </xsl:call-template>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="description">
                    <xsl:call-template name="seealsodescription">
                      <xsl:with-param name="linkname" select="@name" />
                      <xsl:with-param name="linktype" select="@type" />
                      <xsl:with-param name="linkmodule" select="@module" />
                    </xsl:call-template>
                  </td>
                </xsl:otherwise>
              </xsl:choose>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </section>
<!-- id="seealso_section" -->
  </xsl:template>

  <!-- no longer used, keeping in file as utility, but disabled
  <xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:choose>
      <xsl:when test="contains($text,$replace)">
        <xsl:value-of select="substring-before($text,$replace)"/>
        <xsl:value-of select="$with"/>
        <xsl:call-template name="replace-string">
          <xsl:with-param name="text" select="substring-after($text,$replace)"/>
          <xsl:with-param name="replace" select="$replace"/>
          <xsl:with-param name="with" select="$with"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  -->

  <!-- URL encoding hack, see https://skew.org/xml/stylesheets/url-encode/ -->
  <!-- I wish we had XSLT 2 -->
  <!-- Characters we'll support.
       We could add control chars 0-31 and 127-159, but we won't. -->
  <xsl:variable name="ascii"> !"#$%&amp;'()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~</xsl:variable>
  <xsl:variable name="latin1">&#160;&#161;&#162;&#163;&#164;&#165;&#166;&#167;&#168;&#169;&#170;&#171;&#172;&#173;&#174;&#175;&#176;&#177;&#178;&#179;&#180;&#181;&#182;&#183;&#184;&#185;&#186;&#187;&#188;&#189;&#190;&#191;&#192;&#193;&#194;&#195;&#196;&#197;&#198;&#199;&#200;&#201;&#202;&#203;&#204;&#205;&#206;&#207;&#208;&#209;&#210;&#211;&#212;&#213;&#214;&#215;&#216;&#217;&#218;&#219;&#220;&#221;&#222;&#223;&#224;&#225;&#226;&#227;&#228;&#229;&#230;&#231;&#232;&#233;&#234;&#235;&#236;&#237;&#238;&#239;&#240;&#241;&#242;&#243;&#244;&#245;&#246;&#247;&#248;&#249;&#250;&#251;&#252;&#253;&#254;&#255;</xsl:variable>

  <!-- Characters that usually don't need to be escaped -->
  <xsl:variable name="safe">!'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~</xsl:variable>

  <xsl:variable name="hex" >0123456789ABCDEF</xsl:variable>

  <xsl:template name="url-encode">
    <xsl:param name="str"/>
    <xsl:if test="$str">
      <xsl:variable name="first-char" select="substring($str,1,1)"/>
      <xsl:choose>
        <xsl:when test="contains($safe,$first-char)">
          <xsl:value-of select="$first-char"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:variable name="codepoint">
            <xsl:choose>
              <xsl:when test="contains($ascii,$first-char)">
                <xsl:value-of select="string-length(substring-before($ascii,$first-char)) + 32"/>
              </xsl:when>
              <xsl:when test="contains($latin1,$first-char)">
                <xsl:value-of select="string-length(substring-before($latin1,$first-char)) + 160"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:message terminate="no">Warning: string contains a character that is out of range! Substituting "?".</xsl:message>
                <xsl:text>63</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:variable>
        <xsl:variable name="hex-digit1" select="substring($hex,floor($codepoint div 16) + 1,1)"/>
        <xsl:variable name="hex-digit2" select="substring($hex,$codepoint mod 16 + 1,1)"/>
        <xsl:value-of select="concat('%',$hex-digit1,$hex-digit2)"/>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:if test="string-length($str) &gt; 1">
        <xsl:call-template name="url-encode">
          <xsl:with-param name="str" select="substring($str,2)"/>
        </xsl:call-template>
      </xsl:if>
    </xsl:if>
  </xsl:template>

  <xsl:template name="docurl">
    <xsl:param name="linkname"/>
    <xsl:param name="linktype"/>
    <xsl:param name="linkmodule"/>

    <xsl:variable name="escapedname">
      <xsl:call-template name="url-encode">
        <xsl:with-param name="str" select="$linkname"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="module">
      <xsl:value-of select="$linkmodule" /><xsl:text>/</xsl:text>
    </xsl:variable>
    <xsl:variable name="baseloc">
      <xsl:choose>
        <!-- TYPE_SPECIFIC -->
        <xsl:when test="$linktype='vignette'">../../vignettes/</xsl:when>
        <xsl:when test="$linkmodule!=''">../../tutorials/</xsl:when>
        <xsl:otherwise>./</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="suffix">
      <xsl:choose>
        <xsl:when test="$linktype='vignette'">.maxvig.xml</xsl:when>
        <!-- TYPE_SPECIFIC -->
        <xsl:otherwise>.maxtut.xml</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$linktype='tutorial'">
        <xsl:choose>
          <xsl:when test="document(concat($thisdir, $baseloc, $module, $escapedname, $suffix))/chapter/@name">
            <xsl:value-of select="concat($thisdir, $baseloc, $module, $escapedname, $suffix)"/>
          </xsl:when>
          <xsl:when test="document(concat($thisdir, $baseloc, concat($linkmodule, '-tut/'), $escapedname, $suffix))/chapter/@name">
            <xsl:value-of select="concat($thisdir, $baseloc, concat($linkmodule, '-tut/'), $escapedname, $suffix)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($thisdir, $escapedname, $suffix)" />
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
      <xsl:when test="$linktype='vignette'">
        <xsl:choose>
          <xsl:when test="document(concat($thisdir, $baseloc, $module, $escapedname, $suffix))/vignette/@name">
            <xsl:value-of select="concat($thisdir, $baseloc, $module, $escapedname, $suffix)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat($thisdir, $escapedname, $suffix)" />
          </xsl:otherwise>
        </xsl:choose>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="link">
    <xsl:call-template name="handle_link">
      <xsl:with-param name="linkname" select="@name" />
      <xsl:with-param name="linktype" select="@type" />
      <xsl:with-param name="linkmodule" select="@module" />
      <xsl:with-param name="linkanchor" select="@anchor" />
      <xsl:with-param name="linkdisplay" select="." />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="handle_link">
    <xsl:param name="linkname"/>
    <xsl:param name="linktype"/>
    <xsl:param name="linkmodule"/>
    <xsl:param name="linkanchor"/>
    <xsl:param name="linkdisplay"/>

    <xsl:variable name="usedlinktype">
      <xsl:choose>
        <xsl:when test="$linktype='topic'">vignette</xsl:when>
        <xsl:otherwise><xsl:value-of select="$linktype" /></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
    <!-- REFPAGE HANDLED SPECIALLY FOR EASE -->
    <xsl:when test="$usedlinktype='refpage' or $usedlinktype='genrefpage' or not(string($usedlinktype))">
      <xsl:call-template name="object_link">
        <xsl:with-param name="name" select="$linkname"/>
        <xsl:with-param name="dispname" select="$linkdisplay"/>
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:variable name="url">
        <xsl:call-template name="docurl">
          <xsl:with-param name="linkname" select="$linkname"/>
          <xsl:with-param name="linktype" select="$usedlinktype"/>
          <xsl:with-param name="linkmodule" select="$linkmodule"/>
        </xsl:call-template>
      </xsl:variable>
      <xsl:variable name="hash">
        <xsl:choose>
          <xsl:when test="$linkanchor!=''">#<xsl:value-of select="$linkanchor"/></xsl:when>
          <xsl:otherwise/>
        </xsl:choose>
      </xsl:variable>
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="concat($url, $hash)"/>
        </xsl:attribute>
        <!-- the document call uses the url relative to THIS document. seriously. -->
        <xsl:choose>
          <xsl:when test="string($linkdisplay)"><xsl:value-of select="normalize-space($linkdisplay)" /></xsl:when>
          <xsl:otherwise>
            <xsl:choose>
              <xsl:when test="$usedlinktype='vignette'">
                <xsl:if test="$readother = 1">
                  <xsl:value-of select="document($url)/vignette/@name"/>
                </xsl:if>
              </xsl:when>
              <xsl:otherwise>
                <xsl:if test="$readother = 1">
                <xsl:value-of select="document($url)/chapter/@name"/>
                </xsl:if>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </a>
    </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="seealsodescription">
    <xsl:param name="linkname"/>
    <xsl:param name="linktype"/>
    <xsl:param name="linkmodule"/>

    <xsl:variable name="usedlinktype">
      <xsl:choose>
        <xsl:when test="$linktype='topic'">vignette</xsl:when>
        <xsl:otherwise><xsl:value-of select="$linktype" /></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:choose>
    <!-- REFPAGE HANDLED SPECIALLY FOR EASE -->
    <xsl:when test="$usedlinktype='refpage' or $usedlinktype='genrefpage' or not(string($usedlinktype))">
      <xsl:variable name="url">
        <xsl:call-template name="refurl">
          <xsl:with-param name="name" select="$linkname"/>
          <xsl:with-param name="module" select="$linkmodule"/>
        </xsl:call-template>
      </xsl:variable>
      <xsl:if test="$readother = 1">
        <xsl:value-of select="document($url)/c74object/digest"/>
      </xsl:if>
    </xsl:when>
    <xsl:otherwise>
      <xsl:variable name="url">
        <xsl:call-template name="docurl">
          <xsl:with-param name="linkname" select="$linkname"/>
          <xsl:with-param name="linktype" select="$usedlinktype"/>
          <xsl:with-param name="linkmodule" select="$linkmodule"/>
        </xsl:call-template>
      </xsl:variable>
      <!-- the document call uses the url relative to THIS document. seriously. -->
      <xsl:choose>
        <xsl:when test="$usedlinktype='vignette'">
          <xsl:if test="$readother = 1">
            <xsl:value-of select="document($url)/vignette/@name"/>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise>
          <!-- <xsl:value-of select="$url"/> -->
          <xsl:if test="$readother = 1">
            <xsl:value-of select="document($url)/chapter/@name"/>
          </xsl:if>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="p">
    <p><xsl:apply-templates/></p>
  </xsl:template>

  <xsl:template match="h1">
    <h1>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h1>
  </xsl:template>

  <xsl:template match="h2">
    <h2>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h2>
  </xsl:template>

  <xsl:template match="h3">
    <h3>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h3>
  </xsl:template>

  <xsl:template match="h4">
    <h4>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h4>
  </xsl:template>

  <xsl:template match="h5">
    <h5>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h5>
  </xsl:template>

  <xsl:template match="h6">
    <h6>
      <xsl:if test="@name">
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </h6>
  </xsl:template>

  <xsl:template match="b">
    <strong>
      <xsl:apply-templates/>
    </strong>
  </xsl:template>

  <xsl:template match="i">
    <em>
      <xsl:apply-templates/>
    </em>
  </xsl:template>

  <xsl:template match="ul">
    <ul>
      <xsl:apply-templates/>
    </ul>
  </xsl:template>

  <xsl:template match="ol">
    <ol>
      <xsl:apply-templates/>
    </ol>
  </xsl:template>

  <xsl:template match="li">
    <li>
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="pre">
    <div style="white-space:pre;">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="code">
    <xsl:variable name="lang">
      <xsl:choose>
        <xsl:when test="@language"><xsl:value-of select="@language" /></xsl:when>
        <xsl:otherwise>clike</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:element name="pre">
      <xsl:attribute name="class">language-<xsl:value-of select="$lang" /></xsl:attribute>
      <code>
        <xsl:apply-templates />
      </code>
    </xsl:element>
  </xsl:template>

  <xsl:template match="table">
    <table>
      <xsl:if test="@class">
        <xsl:attribute name="class">
          <xsl:value-of select="@class" />
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </table>
  </xsl:template>

  <xsl:template match="tr">
    <tr>
      <xsl:apply-templates/>
    </tr>
  </xsl:template>

 <xsl:template match="th">
    <th>
      <xsl:apply-templates/>
    </th>
  </xsl:template>

  <xsl:template match="td">
    <xsl:element name="td">
      <xsl:attribute name="width"><xsl:value-of select="@width"/></xsl:attribute>
      <xsl:attribute name="class"><xsl:value-of select="@class"/></xsl:attribute>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="sup">
    <sup>
      <xsl:apply-templates/>
    </sup>
  </xsl:template>

  <xsl:template match="sub">
    <sub>
      <xsl:apply-templates/>
    </sub>
  </xsl:template>

  <xsl:template name="handle_openfilelink">
    <xsl:param name="filename" />
    <xsl:param name="linktext" />
    <a>
      <xsl:attribute name="href">openfilelink</xsl:attribute>
      <xsl:attribute name="filename"><xsl:value-of select="$filename"/></xsl:attribute>
      <xsl:value-of select="$linktext" />
    </a>
  </xsl:template>

  <xsl:template match="openfilelink">
    <xsl:call-template name="handle_openfilelink">
      <xsl:with-param name="filename" select="@filename"/>
      <xsl:with-param name="linktext" select="."/>
    </xsl:call-template>
  </xsl:template>

  <!-- make this invisible -->
  <xsl:template match="indexinfo" />
  <xsl:template match="metadatalist"/>


</xsl:stylesheet>
