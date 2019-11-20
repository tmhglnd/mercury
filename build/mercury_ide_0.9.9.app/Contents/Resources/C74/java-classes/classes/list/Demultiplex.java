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
 * TODO describe the class
 * 
 * created on 7-Apr-2004
 * @author bbn
 */
public class Demultiplex extends ListProcessor {
	
	private int size;
	
	Demultiplex(Atom[] a) {
		if (a.length > 0)
			size = a[0].toInt();
		else
			size = 2;
		declareIO(1, size);
	}
	
	public void input(int idx, Atom[] a) {
		int base = a.length / size;
		int extra = a.length - size*(a.length/size);
		Atom[][] out = new Atom[size][];
		for (int i=0;i<size;i++) 
			if (i < extra)
				out[i] = new Atom[base+1];
			else
				out[i] = new Atom[base];
	
		for (int i=0;i<base;i++) 
			for (int j=0;j<size;j++) 
				out[j][i]=a[i*size+j];
			
		for (int j=0;j<extra;j++) 
			out[j][base]=a[base*size+j];
		
		for (int j=0;j<size;j++) 
			setOutput(j, out[j]);
	}

}
