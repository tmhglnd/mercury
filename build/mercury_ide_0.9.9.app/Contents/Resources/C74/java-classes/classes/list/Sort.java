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
import java.util.Arrays;
/**
 *
 * sorts incoming lists - symbols, then ints and floats
 * 
 * created on 6-Apr-2004
 * @author bbn
 */
public class Sort extends ListProcessor {
	
	private boolean descending = false;
	
	Sort(Atom[] a) {
		declareIO(1, 1);
		if (a.length>0)
			if (a[0].toInt() < 0)
				descending = true;
	}
	
	protected void input(int idx, Atom[] a) {
		Arrays.sort(a);
		if (descending)
			a = Atom.reverse(a);
		setOutput(0,a);
	}
}
