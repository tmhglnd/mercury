{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 1,
			"revision" : 3,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 202.0, 229.0, 328.0, 433.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 0,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 1065.0, 642.541870000000017, 29.5, 22.0 ],
					"text" : "t l l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 950.5, 736.270935000000009, 75.0, 35.0 ],
					"presentation_linecount" : 2,
					"text" : "prepend outlinecolor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1035.0, 749.270935000000009, 129.0, 22.0 ],
					"text" : "prepend number_color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-59",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1065.0, 666.541870000000017, 119.999999999999773, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 291.270935000000009, 148.0, 20.0 ],
					"text" : "Line numbers color",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"blinkcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-73",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 1.0, 1.0, 1.0, 0.646376533742331 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1035.0, 665.270935000000009, 22.541870000000017, 22.541870000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 290.0, 22.541870000000017, 22.541870000000017 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "bang" ],
					"patching_rect" : [ 1035.0, 706.270935000000009, 158.0, 22.0 ],
					"text" : "colorpicker @compatibility 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 225.0, 640.0, 29.5, 22.0 ],
					"text" : "t l l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 855.0, 642.541870000000017, 29.5, 22.0 ],
					"text" : "t l l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 634.541870000000017, 640.0, 29.5, 22.0 ],
					"text" : "t l l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 430.25, 640.0, 29.5, 22.0 ],
					"text" : "t l l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-132",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 726.0, 440.5, 75.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 369.0, 148.0, 20.0 ],
					"text" : "Blink time",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-131",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 675.0, 268.0, 93.0, 22.0 ],
					"text" : "route blink_time"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-125",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 693.0, 227.0, 107.0, 22.0 ],
					"text" : "route blink_enable"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-123",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 675.0, 467.0, 110.0, 22.0 ],
					"text" : "prepend blink_time"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-122",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 675.0, 439.270935000000009, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 368.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-120",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 740.5, 736.270935000000009, 75.0, 35.0 ],
					"text" : "prepend outlinecolor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-119",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 527.0, 736.270935000000009, 75.0, 35.0 ],
					"text" : "prepend outlinecolor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-118",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 304.499999999999886, 735.0, 75.0, 35.0 ],
					"text" : "prepend outlinecolor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-117",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 105.0, 736.270935000000009, 75.0, 35.0 ],
					"text" : "prepend outlinecolor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-115",
					"linecolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 0.5 ],
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 375.0, 66.0, 10.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-112",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 930.0, 315.0, 90.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 393.0, 148.0, 20.0 ],
					"text" : "Cursor characters",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-111",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 726.0, 315.0, 75.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 345.0, 148.0, 20.0 ],
					"text" : "Enable cursor blink",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-110",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 913.0, 510.0, 48.0, 22.0 ],
					"text" : "s editor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-109",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 824.0, 510.0, 73.0, 22.0 ],
					"text" : "s storePrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-108",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "" ],
					"patching_rect" : [ 825.0, 283.0, 29.5, 22.0 ],
					"text" : "t b l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-107",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 824.0, 467.0, 19.0, 22.0 ],
					"text" : "t l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-99",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 825.0, 255.0, 72.0, 22.0 ],
					"text" : "prepend set"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-90",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 825.0, 227.0, 73.0, 22.0 ],
					"text" : "route cursor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-89",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 825.0, 167.0, 68.0, 22.0 ],
					"text" : "r fromPrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 825.0, 378.0, 59.0, 22.0 ],
					"text" : "route text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-87",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 825.0, 417.5, 89.0, 22.0 ],
					"text" : "prepend cursor"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"bordercolor" : [ 0.498039215686275, 0.498039215686275, 0.498039215686275, 0.25 ],
					"id" : "obj-86",
					"keymode" : 1,
					"lines" : 1,
					"maxclass" : "textedit",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "int", "", "" ],
					"outputmode" : 1,
					"parameter_enable" : 0,
					"patching_rect" : [ 825.0, 315.0, 100.0, 50.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 392.0, 145.0, 22.0 ],
					"text" : "<==",
					"textcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-85",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 693.0, 356.5, 123.0, 22.0 ],
					"text" : "prepend blink_enable"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"id" : "obj-84",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.25 ],
					"oncolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 693.0, 315.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 343.999999999999943, 22.0, 22.0 ],
					"thickness" : 70.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 477.999999999999773, 315.0, 73.0, 22.0 ],
					"text" : "s storePrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 559.0, 315.0, 48.0, 22.0 ],
					"text" : "s editor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 6,
					"outlettype" : [ "", "", "", "", "", "" ],
					"patching_rect" : [ 372.000000000000227, 579.0, 325.0, 22.0 ],
					"text" : "route color cursor_color blink_color run_color number_color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.000000000000227, 549.0, 68.0, 22.0 ],
					"text" : "r fromPrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-61",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 510.0, 384.0, 51.0, 22.0 ],
					"text" : "unjoin 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 195.0, 356.5, 211.0, 22.0 ],
					"text" : "route tracking leadscale scale position"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 330.0, 68.0, 22.0 ],
					"text" : "r fromPrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 195.0, 827.5, 73.0, 22.0 ],
					"text" : "s storePrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 285.0, 827.5, 48.0, 22.0 ],
					"text" : "s editor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 795.0, 19.0, 22.0 ],
					"text" : "t l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 195.0, 579.0, 73.0, 22.0 ],
					"text" : "s storePrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 285.0, 579.0, 48.0, 22.0 ],
					"text" : "s editor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 534.0, 19.0, 22.0 ],
					"text" : "t l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 510.0, 451.0, 41.0, 22.0 ],
					"text" : "pak f f"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 510.0, 482.270935000000009, 97.0, 22.0 ],
					"text" : "prepend position"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 420.0, 482.270935000000009, 84.0, 22.0 ],
					"text" : "prepend scale"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 311.0, 441.5, 61.999999999999773, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 75.0, 148.0, 20.0 ],
					"text" : "Line spacing",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 300.0, 482.270935000000009, 107.0, 22.0 ],
					"text" : "prepend leadscale"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-35",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 300.0, 417.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 75.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 482.270935000000009, 98.0, 22.0 ],
					"text" : "prepend tracking"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 392.000000000000227, 749.270935000000009, 122.0, 22.0 ],
					"text" : "prepend cursor_color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 748.0, 82.0, 22.0 ],
					"text" : "prepend color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 610.0, 749.270935000000009, 113.0, 22.0 ],
					"text" : "prepend blink_color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 825.0, 749.270935000000009, 106.0, 22.0 ],
					"text" : "prepend run_color"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 855.0, 666.541870000000017, 119.999999999999773, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 266.89654500000006, 148.0, 20.0 ],
					"text" : "Execute color",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"blinkcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-24",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 0.200000003, 0.200000003, 0.200000003, 1.0 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 825.0, 665.270935000000009, 22.541870000000017, 22.541870000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 265.625610000000052, 22.541870000000017, 22.541870000000017 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "bang" ],
					"patching_rect" : [ 825.0, 706.270935000000009, 158.0, 22.0 ],
					"text" : "colorpicker @compatibility 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 640.0, 667.270935000000009, 119.999999999999773, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 242.354675000000043, 148.0, 20.0 ],
					"text" : "Blink color",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"blinkcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-21",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 0.400000006, 0.400000006, 1.0, 1.0 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 610.0, 666.0, 22.541870000000017, 22.541870000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 241.083740000000034, 22.541870000000017, 22.541870000000017 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "bang" ],
					"patching_rect" : [ 610.0, 706.270935000000009, 158.0, 22.0 ],
					"text" : "colorpicker @compatibility 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 225.0, 670.812805000000026, 119.999999999999773, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 193.270935000000009, 148.0, 20.0 ],
					"text" : "Text color",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"blinkcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-18",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 195.0, 669.541870000000017, 22.541870000000017, 22.541870000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 192.0, 22.541870000000017, 22.541870000000017 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "bang" ],
					"patching_rect" : [ 195.0, 706.270935000000009, 158.0, 22.0 ],
					"text" : "colorpicker @compatibility 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 427.499999999999886, 669.541870000000017, 119.999999999999773, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 217.812805000000026, 148.0, 20.0 ],
					"text" : "Cursor color",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"blinkcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-15",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 0.0, 1.0, 0.501960814, 1.0 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 392.000000000000227, 669.541870000000017, 22.541870000000017, 22.541870000000017 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 216.541870000000017, 22.541870000000017, 22.541870000000017 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "bang" ],
					"patching_rect" : [ 392.000000000000227, 706.270935000000009, 158.0, 22.0 ],
					"text" : "colorpicker @compatibility 0"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-8",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 571.0, 417.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 217.0, 147.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 571.0, 440.5, 68.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 147.0, 148.0, 20.0 ],
					"text" : "Position X/Y",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-7",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 510.0, 417.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 147.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 439.000000000000114, 440.5, 55.999999999999886, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 123.0, 148.0, 20.0 ],
					"text" : "Relative size",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-5",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 420.0, 417.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 123.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 210.0, 440.5, 75.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 99.0, 148.0, 20.0 ],
					"text" : "Character spacing",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"format" : 6,
					"htricolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"id" : "obj-3",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 195.0, 416.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 99.0, 50.0, 22.0 ],
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 1.0 ],
					"triangle" : 0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-100",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 900.0, 81.5, 22.0, 22.0 ],
					"text" : "t b"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-98",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 900.0, 122.5, 82.0, 22.0 ],
					"text" : "s defaultPrefs"
				}

			}
