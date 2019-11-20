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
 * Groups incoming items into lists of a certain size
 * 
 * created on April 8, 2004
 * @author bbn
 *
 * 
 */
public class Group extends ListProcessor {
	
	private Atom[] g = Atom.emptyArray;
	int size = 2;
	
	Group(Atom[] a) {
		declareIO(1,1);
		if (a.length > 0)
			if (a[0].toInt() > 0) {
				size = a[0].toInt();
			} else
				error("Group: intialization arg should be a positive int");
		declareAttribute("size", null, "setSize");
		autoBang = false;
	}
	
	public void setSize(int i) {
		if (i>0)
			size = i;
		else
			error("Group: size should be a positive integer");
	}
	
	protected void input(int idx, Atom[] a) {
		Atom[] temp = new Atom[a.length+g.length];
		System.arraycopy(g,0,temp,0,g.length);
		System.arraycopy(a,0,temp,g.length,a.length);
		while (temp.length >= size) {
			Atom[] out = new Atom[size];
			System.arraycopy(temp, 0, out, 0, size);
			setOutput(0, out);
			bang();
			temp = Atom.removeFirst(temp, size);
		}
		g = temp;
	}
}
