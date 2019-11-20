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
import java.math.BigInteger;

/**
 * fibonacci - calculates the nth fibonacci number
 * using the BigInteger class.
 * 
 * created in Feb 2004
 * @author bbn
 */
public class fibonacci extends MaxObject {

	private BigInteger a = BigInteger.valueOf(0);
	private BigInteger b = BigInteger.valueOf(1);
	private BigInteger c = BigInteger.valueOf(1);
	
	int radix = 10; //start with base 10
	
	public fibonacci(Atom[] args) {
		declareAttribute("radix");
	}
	
	public void inlet(int i) {
		if (i<=0) {
			error("fibonacci: needs an integer index i > 0");
			return;
		}
		a = BigInteger.valueOf(0);
		b = BigInteger.valueOf(1);
		
		for (int j = 2; j <= i; j++) {
			c=a.add(b);
			a=b;
			b=c;
		}
		outlet(0,b.toString(radix));
	}
}