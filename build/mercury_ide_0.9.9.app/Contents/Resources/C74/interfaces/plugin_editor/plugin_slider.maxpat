{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 34.0, 78.0, 1212.0, 641.0 ],
		"bgcolor" : [ 0.195512, 0.195512, 0.195512, 1.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 10.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial Bold",
		"gridonopen" : 0,
		"gridsize" : [ 8.0, 8.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"boxes" : [ 			{
				"box" : 				{
					"align" : 1,
					"bgcolor" : [ 0.572549, 0.615686, 0.658824, 1.0 ],
					"bgoncolor" : [ 1.0, 0.8, 0.4, 1.0 ],
					"color" : [ 0.1, 0.1, 0.1, 1.0 ],
					"fontface" : 1,
					"fontname" : "Arial",
					"fontsize" : 7.0,
					"hint" : "Move slider down",
					"id" : "obj-5",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 56.0, 9.0, 16.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 73.0, 47.0, 13.0, 13.0 ],
					"rounded" : 64.0,
					"style" : "",
					"text" : "⬇︎",
					"textcolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"texton" : "⬇︎",
					"textoncolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"usecustombgoncolor" : 1,
					"varname" : "sliderdown"
				}

			}
, 			{
				"box" : 				{
					"align" : 1,
					"bgcolor" : [ 0.572549, 0.615686, 0.658824, 1.0 ],
					"bgoncolor" : [ 1.0, 0.8, 0.4, 1.0 ],
					"color" : [ 0.1, 0.1, 0.1, 1.0 ],
					"fontface" : 1,
					"fontsize" : 7.0,
					"hint" : "Move slider up",
					"id" : "obj-4",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 32.0, 9.0, 16.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 49.0, 47.0, 13.0, 13.0 ],
					"rounded" : 64.0,
					"style" : "",
					"text" : "⬆︎",
					"textcolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"texton" : "⬆︎",
					"textoncolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"usecustombgoncolor" : 1,
					"varname" : "sliderup"
				}

			}
, 			{
				"box" : 				{
					"align" : 1,
					"bgcolor" : [ 0.572549, 0.615686, 0.658824, 1.0 ],
					"bgoncolor" : [ 1.0, 0.8, 0.4, 1.0 ],
					"color" : [ 0.1, 0.1, 0.1, 1.0 ],
					"fontface" : 1,
					"fontname" : "Lato Bold",
					"fontsize" : 7.0,
					"hint" : "Remove slider",
					"id" : "obj-84",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 8.0, 9.0, 16.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 34.0, 32.0, 13.0, 13.0 ],
					"rounded" : 64.0,
					"style" : "",
					"text" : "X",
					"textcolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"texton" : "X",
					"textoncolor" : [ 0.1, 0.1, 0.1, 1.0 ],
					"usecustombgoncolor" : 1,
					"varname" : "removeslider"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 10.0,
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 392.0, 8.0, 128.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 1.0, 1.0, 1.0, 0.72 ],
					"varname" : "param_value"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 10.0,
					"id" : "obj-1",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 80.0, 8.0, 128.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 1.0, 1.0, 1.0, 0.72 ],
					"varname" : "param_label"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.407843, 0.407843, 0.407843, 0.0 ],
					"color" : [ 0.744519, 0.744519, 0.744519, 1.0 ],
					"id" : "obj-2",
					"knobcolor" : [ 0.744519, 0.744519, 0.744519, 1.0 ],
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"orientation" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 216.0, 8.0, 168.0, 18.0 ],
					"style" : "",
					"varname" : "param_slider"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [  ],
		"embedsnapshot" : 0
	}

}
