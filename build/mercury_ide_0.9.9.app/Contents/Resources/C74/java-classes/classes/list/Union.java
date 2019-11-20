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
 * outputs all elements from either list, no duplicates
 * 
 * created on 9-Apr-2004
 * @author bbn
 */
public class Union extends ListProcessor {
	
	private int size = 2;
	
	Union(Atom[] a) {
		if (a.length > 0)
			size = a[0].toInt();
		declareIO(size, 1);
	}
	
	protected void input(int idx, Atom[] a) {
		if (idx==0) {
			Atom[] temp = Atom.emptyArray;
			for (int i=0;i<size;i++) {
				temp = Atom.union(temp, getInput(i));
			}
			setOutput(0, temp);
		}
	}
}