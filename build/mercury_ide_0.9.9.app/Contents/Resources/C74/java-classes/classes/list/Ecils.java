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
 * just like slice but backwards:
 * output last N out right outlet, rest out left.  right first.
 * 
 * created on 9-Apr-2004
 * @author bbn
 */
public class Ecils extends ListProcessor {
	
	
	int howMany = 1;
	
	Ecils(Atom[] a) {
		declareIO(2, 2);
		declareAttribute("howMany");
		if (a.length > 0)
			howMany = a[0].toInt();
	}
	
	protected void input(int idx, Atom[] a) {
		switch (idx) {
			case 0: slice(a); break;
			case 1: setHowMany(a); break;
		}
	}
	
	private void slice(Atom[] a) {
		if (howMany > 0) {
			setOutput(1, Atom.removeFirst(a, a.length-howMany));
			setOutput(0, Atom.removeLast(a, howMany));
		} else {
			setOutput(1, Atom.emptyArray);
			setOutput(0, a);
		}
	}
	
	private void setHowMany(Atom[] a) {
		howMany = a[0].toInt();
	}

}
