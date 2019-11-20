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
 *
 * info about the max version
 * 
 * created on 23-Apr-2004
 * @author bbn
 */
public class maxversion extends MaxObject {
	private boolean auto = false;
	
	maxversion() {
		declareAttribute("auto");
		createInfoOutlet(false);
		declareOutlets(new int[]{DataTypes.INT, 
								DataTypes.INT,
								DataTypes.INT, 
								DataTypes.INT});
		setInletAssist(0, "bang triggers output");
		setOutletAssist(new String[] {"(int) Major version number",
									"(int) Minor version number",
											"(int) Update number",
				"(int) Is the version running as a stand-alone?"});
	}
	
	public void loadbang() {
		if (auto) bang();
	}
	
	public void bang() {
		outlet(3, MaxSystem.isStandAlone());
		int[] i = MaxSystem.getMaxVersionInts();
		outlet(2, i[2]);
		outlet(1, i[1]);
		outlet(0, i[0]);
	}
}
