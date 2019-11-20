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
 * output position for each occurrence of right list in left
 * 
 * created on 9-Apr-2004
 * @author bbn
 */
public class Sub extends ListProcessor {
	
	Sub() {
		declareIO(2,2);
	}
	
	protected void input(int idx, Atom[] a) {
		if ((idx==0)&&(getInput(1).length > 0)) {
			Atom[] found = isIn(a, getInput(1));
			setOutput(1, new Atom[] {Atom.newAtom(found.length)});
			setOutput(0, found);
		}
	}
	
	
	private Atom[] isIn(Atom[] a, Atom[] b) {
		int[] temp = new int[a.length];
		int size=0;
		for (int i=0;i<(a.length-b.length+1);i++) {
			boolean match = true;
			for (int j=0;j<b.length;j++) 
				if (!(a[i+j].equals(b[j])))
					match = false;
			if (match) {
				temp[size] = i+1;
				size++;
			}
		}
		Atom[] finished = Atom.newAtom(temp);
		finished = Atom.removeLast(finished, a.length-size);
		return finished;
	}
}
