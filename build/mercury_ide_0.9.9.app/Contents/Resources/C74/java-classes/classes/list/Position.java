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
 * outputs the elements of the left list 
 * using the indices of the right inlet
 * 
 * created on 10-Apr-2004
 * @author bbn
 */
public class Position extends ListProcessor {
	
	Position(Atom[] a) {
		declareIO(2, 1);
		setInput(1, a);
	}
	
	protected void input(int idx, Atom[] a) {
		if (idx==0) {
			Atom[] indices = getInput(1);
			Atom[] out = new Atom[a.length];
			int count = 0;
			for (int i=0;i<indices.length;i++) {
				if (indices[i].isInt()) {
					int val = indices[i].toInt();
					if ((val >= 0)&&(val < a.length))
						out[count++] = a[val];
				}
			}
			out = Atom.removeLast(out, a.length-count);
			setOutput(0,out);
		}
	}
	
}
