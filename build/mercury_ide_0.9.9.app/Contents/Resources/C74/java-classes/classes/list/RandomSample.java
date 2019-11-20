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
 * outputs a random sample of the input list
 * 
 * created on 6-Apr-2004
 * @author bbn
 */
public class RandomSample extends ListProcessor {
	
	int size = 1;
	boolean repeats = true;
	
	public RandomSample() {
		declareIO(1,1);
		declareAttribute("size",null,"setSize");
		declareAttribute("repeats");
	}
	
	public void setSize(int i) {
		if (i<1) 
			error("RandomSample: size must be at least 1.");
		else
			size = i;
	}
	
	public void input(int idx, Atom[] a) {
		Atom[] b;
		if ((!repeats)&&(size > a.length))
			b = new Atom[a.length];
		else
			b = new Atom[size];
		for (int i=0;i<b.length;i++) {
			int id = (int)((double)a.length * Math.random());
			b[i] = a[id];
			if (!repeats) 
				a = Atom.removeSome(a, id, id);
		}
		setOutput(0,b);
	}
}
