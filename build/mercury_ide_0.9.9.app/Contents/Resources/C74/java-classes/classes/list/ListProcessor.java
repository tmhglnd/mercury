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
 * ListProcessor - a shell for list processing classes
 * 
 * created on 6-Apr-2004
 * @author bbn 
 */
public abstract class ListProcessor extends MaxObject {

	private int info_outlet = 0;
	private Atom[][] in, out;
	private boolean autoSet = true;
	
	public int iterate = 0;
	public boolean autoBang = true;
	
	
	ListProcessor() {
		declareIO(2,2);
		attributeInit();
	}
	
	protected void declareIO(int ins, int outs) {
		int[] temp = new int[ins];
		for (int i=0;i<ins;i++)
			temp[i]=DataTypes.ALL;
		declareInlets(temp);
		in = new Atom[ins][0];
		
		temp = new int[outs];
		for (int i=0;i<outs;i++)
			temp[i]=DataTypes.ALL;
		declareOutlets(temp);
		out = new Atom[outs][0];
	}
	
	private void attributeInit() {
		declareAttribute("iterate");
		declareAttribute("autoBang");
	}
	
	protected void setAutoSet(boolean val) {
		autoSet = val;
	}
	
	protected void setOutput(int idx, Atom[] a) {
		out[idx] = a;
	}
	
	protected void setInput(int idx, Atom[] a) {
		in[idx] = a;
	}
	
	protected Atom[] getInput(int idx) {
		return in[idx];
	}

	protected void input(int idx, Atom[] a) {
		//to be overridden by subclasses
	}
	
	//input from max world
	public void inlet(int i) {
		list(new Atom[]{Atom.newAtom(i)});
	}
	
	public void inlet(float f) {
		list(new Atom[]{Atom.newAtom(f)});
	}

	public void anything(String s, Atom[] a) {
		list(Atom.newAtom(s, a));
	}

	public void list(Atom[] a) {
		int idx = getInlet();
		if (autoSet) in[idx] = a;
		input(idx, a);
		if ((idx==0)&&(autoBang)) bang();
	}

	public void bang() {
		output();
	}

	//output to max world
	private void output() {
		for (int i=out.length-1;i>=0;i--)
			if (out[i].length > 0)
				iterOutput(i, out[i]);
	}
		
	private void iterOutput(int outletIdx, Atom[] a) {
		if (iterate<=0) 
			outlet(outletIdx, a);
		else {
			int start = 0;
			while (start < a.length) {
				int num = iterate;
				if (start + iterate > a.length)
					num = a.length - start;
				Atom[] outList = new Atom[num];
				System.arraycopy(a, start, outList, 0, num);
				outlet(outletIdx, outList);
				start += num;
			}
		}
	}
}