, 			{
				"box" : 				{
					"button" : 1,
					"htabcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 0.5 ],
					"id" : "obj-96",
					"maxclass" : "tab",
					"multiline" : 0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 900.0, 45.0, 135.0, 22.0 ],
					"tabcolor" : [ 0.200000003, 0.200000003, 0.200000003, 0.498130751533742 ],
					"tabs" : [ "Reset Default" ],
					"textcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-95",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 465.400024999999687, 136.0, 94.0, 22.0 ],
					"text" : "prepend symbol"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 418.400024999999687, 103.0, 94.0, 22.0 ],
					"text" : "prepend symbol"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-93",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 418.400024999999687, 73.5, 160.0, 22.0 ],
					"text" : "route def_font font leadscale"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 418.400024999999687, 45.0, 68.0, 22.0 ],
					"text" : "r fromPrefs"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-66",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 267.999999999999773, 272.0, 99.0, 22.0 ],
					"text" : "prepend def_font"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 477.999999999999773, 227.0, 76.0, 22.0 ],
					"text" : "prepend font"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 477.999999999999773, 272.0, 19.0, 22.0 ],
					"text" : "t l"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 72.541870000000003, 96.0, 70.0, 22.0 ],
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 235.5, 227.0, 110.0, 22.0 ],
					"text" : "prepend setsymbol"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 195.0, 73.5, 54.0, 22.0 ],
					"text" : "deferlow"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 195.0, 103.5, 22.0, 22.0 ],
					"text" : "t 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 195.0, 45.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-60",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 351.500000000000227, 194.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 39.0, 148.0, 20.0 ],
					"text" : "Font Library",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"bgfillcolor_color1" : [ 0.301961, 0.301961, 0.301961, 1.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "color",
					"id" : "obj-57",
					"items" : [ "3Dventure Medium", ",", "Abadi MT Condensed Extra Bold", ",", "Abadi MT Condensed Light", ",", "Ableton Sans Bold", ",", "Ableton Sans Light", ",", "Ableton Sans Medium", ",", "AC Mountain Inverted", ",", "AC Mountain", ",", "Academy Engraved LET Plain", ",", "Adobe Arabic", ",", "Adobe Arabic Italic", ",", "Adobe Arabic Bold", ",", "Adobe Arabic Bold Italic", ",", "Adobe Caslon Pro", ",", "Adobe Caslon Pro Italic", ",", "Adobe Caslon Pro Semibold", ",", "Adobe Caslon Pro Semibold Italic", ",", "Adobe Caslon Pro Bold", ",", "Adobe Caslon Pro Bold Italic", ",", "Adobe Devanagari", ",", "Adobe Devanagari Italic", ",", "Adobe Devanagari Bold", ",", "Adobe Devanagari Bold Italic", ",", "Adobe Fan Heiti Std B", ",", "Adobe Fangsong Std R", ",", "Adobe Garamond Pro", ",", "Adobe Garamond Pro Italic", ",", "Adobe Garamond Pro Bold", ",", "Adobe Garamond Pro Bold Italic", ",", "Adobe Gothic Std B", ",", "Adobe Hebrew", ",", "Adobe Hebrew Italic", ",", "Adobe Hebrew Bold", ",", "Adobe Hebrew Bold Italic", ",", "Adobe Heiti Std R", ",", "Adobe Kaiti Std R", ",", "Adobe Ming Std L", ",", "Adobe Myungjo Std M", ",", "Adobe Naskh Medium", ",", "Adobe Song Std L", ",", "Aggressive Angry Baby Killer", ",", "Al Bayan Plain", ",", "Al Bayan Bold", ",", "Al Nile", ",", "Al Nile Bold", ",", "Al Tarikh", ",", "Alphabet SNK by PMPEPS", ",", "American Typewriter", ",", "American Typewriter Light", ",", "American Typewriter Semibold", ",", "American Typewriter Bold", ",", "American Typewriter Condensed", ",", "American Typewriter Condensed Light", ",", "American Typewriter Condensed Bold", ",", "Amiri", ",", "Amiri Italic", ",", "Amiri Bold", ",", "Amiri Bold Italic", ",", "Andale Mono", ",", "Anime Ace 2.0 BB", ",", "Apple Braille Outline 6 Dot", ",", "Apple Braille Outline 8 Dot", ",", "Apple Braille Pinpoint 6 Dot", ",", "Apple Braille Pinpoint 8 Dot", ",", "Apple Braille", ",", "Apple Chancery Chancery", ",", "Apple Color Emoji", ",", "Apple SD Gothic Neo", ",", "Apple SD Gothic Neo Thin", ",", "Apple SD Gothic Neo UltraLight", ",", "Apple SD Gothic Neo UltraLight", ",", "Apple SD Gothic Neo Light", ",", "Apple SD Gothic Neo Light", ",", "Apple SD Gothic Neo Medium", ",", "Apple SD Gothic Neo Medium", ",", "Apple SD Gothic Neo SemiBold", ",", "Apple SD Gothic Neo SemiBold", ",", "Apple SD Gothic Neo Bold", ",", "Apple SD Gothic Neo ExtraBold", ",", "Apple SD Gothic Neo ExtraBold", ",", "Apple SD Gothic Neo Heavy", ",", "Apple SD Gothic Neo Heavy", ",", "Apple SD Gothic Neo Thin", ",", "Apple Symbols", ",", "AppleGothic", ",", "AppleMyungjo", ",", "Arial", ",", "Arial Italic", ",", "Arial Bold", ",", "Arial Bold Italic", ",", "Arial Black", ",", "Arial Hebrew", ",", "Arial Hebrew Light", ",", "Arial Hebrew Bold", ",", "Arial Hebrew Scholar", ",", "Arial Hebrew Scholar Light", ",", "Arial Hebrew Scholar Bold", ",", "Arial Narrow", ",", "Arial Narrow Italic", ",", "Arial Narrow Bold", ",", "Arial Narrow Bold Italic", ",", "Arial Rounded MT Bold", ",", "Arial Unicode MS", ",", "Arno Pro Caption", ",", "Arno Pro Display", ",", "Arno Pro", ",", "Arno Pro SmText", ",", "Arno Pro Subhead", ",", "Arno Pro Italic", ",", "Arno Pro Italic Caption", ",", "Arno Pro Italic Display", ",", "Arno Pro Italic SmText", ",", "Arno Pro Italic Subhead", ",", "Arno Pro Light Display", ",", "Arno Pro Light Italic Display", ",", "Arno Pro Semibold", ",", "Arno Pro Semibold Caption", ",", "Arno Pro Semibold Display", ",", "Arno Pro Semibold SmText", ",", "Arno Pro Semibold Subhead", ",", "Arno Pro Semibold Italic", ",", "Arno Pro Semibold Italic Caption", ",", "Arno Pro Semibold Italic Display", ",", "Arno Pro Semibold Italic SmText", ",", "Arno Pro Semibold Italic Subhead", ",", "Arno Pro Bold", ",", "Arno Pro Bold Caption", ",", "Arno Pro Bold Display", ",", "Arno Pro Bold SmText", ",", "Arno Pro Bold Subhead", ",", "Arno Pro Bold Italic", ",", "Arno Pro Bold Italic Caption", ",", "Arno Pro Bold Italic Display", ",", "Arno Pro Bold Italic SmText", ",", "Arno Pro Bold Italic Subhead", ",", "Athelas", ",", "Athelas Italic", ",", "Athelas Bold", ",", "Athelas Bold Italic", ",", "Avenir Book", ",", "Avenir Roman", ",", "Avenir Book Oblique", ",", "Avenir Oblique", ",", "Avenir Light", ",", "Avenir Light Oblique", ",", "Avenir Medium", ",", "Avenir Medium Oblique", ",", "Avenir Heavy", ",", "Avenir Heavy Oblique", ",", "Avenir Black", ",", "Avenir Black Oblique", ",", "Avenir Next", ",", "Avenir Next Italic", ",", "Avenir Next Ultra Light", ",", "Avenir Next Ultra Light Italic", ",", "Avenir Next Medium", ",", "Avenir Next Medium Italic", ",", "Avenir Next Demi Bold", ",", "Avenir Next Demi Bold Italic", ",", "Avenir Next Bold", ",", "Avenir Next Bold Italic", ",", "Avenir Next Heavy", ",", "Avenir Next Heavy Italic", ",", "Avenir Next Condensed", ",", "Avenir Next Condensed Italic", ",", "Avenir Next Condensed Ultra Light", ",", "Avenir Next Condensed Ultra Light Italic", ",", "Avenir Next Condensed Medium", ",", "Avenir Next Condensed Medium Italic", ",", "Avenir Next Condensed Demi Bold", ",", "Avenir Next Condensed Demi Bold Italic", ",", "Avenir Next Condensed Bold", ",", "Avenir Next Condensed Bold Italic", ",", "Avenir Next Condensed Heavy", ",", "Avenir Next Condensed Heavy Italic", ",", "AvenirCondensedHand CondensedHand", ",", "Ayuthaya", ",", "Baghdad", ",", "Bangla MN", ",", "Bangla MN Bold", ",", "Bangla Sangam MN", ",", "Bangla Sangam MN Bold", ",", "Bank Gothic Light", ",", "Bank Gothic Medium", ",", "Barlow", ",", "Barlow Italic", ",", "Barlow ExtraLight", ",", "Barlow ExtraLight Italic", ",", "Barlow Light", ",", "Barlow Light Italic", ",", "Barlow Medium", ",", "Barlow Medium Italic", ",", "Barlow SemiBold", ",", "Barlow SemiBold Italic", ",", "Barlow Bold", ",", "Barlow Bold Italic", ",", "Barlow ExtraBold", ",", "Barlow ExtraBold Italic", ",", "Barlow Black", ",", "Barlow Black Italic", ",", "Barlow Thin", ",", "Barlow Thin Italic", ",", "Basica v.2012", ",", "Baskerville", ",", "Baskerville Italic", ",", "Baskerville SemiBold", ",", "Baskerville SemiBold Italic", ",", "Baskerville Bold", ",", "Baskerville Bold Italic", ",", "Baskerville Old Face", ",", "Batang", ",", "Bauhaus 93", ",", "Beirut", ",", "Bell Gothic Std Bold", ",", "Bell Gothic Std Black", ",", "Bell MT", ",", "Bell MT Italic", ",", "Bell MT Bold", ",", "Bernard MT Condensed", ",", "Bickham Script Pro", ",", "Bickham Script Pro Semibold", ",", "Bickham Script Pro Bold", ",", "Big Caslon Medium", ",", "Birch Std", ",", "Birmingham", ",", "BirminghamBold", ",", "BIRTH OF A HERO", ",", "Blackmoor LET Plain", ",", "Blackoak Std", ",", "BlairMdITC TT Medium", ",", "Blake", ",", "Bodoni 72 Book", ",", "Bodoni 72 Book Italic", ",", "Bodoni 72 Bold", ",", "Bodoni 72 Oldstyle Book", ",", "Bodoni 72 Oldstyle Book Italic", ",", "Bodoni 72 Oldstyle Bold", ",", "Bodoni 72 Smallcaps Book", ",", "Bodoni Ornaments", ",", "Book Antiqua", ",", "Book Antiqua Italic", ",", "Book Antiqua Bold", ",", "Book Antiqua Bold Italic", ",", "Bookman Old Style", ",", "Bookman Old Style Italic", ",", "Bookman Old Style Bold", ",", "Bookman Old Style Bold Italic", ",", "Bookshelf Symbol 7", ",", "Bordeaux Roman Bold LET Plain", ",", "Bradley Hand Bold", ",", "Braggadocio", ",", "Braille", ",", "Britannic Bold", ",", "Brush Script MT Italic", ",", "Brush Script Std Medium", ",", "Calibri", ",", "Calibri Italic", ",", "Calibri Bold", ",", "Calibri Bold Italic", ",", "Calisto MT", ",", "Calisto MT Italic", ",", "Calisto MT Bold", ",", "Calisto MT Bold Italic", ",", "Cambria", ",", "Cambria Italic", ",", "Cambria Bold", ",", "Cambria Bold Italic", ",", "Cambria Math", ",", "Candara", ",", "Candara Italic", ",", "Candara Bold", ",", "Candara Bold Italic", ",", "CANDY INC. TRIAL", ",", "Capitals", ",", "Cardenio Modern", ",", "Cardenio Modern Bold", ",", "Casual", ",", "Century", ",", "Century Gothic", ",", "Century Gothic Italic", ",", "Century Gothic Bold", ",", "Century Gothic Bold Italic", ",", "Century Schoolbook", ",", "Century Schoolbook Italic", ",", "Century Schoolbook Bold", ",", "Century Schoolbook Bold Italic", ",", "Chalkboard", ",", "Chalkboard Bold", ",", "Chalkboard SE", ",", "Chalkboard SE Light", ",", "Chalkboard SE Bold", ",", "Chalkduster", ",", "Chaparral Pro", ",", "Chaparral Pro Italic", ",", "Chaparral Pro Light Italic", ",", "Chaparral Pro Bold", ",", "Chaparral Pro Bold Italic", ",", "Charlemagne Std Bold", ",", "Charter Roman", ",", "Charter Italic", ",", "Charter Bold", ",", "Charter Bold Italic", ",", "Charter Black", ",", "Charter Black Italic", ",", "Clarks Summit", ",", "Cochin", ",", "Cochin Italic", ",", "Cochin Bold", ",", "Cochin Bold Italic", ",", "Code Bold", ",", "Code Light", ",", "Colonna MT", ",", "Comic Sans MS", ",", "Comic Sans MS Bold", ",", "Consolas", ",", "Consolas Italic", ",", "Consolas Bold", ",", "Consolas Bold Italic", ",", "Constantia", ",", "Constantia Italic", ",", "Constantia Bold", ",", "Constantia Bold Italic", ",", "Cooper Black", ",", "Cooper Std Black", ",", "Cooper Std Black Italic", ",", "Copperplate", ",", "Copperplate Light", ",", "Copperplate Bold", ",", "Copperplate Gothic Bold", ",", "Copperplate Gothic Light", ",", "Corbel", ",", "Corbel Italic", ",", "Corbel Bold", ",", "Corbel Bold Italic", ",", "Corsiva Hebrew", ",", "Corsiva Hebrew Bold", ",", "Courier", ",", "Courier Oblique", ",", "Courier Bold", ",", "Courier Bold Oblique", ",", "Courier New", ",", "Courier New Italic", ",", "Courier New Bold", ",", "Courier New Bold Italic", ",", "Cracked", ",", "Cubic", ",", "Curlz MT", ",", "Damascus", ",", "Damascus Light", ",", "Damascus Medium", ",", "Damascus Semi Bold", ",", "Damascus Bold", ",", "DecoType Naskh", ",", "Desdemona", ",", "Devanagari MT", ",", "Devanagari MT Bold", ",", "Devanagari Sangam MN", ",", "Devanagari Sangam MN Bold", ",", "Didot", ",", "Didot Italic", ",", "Didot Bold", ",", "Dimitri", ",", "Dimitri Swank", ",", "DIN Alternate Bold", ",", "DIN Condensed Bold", ",", "Diwan Kufi", ",", "Diwan Thuluth", ",", "Eccentric Std", ",", "Edwardian Script ITC", ",", "Engravers MT", ",", "Engravers MT Bold", ",", "Euphemia UCAS", ",", "Euphemia UCAS Italic", ",", "Euphemia UCAS Bold", ",", "Eurostile", ",", "Eurostile Bold", ",", "Farah", ",", "Farisi", ",", "Footlight MT Light", ",", "Franklin Gothic Book", ",", "Franklin Gothic Book Italic", ",", "Franklin Gothic Medium", ",", "Franklin Gothic Medium Italic", ",", "Futura Medium", ",", "Futura Medium Italic", ",", "Futura Bold", ",", "Futura Condensed Medium", ",", "Futura Condensed ExtraBold", ",", "Gabriola", ",", "Garamond", ",", "Garamond Italic", ",", "Garamond Bold", ",", "Garamond Premier Pro", ",", "Garamond Premier Pro Italic", ",", "Garamond Premier Pro Semibold", ",", "Garamond Premier Pro Semibold Italic", ",", "GB18030 Bitmap", ",", "Geeza Pro", ",", "Geeza Pro Bold", ",", "GelPenUpright Medium", ",", "GelPenUprightHeavy Heavy", ",", "GelPenUprightLight Light", ",", "Geneva", ",", "Georgia", ",", "Georgia Italic", ",", "Georgia Bold", ",", "Georgia Bold Italic", ",", "Giddyup Std", ",", "Gill Sans", ",", "Gill Sans Italic", ",", "Gill Sans Light", ",", "Gill Sans Light Italic", ",", "Gill Sans SemiBold", ",", "Gill Sans SemiBold Italic", ",", "Gill Sans Bold", ",", "Gill Sans Bold Italic", ",", "Gill Sans UltraBold", ",", "Gill Sans MT", ",", "Gill Sans MT Italic", ",", "Gill Sans MT Bold", ",", "Gill Sans MT Bold Italic", ",", "Gloucester MT Extra Condensed", ",", "Goudy Old Style Italic", ",", "Goudy Old Style", ",", "Goudy Old Style Bold", ",", "green piloww", ",", "Guitar Pro 5", ",", "Gujarati MT", ",", "Gujarati MT Bold", ",", "Gujarati Sangam MN", ",", "Gujarati Sangam MN Bold", ",", "Gulim", ",", "Gurmukhi MN", ",", "Gurmukhi MN Bold", ",", "Gurmukhi MT", ",", "Gurmukhi Sangam MN", ",", "Gurmukhi Sangam MN Bold", ",", "HACKED", ",", "Haettenschweiler", ",", "Halo", ",", "Halo Outline", ",", "Handwriting - Dakota", ",", "Harrington", ",", "Heiti SC Light", ",", "Heiti SC Medium", ",", "Heiti TC Light", ",", "Heiti TC Medium", ",", "Helsinki Metronome Std", ",", "Helsinki Special Std", ",", "Helsinki Std", ",", "Helsinki Text Std", ",", "Helvetica", ",", "Helvetica Oblique", ",", "Helvetica Light", ",", "Helvetica Light Oblique", ",", "Helvetica Bold", ",", "Helvetica Bold Oblique", ",", "Helvetica Neue", ",", "Helvetica Neue Italic", ",", "Helvetica Neue UltraLight", ",", "Helvetica Neue UltraLight Italic", ",", "Helvetica Neue Thin", ",", "Helvetica Neue Thin Italic", ",", "Helvetica Neue Light", ",", "Helvetica Neue Light Italic", ",", "Helvetica Neue Medium", ",", "Helvetica Neue Medium Italic", ",", "Helvetica Neue Bold", ",", "Helvetica Neue Bold Italic", ",", "Helvetica Neue Condensed Bold", ",", "Helvetica Neue Condensed Black", ",", "Herculanum", ",", "Hind Guntur", ",", "Hind Guntur Light", ",", "Hind Guntur Medium", ",", "Hind Guntur SemiBold", ",", "Hind Guntur Bold", ",", "Hiragino Kaku Gothic Pro W3", ",", "Hiragino Kaku Gothic Pro W3", ",", "Hiragino Kaku Gothic Pro W6", ",", "Hiragino Kaku Gothic Pro W6", ",", "Hiragino Kaku Gothic ProN W3", ",", "Hiragino Kaku Gothic ProN W6", ",", "Hiragino Kaku Gothic Std W8", ",", "Hiragino Kaku Gothic Std W8", ",", "Hiragino Kaku Gothic StdN W8", ",", "Hiragino Kaku Gothic StdN W8", ",", "Hiragino Maru Gothic Pro W4", ",", "Hiragino Maru Gothic ProN W4", ",", "Hiragino Mincho Pro W3", ",", "Hiragino Mincho Pro W3", ",", "Hiragino Mincho Pro W6", ",", "Hiragino Mincho Pro W6", ",", "Hiragino Mincho ProN W3", ",", "Hiragino Mincho ProN W6", ",", "Hiragino Sans W0", ",", "Hiragino Sans W1", ",", "Hiragino Sans W2", ",", "Hiragino Sans W3", ",", "Hiragino Sans W4", ",", "Hiragino Sans W5", ",", "Hiragino Sans W6", ",", "Hiragino Sans W7", ",", "Hiragino Sans W8", ",", "Hiragino Sans W9", ",", "Hiragino Sans GB W3", ",", "Hiragino Sans GB W3", ",", "Hiragino Sans GB W6", ",", "Hiragino Sans GB W6", ",", "Hobo Std Medium", ",", "Hoefler Text", ",", "Hoefler Text Ornaments", ",", "Hoefler Text Italic", ",", "Hoefler Text Black", ",", "Hoefler Text Black Italic", ",", "IBM Plex Mono", ",", "IBM Plex Mono Italic", ",", "IBM Plex Mono ExtraLight", ",", "IBM Plex Mono ExtraLight Italic", ",", "IBM Plex Mono Light", ",", "IBM Plex Mono Light Italic", ",", "IBM Plex Mono Medium", ",", "IBM Plex Mono Text", ",", "IBM Plex Mono Medium Italic", ",", "IBM Plex Mono Text Italic", ",", "IBM Plex Mono SemiBold", ",", "IBM Plex Mono SemiBold Italic", ",", "IBM Plex Mono Bold", ",", "IBM Plex Mono Bold Italic", ",", "IBM Plex Mono Thin", ",", "IBM Plex Mono Thin Italic", ",", "IBM Plex Sans", ",", "IBM Plex Sans Italic", ",", "IBM Plex Sans ExtraLight", ",", "IBM Plex Sans ExtraLight Italic", ",", "IBM Plex Sans Light", ",", "IBM Plex Sans Light Italic", ",", "IBM Plex Sans Medium", ",", "IBM Plex Sans Text", ",", "IBM Plex Sans Medium Italic", ",", "IBM Plex Sans Text Italic", ",", "IBM Plex Sans SemiBold", ",", "IBM Plex Sans SemiBold Italic", ",", "IBM Plex Sans Bold", ",", "IBM Plex Sans Bold Italic", ",", "IBM Plex Sans Thin", ",", "IBM Plex Sans Thin Italic", ",", "IBM Plex Serif", ",", "IBM Plex Serif Italic", ",", "IBM Plex Serif ExtraLight", ",", "IBM Plex Serif ExtraLight Italic", ",", "IBM Plex Serif Light", ",", "IBM Plex Serif Light Italic", ",", "IBM Plex Serif Medium", ",", "IBM Plex Serif Text", ",", "IBM Plex Serif Medium Italic", ",", "IBM Plex Serif Text Italic", ",", "IBM Plex Serif SemiBold", ",", "IBM Plex Serif SemiBold Italic", ",", "IBM Plex Serif Bold", ",", "IBM Plex Serif Bold Italic", ",", "IBM Plex Serif Thin", ",", "IBM Plex Serif Thin Italic", ",", "Impact", ",", "Imprint MT Shadow", ",", "InaiMathi", ",", "Inconsolata", ",", "Inconsolata Bold", ",", "Inkpen2 Chords Std", ",", "Inkpen2 Metronome Std", ",", "Inkpen2 Script Std", ",", "Inkpen2 Special Std", ",", "Inkpen2 Std", ",", "Inkpen2 Text Std", ",", "Iowan Old Style Roman", ",", "Iowan Old Style Titling", ",", "Iowan Old Style Italic", ",", "Iowan Old Style Bold", ",", "Iowan Old Style Bold Italic", ",", "Iowan Old Style Black", ",", "Iowan Old Style Black Italic", ",", "ITF Devanagari Book", ",", "ITF Devanagari Light", ",", "ITF Devanagari Medium", ",", "ITF Devanagari Demi", ",", "ITF Devanagari Bold", ",", "ITF Devanagari Marathi Book", ",", "ITF Devanagari Marathi Light", ",", "ITF Devanagari Marathi Medium", ",", "ITF Devanagari Marathi Demi", ",", "ITF Devanagari Marathi Bold", ",", "Jazz LET Plain", ",", "Kailasa", ",", "Kailasa Bold", ",", "Kaiso Next B", ",", "Kannada MN", ",", "Kannada MN Bold", ",", "Kannada Sangam MN", ",", "Kannada Sangam MN Bold", ",", "Kefa", ",", "Kefa Bold", ",", "Khmer MN", ",", "Khmer MN Bold", ",", "Khmer Sangam MN", ",", "Kino MT", ",", "Kohinoor Bangla", ",", "Kohinoor Bangla Light", ",", "Kohinoor Bangla Medium", ",", "Kohinoor Bangla Semibold", ",", "Kohinoor Bangla Bold", ",", "Kohinoor Devanagari", ",", "Kohinoor Devanagari Light", ",", "Kohinoor Devanagari Medium", ",", "Kohinoor Devanagari Semibold", ",", "Kohinoor Devanagari Bold", ",", "Kohinoor Telugu", ",", "Kohinoor Telugu Light", ",", "Kohinoor Telugu Medium", ",", "Kohinoor Telugu Semibold", ",", "Kohinoor Telugu Bold", ",", "Kokonor", ",", "Kozuka Gothic Pr6N R", ",", "Kozuka Gothic Pr6N EL", ",", "Kozuka Gothic Pr6N L", ",", "Kozuka Gothic Pr6N M", ",", "Kozuka Gothic Pr6N B", ",", "Kozuka Gothic Pr6N H", ",", "Kozuka Gothic Pro R", ",", "Kozuka Gothic Pro EL", ",", "Kozuka Gothic Pro L", ",", "Kozuka Gothic Pro M", ",", "Kozuka Gothic Pro B", ",", "Kozuka Gothic Pro H", ",", "Kozuka Mincho Pr6N R", ",", "Kozuka Mincho Pr6N EL", ",", "Kozuka Mincho Pr6N L", ",", "Kozuka Mincho Pr6N M", ",", "Kozuka Mincho Pr6N B", ",", "Kozuka Mincho Pr6N H", ",", "Kozuka Mincho Pro R", ",", "Kozuka Mincho Pro EL", ",", "Kozuka Mincho Pro L", ",", "Kozuka Mincho Pro M", ",", "Kozuka Mincho Pro B", ",", "Kozuka Mincho Pro H", ",", "Krungthep", ",", "KufiStandardGK", ",", "Lao MN", ",", "Lao MN Bold", ",", "Lao Sangam MN", ",", "Lato", ",", "Lato Italic", ",", "Lato Hairline", ",", "Lato Hairline Italic", ",", "Lato Light", ",", "Lato Light Italic", ",", "Lato Medium", ",", "Lato Medium Italic", ",", "Lato Semibold", ",", "Lato Semibold Italic", ",", "Lato Bold", ",", "Lato Bold Italic", ",", "Lato Heavy", ",", "Lato Heavy Italic", ",", "Lato Black", ",", "Lato Black Italic", ",", "Lato Thin", ",", "Lato Thin Italic", ",", "Letter Gothic Std Slanted", ",", "Letter Gothic Std Medium", ",", "Letter Gothic Std Bold", ",", "Letter Gothic Std Bold Slanted", ",", "Libre Baskerville", ",", "Libre Baskerville Italic", ",", "Libre Baskerville Bold", ",", "Linux Libertine", ",", "Linux Libertine Italic", ",", "Linux Libertine Semibold", ",", "Linux Libertine Semibold Italic", ",", "Linux Libertine Bold", ",", "Linux Libertine Bold Italic", ",", "Linux Libertine Display", ",", "Lithos Pro", ",", "Lithos Pro Black", ",", "Lucida Blackletter", ",", "Lucida Bright", ",", "Lucida Bright Italic", ",", "Lucida Bright Demibold", ",", "Lucida Bright Demibold Italic", ",", "Lucida Calligraphy Italic", ",", "Lucida Console", ",", "Lucida Fax", ",", "Lucida Fax Italic", ",", "Lucida Fax Demibold", ",", "Lucida Fax Demibold Italic", ",", "Lucida Grande", ",", "Lucida Grande Bold", ",", "Lucida Handwriting Italic", ",", "Lucida Sans", ",", "Lucida Sans Italic", ",", "Lucida Sans Demibold Roman", ",", "Lucida Sans Demibold Italic", ",", "Lucida Sans Typewriter", ",", "Lucida Sans Typewriter Oblique", ",", "Lucida Sans Typewriter Bold", ",", "Lucida Sans Typewriter Bold Oblique", ",", "Lucida Sans Unicode", ",", "Luminari", ",", "Malayalam MN", ",", "Malayalam MN Bold", ",", "Malayalam Sangam MN", ",", "Malayalam Sangam MN Bold", ",", "Manbow Clear", ",", "Manbow Dots", ",", "Manbow Fill", ",", "Manbow Lines", ",", "Manbow Screen", ",", "Manbow Solid", ",", "Manbow Spots", ",", "Manbow Stripe", ",", "Manbow Tone", ",", "Marion", ",", "Marion Italic", ",", "Marion Bold", ",", "Marker Felt Thin", ",", "Marker Felt Wide", ",", "Marlett", ",", "MASTERPLAN TRIAL", ",", "Matrix Code NFI", ",", "Matura MT Script Capitals", ",", "Meiryo", ",", "Meiryo Italic", ",", "Meiryo Bold", ",", "Meiryo Bold Italic", ",", "Menlo", ",", "Menlo Italic", ",", "Menlo Bold", ",", "Menlo Bold Italic", ",", "Merriweather Sans", ",", "Merriweather Sans Italic", ",", "Merriweather Sans Light", ",", "Merriweather Sans Light Italic", ",", "Merriweather Sans Bold", ",", "Merriweather Sans Bold Italic", ",", "Merriweather Sans ExtraBold", ",", "Merriweather Sans ExtraBold Italic", ",", "Mesquite Std Medium", ",", "metafors", ",", "Microsoft Sans Serif", ",", "Minion Pro", ",", "Minion Pro Italic", ",", "Minion Pro Medium", ",", "Minion Pro Medium Italic", ",", "Minion Pro Semibold", ",", "Minion Pro Semibold Italic", ",", "Minion Pro Bold", ",", "Minion Pro Bold Italic", ",", "Minion Pro Bold Cond", ",", "Minion Pro Bold Cond Italic", ",", "Mishafi", ",", "Mishafi Gold", ",", "Mistral", ",", "Modern No. 20", ",", "Mona Lisa Solid ITC TT", ",", "Monaco", ",", "Monotype Corsiva", ",", "Monotype Sorts", ",", "MS Gothic", ",", "MS Mincho", ",", "MS PGothic", ",", "MS PMincho", ",", "MS Reference Sans Serif", ",", "MS Reference Specialty", ",", "Mshtakan", ",", "Mshtakan Oblique", ",", "Mshtakan Bold", ",", "Mshtakan BoldOblique", ",", "MT Extra", ",", "Muna", ",", "Muna Bold", ",", "Muna Black", ",", "Museo 500", ",", "Myanmar MN", ",", "Myanmar MN Bold", ",", "Myanmar Sangam MN", ",", "Myanmar Sangam MN Bold", ",", "Myriad Arabic", ",", "Myriad Arabic Italic", ",", "Myriad Arabic Bold", ",", "Myriad Arabic Bold Italic", ",", "Myriad Hebrew", ",", "Myriad Hebrew Italic", ",", "Myriad Hebrew Bold", ",", "Myriad Hebrew Bold Italic", ",", "Myriad Pro", ",", "Myriad Pro Italic", ",", "Myriad Pro Semibold", ",", "Myriad Pro Semibold Italic", ",", "Myriad Pro Bold", ",", "Myriad Pro Bold Italic", ",", "Myriad Pro Condensed", ",", "Myriad Pro Condensed Italic", ",", "Myriad Pro Bold Condensed", ",", "Myriad Pro Bold Condensed Italic", ",", "Myriad Web Pro", ",", "Myriad Web Pro Italic", ",", "Myriad Web Pro Bold", ",", "Myriad Web Pro Condensed", ",", "Myriad Web Pro Condensed Italic", ",", "Nadeem", ",", "New Peninim MT", ",", "New Peninim MT Inclined", ",", "New Peninim MT Bold", ",", "New Peninim MT Bold Inclined", ",", "News Gothic MT", ",", "News Gothic MT Italic", ",", "News Gothic MT Bold", ",", "NipCen's Handwriting Regular", ",", "Noteworthy Light", ",", "Noteworthy Bold", ",", "Noto Sans", ",", "Noto Sans Italic", ",", "Noto Sans Bold", ",", "Noto Sans Bold Italic", ",", "Noto Serif", ",", "Noto Serif Italic", ",", "Noto Serif Bold", ",", "Noto Serif Bold Italic", ",", "November for bach", ",", "Nueva Std", ",", "Nueva Std Italic", ",", "Nueva Std Bold", ",", "Nueva Std Bold Italic", ",", "Nueva Std Condensed", ",", "Nueva Std Condensed Italic", ",", "Nueva Std Bold Condensed", ",", "Nueva Std Bold Condensed Italic", ",", "OCR A Std", ",", "Onyx", ",", "Optima", ",", "Optima Italic", ",", "Optima Bold", ",", "Optima Bold Italic", ",", "Optima ExtraBlack", ",", "Opus", ",", "Opus Big Time Std", ",", "Opus Chords", ",", "Opus Chords Sans", ",", "Opus Chords Sans Condensed", ",", "Opus Chords Sans Condensed Std", ",", "Opus Chords Sans Std", ",", "Opus Chords Std", ",", "Opus Figured Bass", ",", "Opus Figured Bass Extras", ",", "Opus Figured Bass Extras Std", ",", "Opus Figured Bass Std", ",", "Opus Function Symbols", ",", "Opus Function Symbols Std", ",", "Opus Japanese Chords", ",", "Opus Metronome", ",", "Opus Metronome Std", ",", "Opus Note Names", ",", "Opus Note Names Std", ",", "Opus Ornaments", ",", "Opus Ornaments Std", ",", "Opus Percussion", ",", "Opus Percussion Std", ",", "Opus PlainChords", ",", "Opus PlainChords Std", ",", "Opus Roman Chords", ",", "Opus Roman Chords Std", ",", "Opus Special", ",", "Opus Special Extra", ",", "Opus Special Extra Std", ",", "Opus Special Std", ",", "Opus Std", ",", "Opus Text", ",", "Opus Text Std", ",", "Orator Std Slanted", ",", "Orator Std Medium", ",", "Oriya MN", ",", "Oriya MN Bold", ",", "Oriya Sangam MN", ",", "Oriya Sangam MN Bold", ",", "Palatino", ",", "Palatino", ",", "Palatino Italic", ",", "Palatino Italic", ",", "Palatino Bold", ",", "Palatino Bold", ",", "Palatino Bold Italic", ",", "Palatino Bold Italic", ",", "Palatino Linotype", ",", "Palatino Linotype Italic", ",", "Palatino Linotype Bold", ",", "Palatino Linotype Bold Italic", ",", "Papyrus", ",", "Papyrus Condensed", ",", "Park Lane NF", ",", "Party LET Plain", ",", "Perpetua", ",", "Perpetua Italic", ",", "Perpetua Bold", ",", "Perpetua Bold Italic", ",", "Perpetua Titling MT Light", ",", "Perpetua Titling MT Bold", ",", "Phosphate Inline", ",", "Phosphate Solid", ",", "PingFang HK", ",", "PingFang HK Ultralight", ",", "PingFang HK Thin", ",", "PingFang HK Light", ",", "PingFang HK Medium", ",", "PingFang HK Semibold", ",", "PingFang SC", ",", "PingFang SC Ultralight", ",", "PingFang SC Thin", ",", "PingFang SC Light", ",", "PingFang SC Medium", ",", "PingFang SC Semibold", ",", "PingFang TC", ",", "PingFang TC Ultralight", ",", "PingFang TC Thin", ",", "PingFang TC Light", ",", "PingFang TC Medium", ",", "PingFang TC Semibold", ",", "Plantagenet Cherokee", ",", "Plantin MT Std", ",", "Plantin MT Std Italic", ",", "Plantin MT Std Bold", ",", "Plantin MT Std Bold Italic", ",", "Playbill", ",", "PMingLiU", ",", "Poplar Std Black", ",", "PortagoITC TT", ",", "Prestige Elite Std Bold", ",", "Princetown LET", ",", "PT Mono", ",", "PT Mono Bold", ",", "PT Sans", ",", "PT Sans Italic", ",", "PT Sans Bold", ",", "PT Sans Bold Italic", ",", "PT Sans Caption", ",", "PT Sans Caption Bold", ",", "PT Sans Narrow", ",", "PT Sans Narrow Bold", ",", "PT Serif", ",", "PT Serif Italic", ",", "PT Serif Bold", ",", "PT Serif Bold Italic", ",", "PT Serif Caption", ",", "PT Serif Caption Italic", ",", "Raanana", ",", "Raanana Bold", ",", "Red Moon Rising", ",", "REMARK", ",", "Reprise Big Time Std", ",", "Reprise Chords Std", ",", "Reprise Metronome Std", ",", "Reprise Rehearsal Std", ",", "Reprise Script Std", ",", "Reprise Special Std", ",", "Reprise Stamp Std", ",", "Reprise Std", ",", "Reprise Text Std", ",", "Reprise Title Std", ",", "REVOLUTION REVOLUTION", ",", "Roboto", ",", "Roboto Italic", ",", "Roboto Light", ",", "Roboto Light Italic", ",", "Roboto Medium", ",", "Roboto Medium Italic", ",", "Roboto Bold", ",", "Roboto Bold Italic", ",", "Roboto Black", ",", "Roboto Black Italic", ",", "Roboto Thin", ",", "Roboto Thin Italic", ",", "Roboto Mono", ",", "Roboto Mono Italic", ",", "Roboto Mono Light", ",", "Roboto Mono Light Italic", ",", "Roboto Mono Medium", ",", "Roboto Mono Medium Italic", ",", "Roboto Mono Bold", ",", "Roboto Mono Bold Italic", ",", "Roboto Mono Thin", ",", "Roboto Mono Thin Italic", ",", "Rockwell", ",", "Rockwell Italic", ",", "Rockwell Bold", ",", "Rockwell Bold Italic", ",", "Rockwell Extra Bold", ",", "Rosewood Std", ",", "Sana", ",", "Santa Fe LET Plain", ",", "Sathu", ",", "Savoye LET Plain", ",", "SchoolHouse Cursive B", ",", "SchoolHouse Printed A", ",", "Seravek", ",", "Seravek Italic", ",", "Seravek ExtraLight", ",", "Seravek ExtraLight Italic", ",", "Seravek Light", ",", "Seravek Light Italic", ",", "Seravek Medium", ",", "Seravek Medium Italic", ",", "Seravek Bold", ",", "Seravek Bold Italic", ",", "Shree Devanagari 714", ",", "Shree Devanagari 714 Italic", ",", "Shree Devanagari 714 Bold", ",", "Shree Devanagari 714 Bold Italic", ",", "SignPainter HouseScript", ",", "SignPainter HouseScript Semibold", ",", "Silom", ",", "SimSun", ",", "Sin City", ",", "Sinhala MN", ",", "Sinhala MN Bold", ",", "Sinhala Sangam MN", ",", "Sinhala Sangam MN Bold", ",", "Skia", ",", "Skia Light", ",", "Skia Bold", ",", "Skia Black", ",", "Skia Extended", ",", "Skia Light Extended", ",", "Skia Black Extended", ",", "Skia Condensed", ",", "Skia Light Condensed", ",", "Skia Black Condensed", ",", "Snell Roundhand", ",", "Snell Roundhand Bold", ",", "Snell Roundhand Black", ",", "Songti SC", ",", "Songti SC Light", ",", "Songti SC Bold", ",", "Songti SC Black", ",", "Songti TC", ",", "Songti TC Light", ",", "Songti TC Bold", ",", "Source Code Pro", ",", "Source Code Pro Italic", ",", "Source Code Pro ExtraLight", ",", "Source Code Pro ExtraLight Italic", ",", "Source Code Pro Light", ",", "Source Code Pro Light Italic", ",", "Source Code Pro Medium", ",", "Source Code Pro Medium Italic", ",", "Source Code Pro Semibold", ",", "Source Code Pro Semibold Italic", ",", "Source Code Pro Bold", ",", "Source Code Pro Bold Italic", ",", "Source Code Pro Black", ",", "Source Code Pro Black Italic", ",", "Space Mono", ",", "Space Mono Italic", ",", "Space Mono Bold", ",", "Space Mono Bold Italic", ",", "Springtime", ",", "Stencil", ",", "Stencil Std Bold", ",", "STIXGeneral", ",", "STIXGeneral Italic", ",", "STIXGeneral Bold", ",", "STIXGeneral Bold Italic", ",", "STIXIntegralsD", ",", "STIXIntegralsD Bold", ",", "STIXIntegralsSm", ",", "STIXIntegralsSm Bold", ",", "STIXIntegralsUp", ",", "STIXIntegralsUp Bold", ",", "STIXIntegralsUpD", ",", "STIXIntegralsUpD Bold", ",", "STIXIntegralsUpSm", ",", "STIXIntegralsUpSm Bold", ",", "STIXNonUnicode", ",", "STIXNonUnicode Italic", ",", "STIXNonUnicode Bold", ",", "STIXNonUnicode Bold Italic", ",", "STIXSizeFiveSym", ",", "STIXSizeFourSym", ",", "STIXSizeFourSym Bold", ",", "STIXSizeOneSym", ",", "STIXSizeOneSym Bold", ",", "STIXSizeThreeSym", ",", "STIXSizeThreeSym Bold", ",", "STIXSizeTwoSym", ",", "STIXSizeTwoSym Bold", ",", "STIXVariants", ",", "STIXVariants Bold", ",", "Stone Sans ITC TT Bold", ",", "Stone Sans Sem ITC TT Semi", ",", "Stone Sans Sem ITC TT SemiIta", ",", "STSong", ",", "Sukhumvit Set Text", ",", "Sukhumvit Set Light", ",", "Sukhumvit Set Medium", ",", "Sukhumvit Set Semi Bold", ",", "Sukhumvit Set Bold", ",", "Sukhumvit Set Thin", ",", "Superclarendon", ",", "Superclarendon Italic", ",", "Superclarendon Light", ",", "Superclarendon Light Italic", ",", "Superclarendon Bold", ",", "Superclarendon Bold Italic", ",", "Superclarendon Black", ",", "Superclarendon Black Italic", ",", "Symbol", ",", "Synchro LET", ",", "Tahoma Normal", ",", "Tahoma Negreta", ",", "Tamil MN", ",", "Tamil MN Bold", ",", "Tamil Sangam MN", ",", "Tamil Sangam MN Bold", ",", "Tekton Pro", ",", "Tekton Pro Oblique", ",", "Tekton Pro Bold", ",", "Tekton Pro Bold Oblique", ",", "Tekton Pro Bold Extended", ",", "Tekton Pro Bold Condensed", ",", "Telugu MN", ",", "Telugu MN Bold", ",", "Telugu Sangam MN", ",", "Telugu Sangam MN Bold", ",", "Thonburi", ",", "Thonburi Light", ",", "Thonburi Bold", ",", "Times", ",", "Times Italic", ",", "Times Bold", ",", "Times Bold Italic", ",", "Times New Roman", ",", "Times New Roman Italic", ",", "Times New Roman Bold", ",", "Times New Roman Bold Italic", ",", "Trajan Pro", ",", "Trajan Pro Bold", ",", "Trattatello", ",", "Trebuchet MS", ",", "Trebuchet MS Italic", ",", "Trebuchet MS Bold", ",", "Trebuchet MS Bold Italic", ",", "Tw Cen MT", ",", "Tw Cen MT Italic", ",", "Tw Cen MT Bold", ",", "Tw Cen MT Bold Italic", ",", "Type Embellishments One LET Embellishments One LET Plain", ",", "Ubuntu Mono", ",", "Ubuntu Mono Italic", ",", "Ubuntu Mono Bold", ",", "Ubuntu Mono Bold Italic", ",", "UNIVERSAL-COLLEGE-draft", ",", "Varsity", ",", "Verdana", ",", "Verdana Italic", ",", "Verdana Bold", ",", "Verdana Bold Italic", ",", "Very Damaged UL", ",", "VisualBraille VisualBraille", ",", "Vollkorn", ",", "Vollkorn Italic", ",", "Vollkorn SemiBold", ",", "Vollkorn SemiBold Italic", ",", "Vollkorn Bold", ",", "Vollkorn Bold Italic", ",", "Vollkorn Black", ",", "Vollkorn Black Italic", ",", "VT323", ",", "Waseem", ",", "Waseem Light", ",", "Webdings", ",", "Wide Latin", ",", "Wingdings", ",", "Wingdings 2", ",", "Wingdings 3", ",", "Zapf Dingbats", ",", "Zapfino" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 351.500000000000227, 167.0, 100.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 38.0, 145.0, 22.0 ],
					"textcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-52",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 351.500000000000227, 103.0, 43.0, 22.0 ],
					"text" : "fontlist"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 195.0, 197.0, 117.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 15.0, 148.0, 20.0 ],
					"text" : "Preselected Fonts",
					"textcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.6 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 256.500000000000455, 45.0, 150.0, 47.0 ],
					"text" : "Non-system fonts on mac\nNeed to be included in download"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"bgfillcolor_color1" : [ 0.301961, 0.301961, 0.301961, 1.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "color",
					"id" : "obj-48",
					"items" : [ "Consolas Bold", ",", "Courier New Bold", ",", "IBM Plex Mono SemiBold", ",", "Roboto Mono Medium", ",", "Source Code Pro SemiBold", ",", "Space Mono", ",", "Ubuntu Mono", ",", "VT323 Regular" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 195.0, 167.0, 100.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.0, 14.0, 145.0, 22.0 ],
					"textcolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 392.000000000000227, 227.0, 68.0, 22.0 ],
					"text" : "s mainFont"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 675.0, 72.0, 107.0, 22.0 ],
					"text" : "closed setupEditor"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 675.0, 105.0, 141.0, 22.0 ],
					"text" : "consoleLog setupVisuals"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 675.0, 45.0, 63.0, 22.0 ],
					"text" : "closebang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 45.0, 54.0, 22.0 ],
					"text" : "onecopy"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 45.0, 72.0, 70.0, 22.0 ],
					"text" : "loadmess 0"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-82",
					"index" : 1,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 825.0, 45.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-130",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 45.0, 297.0, 61.0, 22.0 ],
					"text" : "route size"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-129",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 45.0, 268.0, 79.0, 22.0 ],
					"text" : "route window"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"hidden" : 1,
					"id" : "obj-128",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.25 ],
					"oncolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 72.541870000000003, 154.204722000000004, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 217.0, 75.0, 22.0, 22.0 ],
					"thickness" : 70.0
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
					"hidden" : 1,
					"id" : "obj-127",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offcolor" : [ 0.901960784313726, 0.901960784313726, 0.901960784313726, 0.25 ],
					"oncolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 1.0 ],
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 45.0, 154.204722000000004, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 217.0, 99.0, 22.0, 22.0 ],
					"thickness" : 70.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-124",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 45.0, 237.0, 69.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "window", "flags", "nogrow", "close", "nozoom", "nofloat", "menu", "minimize", ";", "#Q", "window", "constrain", 50, 50, 32768, 32768, ";", "#Q", "window", "size", 202, 229, 530, 662, ";", "#Q", "window", "title", ";", "#Q", "window", "exec", ";", "#Q", "savewindow", 1, ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"hint" : "",
					"id" : "obj-126",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 32.691390999999996, 117.0, 40.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 242.0, 100.0, 40.0, 20.0 ],
					"text" : "View",
					"textcolor" : [ 0.968627, 0.968627, 0.968627, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"hint" : "",
					"id" : "obj-81",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 77.00239599999999, 117.0, 58.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 242.0, 77.0, 58.0, 20.0 ],
					"text" : "NoFloat",
					"textcolor" : [ 0.968627, 0.968627, 0.968627, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-140",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 1,
							"revision" : 3,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 532.0, 195.0, 781.0, 570.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Lato",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-24",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"patching_rect" : [ 433.276855000000069, 360.0, 56.0, 23.0 ],
									"text" : "loadbang"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-33",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 433.276855000000069, 442.348022000000014, 89.0, 23.0 ],
									"text" : "toolbarvisible 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-50",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 433.276855000000069, 518.934204000000022, 90.0, 23.0 ],
									"text" : "window getsize"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-17",
									"index" : 3,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 590.360382000000072, 103.012198999999995, 30.0, 30.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-19",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 596.360382000000072, 442.348022000000014, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-14",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"patching_rect" : [ 596.360382000000072, 482.408478000000002, 55.0, 23.0 ],
									"text" : "del 1000"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-2",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 596.360382000000072, 518.934204000000022, 36.0, 23.0 ],
									"text" : "write"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-29",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 388.276855000000069, 390.0, 134.0, 37.0 ],
									"text" : "window flags nogrow, window flags nozoom"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-13",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 555.0, 442.348022000000014, 20.0, 23.0 ],
									"text" : "t l"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-5",
									"index" : 2,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 555.0, 292.77984600000002, 18.0, 18.0 ],
									"prototypename" : "Lato9"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"id" : "obj-6",
									"maxclass" : "toggle",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 555.0, 318.701324, 24.0, 24.0 ],
									"prototypename" : "Lato9"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-8",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 3,
									"outlettype" : [ "bang", "bang", "" ],
									"patching_rect" : [ 555.0, 351.622802999999976, 46.0, 23.0 ],
									"text" : "sel 1 0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-1",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 433.276855000000069, 482.408478000000002, 83.0, 23.0 ],
									"text" : "savewindow 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-63",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 360.0, 32.5, 23.0 ],
									"text" : "qlim"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-62",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 360.0, 32.5, 23.0 ],
									"text" : "qlim"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-37",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 451.912994000000026, 20.0, 23.0 ],
									"text" : "t l"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-38",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 555.0, 377.544311999999991, 194.0, 23.0 ],
									"text" : "window flags nofloat, window exec"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-39",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 390.0, 70.0, 37.0 ],
									"text" : "window exec"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-40",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "bang", "", "bang" ],
									"patching_rect" : [ 44.102626999999998, 325.701324, 108.298328500000039, 23.0 ],
									"text" : "t b l b"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-42",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 133.400955500000038, 390.0, 113.346069, 37.0 ],
									"text" : "window flags grow, window flags zoom"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-43",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 299.77984600000002, 119.0, 23.0 ],
									"text" : "prepend window size"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-45",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 226.429596000000004, 216.124145999999996, 39.0, 21.0 ],
									"text" : "Ymax"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-46",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 170.073990000000009, 216.124145999999996, 40.0, 21.0 ],
									"text" : "Xmax"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-47",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 112.613365000000002, 216.124145999999996, 36.0, 21.0 ],
									"text" : "Ymin"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-48",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 56.257755000000003, 216.124145999999996, 38.0, 21.0 ],
									"text" : "Xmin"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-49",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 185.544159000000008, 170.172408999999988, 39.558467999999976, 21.0 ],
									"text" : "pref."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-51",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 4,
									"outlettype" : [ "int", "int", "int", "int" ],
									"patching_rect" : [ 44.102626999999998, 193.73739599999999, 173.0, 23.0 ],
									"text" : "unpack 0 0 0 0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-52",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 170.172408999999988, 127.0, 23.0 ],
									"text" : "92 130 1242 736"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-53",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 214.274460000000005, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-54",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 157.91885400000001, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-55",
									"maxclass" : "newobj",
									"numinlets" : 4,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 44.102626999999998, 264.432372999999984, 173.0, 23.0 ],
									"text" : "pak 0 0 0 0"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-56",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 100.458236999999997, 238.510879999999986, 51.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-57",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 44.102626999999998, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-35",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 442.348022000000014, 20.0, 23.0 ],
									"text" : "t l"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-32",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 574.470184000000017, 406.109283000000005, 181.0, 23.0 ],
									"text" : "window flags float, window exec"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-31",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 390.0, 70.0, 37.0 ],
									"text" : "window exec"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-30",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "bang", "", "bang" ],
									"patching_rect" : [ 309.305480999999986, 325.701324, 98.0, 23.0 ],
									"text" : "t b l b"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-28",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 299.77984600000002, 119.0, 23.0 ],
									"text" : "prepend window size"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-27",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 491.632446000000016, 216.124145999999996, 39.0, 21.0 ],
									"text" : "Ymax"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-26",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 435.276855000000012, 216.124145999999996, 40.0, 21.0 ],
									"text" : "Xmax"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-23",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 377.816222999999979, 216.124145999999996, 36.0, 21.0 ],
									"text" : "Ymin"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-22",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 321.460631999999976, 216.124145999999996, 38.0, 21.0 ],
									"text" : "Xmin"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-20",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 450.747008999999991, 170.172408999999988, 34.0, 21.0 ],
									"text" : "pref."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-18",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 4,
									"outlettype" : [ "int", "int", "int", "int" ],
									"patching_rect" : [ 309.305480999999986, 193.73739599999999, 173.0, 23.0 ],
									"text" : "unpack 0 0 0 0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-16",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 170.172408999999988, 127.0, 23.0 ],
									"text" : "203 230 531 663"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-12",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 479.477325000000008, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-15",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 423.121704000000022, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 4,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 309.305480999999986, 264.432372999999984, 173.0, 23.0 ],
									"text" : "pak 0 0 0 0"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-4",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 365.661102000000028, 238.510879999999986, 51.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-3",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 309.305480999999986, 238.510879999999986, 50.0, 23.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-11",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 310.410491999999977, 45.0, 35.0, 21.0 ],
									"text" : "view"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-10",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 272.84008799999998, 103.012198999999995, 83.0, 37.0 ],
									"text" : "presentation $1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-9",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 272.84008799999998, 45.0, 32.5, 23.0 ],
									"text" : "== 0"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-44",
									"index" : 1,
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 165.653931, 17.0, 18.0, 18.0 ],
									"prototypename" : "Lato9"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.8, 0.8, 0.8, 1.0 ],
									"id" : "obj-41",
									"maxclass" : "toggle",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 165.653931, 45.0, 24.0, 24.0 ],
									"prototypename" : "Lato9"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Lato",
									"fontsize" : 12.0,
									"id" : "obj-25",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 3,
									"outlettype" : [ "bang", "bang", "" ],
									"patching_rect" : [ 165.653931, 84.160210000000006, 46.0, 23.0 ],
									"text" : "sel 1 0"
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-21",
									"index" : 1,
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 272.84008799999998, 518.934204000000022, 18.0, 18.0 ],
									"prototypename" : "Lato9"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-10", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 3 ],
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-13", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"source" : [ "obj-14", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 2 ],
									"source" : [ "obj-15", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-18", 0 ],
									"source" : [ "obj-16", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-16", 1 ],
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-12", 0 ],
									"source" : [ "obj-18", 3 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-15", 0 ],
									"source" : [ "obj-18", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"source" : [ "obj-18", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-18", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-14", 0 ],
									"source" : [ "obj-19", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-33", 0 ],
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-16", 0 ],
									"source" : [ "obj-25", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-52", 0 ],
									"source" : [ "obj-25", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-30", 0 ],
									"source" : [ "obj-28", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-35", 0 ],
									"source" : [ "obj-29", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-3", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-29", 0 ],
									"source" : [ "obj-30", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-35", 0 ],
									"source" : [ "obj-30", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-62", 0 ],
									"source" : [ "obj-30", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-35", 0 ],
									"source" : [ "obj-31", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-13", 0 ],
									"source" : [ "obj-32", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-33", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-35", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-37", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-13", 0 ],
									"source" : [ "obj-38", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-37", 0 ],
									"source" : [ "obj-39", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 1 ],
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-37", 0 ],
									"source" : [ "obj-40", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-42", 0 ],
									"source" : [ "obj-40", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-63", 0 ],
									"source" : [ "obj-40", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-25", 0 ],
									"order" : 1,
									"source" : [ "obj-41", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-9", 0 ],
									"order" : 0,
									"source" : [ "obj-41", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-37", 0 ],
									"source" : [ "obj-42", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-40", 0 ],
									"source" : [ "obj-43", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-41", 0 ],
									"source" : [ "obj-44", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-50", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 0 ],
									"source" : [ "obj-51", 3 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-54", 0 ],
									"source" : [ "obj-51", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-56", 0 ],
									"source" : [ "obj-51", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-57", 0 ],
									"source" : [ "obj-51", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-51", 0 ],
									"source" : [ "obj-52", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 3 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 2 ],
									"source" : [ "obj-54", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-43", 0 ],
									"order" : 1,
									"source" : [ "obj-55", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-52", 1 ],
									"midpoints" : [ 53.602626999999998, 292.710357999999985, 34.157516000000001, 292.710357999999985, 34.157516000000001, 160.746413999999987, 161.602626999999984, 160.746413999999987 ],
									"order" : 0,
									"source" : [ "obj-55", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 1 ],
									"source" : [ "obj-56", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 0 ],
									"source" : [ "obj-57", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-8", 0 ],
									"source" : [ "obj-6", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-31", 0 ],
									"source" : [ "obj-62", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-39", 0 ],
									"source" : [ "obj-63", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-16", 1 ],
									"midpoints" : [ 318.805480999999986, 292.710357999999985, 299.360382000000016, 292.710357999999985, 299.360382000000016, 160.746413999999987, 426.805480999999986, 160.746413999999987 ],
									"order" : 0,
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-28", 0 ],
									"order" : 1,
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-32", 0 ],
									"source" : [ "obj-8", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-38", 0 ],
									"source" : [ "obj-8", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 45.0, 192.0, 64.541870000000003, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"fontname" : "Lato",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p View"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"linecolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 0.5 ],
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 362.5, 66.0, 10.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 14.999999999999773, 330.0, 295.0, 10.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-121",
					"linecolor" : [ 0.9019607902, 0.9019607902, 0.9019607902, 0.5 ],
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 390.0, 66.0, 10.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 180.0, 295.0, 10.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-118", 0 ],
					"order" : 1,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"order" : 0,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-98", 0 ],
					"source" : [ "obj-100", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-109", 0 ],
					"order" : 1,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-110", 0 ],
					"order" : 0,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-86", 0 ],
					"source" : [ "obj-108", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-86", 0 ],
					"source" : [ "obj-108", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-119", 0 ],
					"order" : 1,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"order" : 0,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"source" : [ "obj-11", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-117", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-118", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-119", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-120", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-123", 0 ],
					"source" : [ "obj-122", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-107", 0 ],
					"source" : [ "obj-123", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-129", 0 ],
					"source" : [ "obj-124", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-131", 0 ],
					"source" : [ "obj-125", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-84", 0 ],
					"source" : [ "obj-125", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-140", 0 ],
					"source" : [ "obj-127", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-140", 1 ],
					"source" : [ "obj-128", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-130", 0 ],
					"source" : [ "obj-129", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-120", 0 ],
					"order" : 1,
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"order" : 0,
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-13", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-140", 2 ],
					"midpoints" : [ 54.5, 329.0, 136.270935000000009, 329.0, 136.270935000000009, 181.0, 100.041870000000003, 181.0 ],
					"source" : [ "obj-130", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-122", 0 ],
					"source" : [ "obj-131", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-117", 0 ],
					"order" : 1,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"order" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"source" : [ "obj-14", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-124", 0 ],
					"source" : [ "obj-140", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-117", 0 ],
					"order" : 1,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"order" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-119", 0 ],
					"order" : 1,
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"order" : 0,
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-120", 0 ],
					"order" : 1,
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"order" : 0,
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"order" : 1,
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-32", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"order" : 0,
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"order" : 0,
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"order" : 1,
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-128", 0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"order" : 1,
					"source" : [ "obj-48", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"order" : 0,
					"source" : [ "obj-48", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-66", 0 ],
					"order" : 2,
					"source" : [ "obj-48", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-72", 0 ],
					"order" : 3,
					"source" : [ "obj-48", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"order" : 1,
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"order" : 0,
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-56", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-56", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-61", 0 ],
					"source" : [ "obj-56", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"order" : 1,
					"source" : [ "obj-57", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"order" : 0,
					"source" : [ "obj-57", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-61", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-61", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"order" : 0,
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"order" : 1,
					"source" : [ "obj-63", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"order" : 0,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"order" : 1,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-69", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-69", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-69", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-69", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"order" : 1,
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"order" : 0,
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 1 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-85", 0 ],
					"source" : [ "obj-84", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-107", 0 ],
					"source" : [ "obj-85", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-88", 0 ],
					"source" : [ "obj-86", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-107", 0 ],
					"source" : [ "obj-87", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-87", 0 ],
					"source" : [ "obj-88", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-125", 0 ],
					"order" : 1,
					"source" : [ "obj-89", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-90", 0 ],
					"order" : 0,
					"source" : [ "obj-89", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"order" : 0,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-118", 0 ],
					"order" : 1,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"source" : [ "obj-9", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-99", 0 ],
					"source" : [ "obj-90", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-93", 0 ],
					"source" : [ "obj-92", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-93", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-95", 0 ],
					"source" : [ "obj-93", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"source" : [ "obj-94", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-95", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-100", 0 ],
					"source" : [ "obj-96", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-108", 0 ],
					"source" : [ "obj-99", 0 ]
				}

			}
 ],
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "Audiomix",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "gradient",
						"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberB-1",
				"default" : 				{
					"accentcolor" : [ 0.011765, 0.396078, 0.752941, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberG-1",
				"default" : 				{
					"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberGold-1",
				"default" : 				{
					"accentcolor" : [ 0.764706, 0.592157, 0.101961, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "numberR-1",
				"default" : 				{
					"accentcolor" : [ 0.784314, 0.145098, 0.023529, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ],
		"bgcolor" : [ 0.09803921729, 0.09803921729, 0.09803921729, 1.0 ],
		"editing_bgcolor" : [ 0.2980392277, 0.2980392277, 0.2980392277, 1.0 ]
	}

}
