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
 * outputs a shuffled version of the incoming list
 * 
 * created on 6-Apr-2004
 * @author bbn
 */
public class Shuffle extends ListProcessor {

	private static final int 	SPILL_MODE = 0,
								FLIP_MODE = 1,
								BRIDGE_MODE = 2;
	int mode = SPILL_MODE;
	int howManyTimes = 1;
	
	Shuffle() {
		declareIO(1,1);
		declareAttribute("mode", null, "setMode");
		declareAttribute("howMany", "getHowManyTimes", "setHowManyTimes");
	}
	
	public void setMode(int i) {
		if ((i>0)&&(i<3))
			mode = i;
		else
			error("Shuffle: valid modes are 0 (spill), 1 (flip) and 2 (bridge)");
	}
	
	private Atom[] getHowManyTimes() {
		return new Atom[] {Atom.newAtom(howManyTimes)};
	}
	
	private void setHowManyTimes(int i) {
		if (i>=0)
			howManyTimes = i;
		else
			error("Shuffle: howManyTimes must be non-negative");
	}
	
	protected void input(int idx, Atom[] a) {
		Atom[] b = new Atom[a.length];
		for (int i=0; i<b.length; i++) {
			int index = (int)(((double)a.length) * Math.random());
			b[i] = a[index];
			a = Atom.removeSome(a, index, index);
		}
		setOutput(0, b);
	}
}
