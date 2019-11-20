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
 * outputs elements that are in the leftmost inlet 
 * and are not in any of the others
 * 
 * created on Apr 10, 2004
 * @author bbn
 *
 */
public class Unique extends ListProcessor {
	
	private int size = 2;
	
	Unique(Atom[] a) {
		if (a.length > 0)
			size = a[0].toInt();
		declareIO(size, 1);
	}
	
	protected void input(int idx, Atom[] a) {
		if (idx==0) {
			int i=0;
			while (i < a.length) {
				boolean found = false;
				for (int j=1;j<size;j++) 
					if (Atom.isIn(a[i], getInput(j)) != -1)
						found = true;
				if (found)
					a = Atom.removeOne(a, i);
				else 
					i++;
			}
		}
		setOutput(0, a);
	}
}
