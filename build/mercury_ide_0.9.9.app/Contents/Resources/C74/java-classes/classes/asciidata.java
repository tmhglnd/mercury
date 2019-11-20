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
import java.io.*;
// Created on 27-May-2005

/**
 * @author bbn
 *
 * iteratively outputs comma-delimited ascii data
 */
public class asciidata extends MaxObject {
		
	public void dump(String filename) {
		try {
			BufferedReader in = new BufferedReader(new FileReader(filename));
			StreamTokenizer st = new StreamTokenizer(in);
			int found = StreamTokenizer.TT_NUMBER;
			while (found != StreamTokenizer.TT_EOF)
			{
				found = st.nextToken();
				if (found == StreamTokenizer.TT_NUMBER)
				{
					double d = (double)st.nval;
					outlet(0, d);
				}
			}
		}
		catch (FileNotFoundException e)
		{
			error("asciidata: file not found");
		}
		catch (IOException e)
		{
			error("asciidata: IOException");
		}
	}
}
