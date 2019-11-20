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
import java.util.Calendar;

public class now extends MaxObject {

	public now(Atom[] args) {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.INT,DataTypes.INT,DataTypes.INT,
								DataTypes.INT,DataTypes.INT,DataTypes.INT,
								DataTypes.INT,DataTypes.INT,DataTypes.INT,
								DataTypes.INT,DataTypes.INT,DataTypes.INT});
	}
	
	public void bang() {
		Calendar c = Calendar.getInstance();
		int i;

		i = c.get(Calendar.WEEK_OF_MONTH);
		outlet(11, i); 
		i = c.get(Calendar.WEEK_OF_YEAR);
		outlet(10, i); 
		i = c.get(Calendar.DAY_OF_YEAR);
		outlet(9, i); 
		i = c.get(Calendar.AM_PM);
		outlet(8, i); 
		i = c.get(Calendar.MILLISECOND);
		outlet(7, i); 
		i = c.get(Calendar.SECOND);
		outlet(6, i); 
		i = c.get(Calendar.MINUTE);
		outlet(5, i); 
		i = c.get(Calendar.HOUR);
		outlet(4, i); 
		i = c.get(Calendar.YEAR);
		outlet(3, i); 
		i = c.get(Calendar.DAY_OF_MONTH);
		outlet(2, i); 
		i = c.get(Calendar.MONTH);
		outlet(1, i); 				
		i = c.get(Calendar.DAY_OF_WEEK);
		outlet(0, i); 		
	}
}