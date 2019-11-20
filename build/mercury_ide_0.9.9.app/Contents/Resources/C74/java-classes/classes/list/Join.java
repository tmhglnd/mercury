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
 * joins two or more lists together
 * 
 * created on 8-Apr-2004
 * @author bbn
 */
public class Join extends ListProcessor {
	
	private int size;
	
	Join(Atom[] a) {
		if (a.length > 0)
			size = a[0].toInt();
		else
			size = 2;
		declareIO(size, 1);
	}
	
	protected void input(int idx, Atom[] a) {
		int tempSize = 0;
		for (int i=0;i<size;i++) 
			tempSize += getInput(i).length;
		Atom[] temp = new Atom[tempSize];
		int k=0;
		for (int i=0;i<size;i++)
			for (int j=0;j<getInput(i).length;j++)
				temp[k++] = getInput(i)[j];
		setOutput(0, temp);
	}
}
