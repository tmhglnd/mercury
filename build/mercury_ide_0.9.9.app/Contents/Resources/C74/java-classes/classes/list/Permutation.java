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
 * returns the Nth permutation of a list
 * 
 * created on 10-Apr-2004
 * @author bbn
 */
public class Permutation extends ListProcessor {
	
	Permutation(Atom[] a) {
		declareIO(2, 1);
		setInput(1, a);
	}
	
	protected void input(int idx, Atom[] a) {
		if (idx==0) 
			setOutput(0, permutation(a[0].toInt(), getInput(1)));
	}
	
	private Atom[] permutation(int perm, Atom[] arr) {
		Atom[] a = new Atom[arr.length];
		System.arraycopy(arr,0,a,0,arr.length);
		for (int i=0;i<a.length-1;++i) {
			int j = i + imod(perm, a.length-i);
			perm = idiv(perm, a.length-i);
			Atom temp = a[i];
			a[i] = a[j];
			a[j] = temp;
		}
		return a;
	}
	
	private int imod(int a, int b) {
		int c = a%b;
		if (c<0) c+=b;
		return c;
	}
	
	private int idiv(int a, int b) {
		int c;
		if (b==0) c = a;
		else if (a<0) c = (a+1)/b - 1;
		else c = a/b;
		return c;
	}
}
