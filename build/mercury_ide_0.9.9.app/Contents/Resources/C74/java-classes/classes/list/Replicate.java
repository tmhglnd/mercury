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
 * repeats an input list N times
 * 
 * created on 10-Apr-2004
 * @author bbn
 */
public class Replicate extends ListProcessor {
	
	private int howMany = 1;
	
	Replicate(Atom[] a) {
		declareIO(2, 1);
		if (a.length > 0)
			howMany = a[0].toInt();
		declareAttribute("howMany");
	}
	
	protected void input(int idx, Atom[] a) {
		switch (idx) {
			case 0: incomingList(a); break;
			case 1: setHowMany(a); break;
		}
	}

	private void setHowMany(Atom[] a) {
		if (a.length > 0)
			howMany = a[0].toInt();
	}
	
	private void incomingList(Atom[] a) {
		if (howMany < 0) 
			a = Atom.reverse(a);
		int hm = Math.abs(howMany);
		Atom[] out = new Atom[hm*a.length];
		for (int i=0;i<hm;i++) {
			System.arraycopy(a, 0, out, i*a.length, a.length);
		}
		setOutput(0, out);
	}
}
