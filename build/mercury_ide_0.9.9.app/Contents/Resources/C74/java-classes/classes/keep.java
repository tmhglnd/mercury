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

import com.cycling74.max.*;
/**
 * keep - simple propogation of parameters between patching sessions
 * 
 * created on 8-May-2004
 * @author bbn
 */
public class keep extends MaxObject {
	
	private Atom[] stuff = null;
	private MaxPatcher patch = getParentPatcher();
	private MaxWindow window = patch.getWindow();
	boolean autobang = true;
	
	keep() {
		declareIO(1,1);
		declareAttribute("autobang");
		setInletAssist(0, "(anything) whatever is input is stored and saved with the patch");
		setOutletAssist(0, "(anything) outputs whatever is stored on bang");
	}
		
	private void setStuff(Atom[] a) {
		window.setDirty(true);
		stuff = a;
	}
	
	public void inlet(int i) {
		setStuff(new Atom[] {Atom.newAtom(i)});
	}
	
	public void inlet(float f) {
		setStuff(new Atom[] {Atom.newAtom(f)});
	}
	
	public void list(Atom[] a) {
		setStuff(a);
	}
	
	public void anything(String msg, Atom[] a) {
		setStuff(Atom.newAtom(msg, a));
	}
	
	public void bang() {
		outlet(0, stuff);
	}
	
	public void loadbang() {
		if (autobang)
			bang();
	}
	
	public void save() {
		embedMessage("list", stuff);
	}
}


