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

package list;
import com.cycling74.max.*;
/**
 *
 * output mth element from list, counting from zero
 * 
 * created on 9-Apr-2004
 * @author bbn
 */
public class Mth extends ListProcessor {
	
	private int whichElement = 1;
	private Atom replacer = null;
	
	Mth(Atom[] a) {
		declareIO(2, 2);
		if (a.length > 0)
			whichElement = a[0].toInt();
		setAutoSet(false);
		declareAttribute("whichElement");
	}
	
	protected void input(int idx, Atom[] a) {
		switch (idx) {
			case 0: incomingList(a); break;
			case 1: setWhichElement(a); break;
		}
	}

	private void setWhichElement(Atom[] a) {
		if (a.length > 0)
			whichElement = a[0].toInt();
		if (a.length > 1)
			replacer = a[1];
		else
			replacer = null;
	}
	
	private void incomingList(Atom[] a) {
		if ((a.length > whichElement)&&(whichElement >= 0)) {
			int which = whichElement;
			setOutput(0, new Atom[]{a[which]});
			if (replacer != null) {
				a[which] = replacer;
				setOutput(1, a);
			} else
				setOutput(1, Atom.removeSome(a, which, which));
		} else {
			setOutput(0, Atom.emptyArray);
			setOutput(1, a);
		}	
	}
}


