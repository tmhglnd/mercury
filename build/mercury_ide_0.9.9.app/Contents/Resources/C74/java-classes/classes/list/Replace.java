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
 * replaces an indexed element with soemthing else
 * 
 * created on 24-Jun-2004
 * @author bbn
 */
public class Replace extends ListProcessor {
	
	private int which = 0;
	private Atom what = null;
	
	Replace(Atom[] a) {
		declareIO(3, 1);
		if (a.length > 0)
			setWhich(a[0].toInt());
		if (a.length > 1)
			setWhat(a[1]);
	}
	
	protected void input(int idx, Atom[] a) {
		switch (idx) {
			case 0: incomingList(a); break;
			case 1: setWhich(a[0].toInt()); break;
			case 2: setWhat(a[0]); break;
		}
	}

	private void setWhich(int i) {
		if (which >= 0) which = i;
	}
	
	private void setWhat(Atom a) {
		what = a;
	}
	
	private void incomingList(Atom[] a) {
		if (what != null)
			a[which] = what;
		setOutput(0, a);
	}
}
