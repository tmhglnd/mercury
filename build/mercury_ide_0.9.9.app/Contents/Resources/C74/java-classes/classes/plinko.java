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
import java.util.Random;

public class plinko extends MaxObject {

	float thresh[];
	long seed;
	Random r;
	private static int MAX_OUTLETS = 128;
	
	public plinko(Atom[] args) {
		declareAttribute("seed", "getSeed", "setSeed");
		boolean argError = false;
		int numOutlets = 2;
		if (args.length > 0) {
			numOutlets = args[0].toInt();
			if ((numOutlets < 2)||(numOutlets > MAX_OUTLETS)) {
				error("plinko: first argument must be between 2 and " 
					+ MAX_OUTLETS + ". setting the number of outlets to 2");
				numOutlets = 2;
				argError = true;
			}
			args = Atom.removeFirst(args);
		}
		int outlets[] = new int[numOutlets];
		thresh = new float[numOutlets];
		for (int i=0;i<numOutlets;i++) {
			thresh[i] = (float)(i+1)/(float)numOutlets;
			outlets[i] = DataTypes.ALL;
		}
		declareOutlets(outlets);
		createInfoOutlet(false);
		
		if (args.length > 0) { //ie, a list of percentages has been provided
			if (args.length != numOutlets) {
				if (!argError) {
					error("plinko: invalid number of distribution arguments."
								+" reverting to uniform distribution.");
				}
			} else {
				float[] temp = Atom.toFloat(args);
				if (!checkAscending(temp)) {
					error("plinko: distribution arguments are not ascending." + 
							" reverting to uniform distribution.");
				} else {
					if (!checkRange(temp)) {
						error("plinko: distribution arguments are not all "
							+"between 0.0 and 1.0. reverting to uniform " 
							+"distribution.");
					} else {
						thresh = temp;
					}
				}
			}
		}
		r = new Random();
	}
	
	private boolean checkAscending(float f[]) {
		for (int i=1; i < f.length; i++) 
			if (f[i-1] >= f[i])
				return false;
		return true;
	}
	
	private boolean checkRange(float f[]) {
		for (int i=0; i<f.length; i++)
			if ((f[i]<0.0)||(f[i]>1.0))
				return false;
		return true;
	}
	
	public void setSeed(int i) {
		seed = (long)i;
		r.setSeed((long)i);
	}
	
	public Atom[] getSeed() {
		return Atom.emptyArray;
	}
	
	public void bang() {
		list(new Atom[] {Atom.newAtom("bang")});
	}
	
	public void inlet(int i) {
		list(new Atom[] {Atom.newAtom(i)});
	}
	
	public void inlet(float f) {
		list(new Atom[] {Atom.newAtom(f)});
	}
	
	public void anything(String s, Atom a[]) {
		list(Atom.newAtom(s, a));
	}
	
	public void list(Atom a[]) {
		float f = r.nextFloat();
		int i = 0;
		while ((thresh[i] < f) && (++i < thresh.length)) ;
		outlet(i, a);
	}
}