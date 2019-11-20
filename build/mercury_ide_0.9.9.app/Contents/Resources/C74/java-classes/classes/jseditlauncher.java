/*
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
*/

import javax.swing.SwingUtilities;

import com.cycling74.max.Atom;
import com.cycling74.max.MaxObject;
import com.cycling74.max.MaxSystem;
import com.cycling74.mxjedit.MXJEditor;

public class jseditlauncher extends MaxObject
{
    private String _current_file = null;
    public static final String JSTEMPLATE = new String(" ");
    
    public jseditlauncher(Atom[] atoms) {
		declareInlets(new int[] { 15 });
		declareOutlets(new int[] { 15 });
    }
    
    public void bang() {
	/* empty */
    }
    
    public void launch(String string) {
	String string_0_ = MaxSystem.locateFile(string);
	if (string_0_ != null) {
	    final String fnf = string_0_;
	    _current_file = string_0_;
	    SwingUtilities.invokeLater(new Runnable() {
		public void run() {
		    MXJEditor mxjeditor = new MXJEditor();
		    mxjeditor.setBufferFromFile(fnf);
		    mxjeditor.setMode(3);
		    mxjeditor.setVisible(true);
		}
	    });
	} else
	    SwingUtilities.invokeLater(new Runnable() {
		public void run() {
		    MXJEditor mxjeditor = new MXJEditor();
		    mxjeditor.setBuffer(jseditlauncher.JSTEMPLATE);
		    mxjeditor.setMode(3);
		    mxjeditor.setVisible(true);
		}
	    });
    }
    
    public void list(Atom[] atoms) {
	/* empty */
    }
}

