{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 3,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 134.0, 168.0, 640.0, 480.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-9",
                    "linecount": 28,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 362.0, 45.0, 242.0, 395.0 ],
                    "text": "old calculation, but it defers the input to the main thread, resulting in issues when the triggers is played first.\n\n<pre><code>\r----------begin_max5_patcher----------\r443.3ocyV1taCBBEF9+8pfvucMB9Qq6VoYoAUVGMJXPryllduOAss1LWqjr4\rzDEDNfu73wW7zBPyALVTSKguB1XtUeb5ZsKAzz88MZ5HmTmjQJ0CFxoeJh2C\rc9dTJZsRGgRTdLOVjMTLEDUxGL9tsRZhN3M.uUQKcc.HTftHXk9JFuzE71.C\rmWkKpTYTkVJnABnsW0wBpYxgvAmFVpVmMKiWPvgeJL9kGxcce95cmc9qoHHF\rXIBCb0EdtiGg3QfvXBeGz44nDOaQ4dlZISQkijlQs.bsIgz2BZ5MlDRmtymP\rSuYMMyIJIqFf.umIHpPe.ZbrEGZfJJps.486lp1HsssRaLH1e1h3BIsfxSAz\r5B6RZ6.6Zzz5hFLqSVslh3ViT+v+yryvmwT7OwTSstIGlw3OdSeCEzQMLtKE\rUxjtEP2Flfg4QJsTw3DESvuENtMbqe8aopv1oJ+oSUnwqpfoQU91wpvoQUAy\rRUEZmp7drpt6CSRQwAprrc72jRi+1dgrooHmdsw3l154UCkzCrtQ26+NfDYi\rmlpwPqRpWGv5v9ayAyEoTIuhc0StCUPimJmjSKKHFBXbfWb9KfaPV1F\r-----------end_max5_patcher-----------\r</code></pre>\r"
                }
            },
            {
                "box": {
                    "id": "obj-32",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "float" ],
                    "patching_rect": [ 128.25, 198.0, 29.5, 22.0 ],
                    "text": "/ 1."
                }
            },
            {
                "box": {
                    "id": "obj-7",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 5,
                    "outlettype": [ "", "", "", "", "" ],
                    "patching_rect": [ 104.0, 165.0, 115.0, 22.0 ],
                    "saved_object_attributes": {
                        "legacyoutputorder": 1
                    },
                    "text": "regexp (\\\\d+)\\\\/(\\\\d+)"
                }
            },
            {
                "box": {
                    "id": "obj-27",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 104.0, 135.0, 57.0, 22.0 ],
                    "text": "tosymbol"
                }
            },
            {
                "box": {
                    "id": "obj-25",
                    "maxclass": "newobj",
                    "numinlets": 3,
                    "numoutlets": 3,
                    "outlettype": [ "", "", "" ],
                    "patching_rect": [ 45.0, 90.0, 78.0, 22.0 ],
                    "text": "route float int"
                }
            },
            {
                "box": {
                    "comment": "",
                    "id": "obj-87",
                    "index": 1,
                    "maxclass": "inlet",
                    "numinlets": 0,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 45.0, 45.0, 30.0, 30.0 ]
                }
            },
            {
                "box": {
                    "comment": "",
                    "id": "obj-88",
                    "index": 1,
                    "maxclass": "outlet",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 45.0, 282.0, 30.0, 30.0 ]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-27", 0 ],
                    "source": [ "obj-25", 2 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-88", 0 ],
                    "source": [ "obj-25", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-88", 0 ],
                    "source": [ "obj-25", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-7", 0 ],
                    "source": [ "obj-27", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-88", 0 ],
                    "source": [ "obj-32", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-32", 0 ],
                    "source": [ "obj-7", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-25", 0 ],
                    "source": [ "obj-87", 0 ]
                }
            }
        ],
        "toolbaradditions": [ "audiomute", "audiosolo", "packagemanager", "Data Knot" ]
    }
}