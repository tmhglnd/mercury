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

/*
 * XmlParse
 * XML parser for Max
 * by Timothy Place
 * Copyright © 2011 Cycling '74
 * 
 * compile with javac -classpath /Applications/Max6/Cycling\ \'74/java/lib/max.jar XmlParse.java 
 */

import com.cycling74.max.*;
import java.io.*;
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.xml.sax.helpers.*;


public class XmlParse extends MaxObject {


	// PRIVATE MEMBERS
	private String filename;


	// CONSTRUCTOR
	XmlParse()
	{
		// Max-Specific Class Setup
		declareInlets(new int[] {DataTypes.ALL});
		declareOutlets(new int[] {DataTypes.ALL, DataTypes.ALL, DataTypes.ALL, DataTypes.ALL});
		createInfoOutlet(true);
		
		declareAttribute("filename");
	}


	// METHOD: open a file
	public void open(Atom[] args)
	{
		if(args.length > 0){
			String path = Atom.toOneString(args);
			String maxpath = MaxSystem.locateFile(path);
			filename = MaxSystem.maxPathToNativePath(maxpath);
		}
		else{
			String path = MaxSystem.openDialog("Choose an XML file to parse");
			//if(path.length() > 0){
			if(path != null){
			String maxpath = MaxSystem.locateFile(path);
			filename = MaxSystem.maxPathToNativePath(maxpath);
			}
		}
	}


	// METHOD: process the XML file
	public void process() throws SAXException, IOException, ParserConfigurationException
	{
		// Create a parser factory and use it to create a parser
		SAXParserFactory parserFactory = SAXParserFactory.newInstance();
		SAXParser parser = parserFactory.newSAXParser();
		
		// Instantiate a DefaultHandler subclass to do our counting for us
		CountHandler handler = new CountHandler();
		
		// Start the parser. It reads the file and calls the methods of the handler.
		parser.parse(new File(filename), handler);
		
		/*
		// When we are done, we report the results stored by the handler object.
		System.out.println(filename + " contains " + handler.numElements + 
			" elements and " + handler.numChars + " other Characters");
		*/

		outlet(4, "done");
	}


	/*	This inner class extends DefaultHandler to count elements and text in
	 *	the XML file and saves the results in public fields.  There are many
	 *	other DefaultHandler methods we could override, but for now, we only need these.
	 */
	public class CountHandler extends DefaultHandler{
		
		public int numElements = 0;
		public int numChars = 0;
		
		// This method is invoked when the parser encounters an opening tag of any XML element. 
		public void startElement(String uri, String localname, String qname, Attributes attributes)
		{
			int i;
			Atom[] out;
			
			out = new Atom[2];
			
			out[0] = Atom.newAtom(1);
			out[1] = Atom.newAtom(qname);
			
			outlet(0, numElements++);
			outlet(1, out);
			//outlet(1, Atom.newAtom(1), Atom.parse(qname));
			for(i=0; i<attributes.getLength(); i++){
				outlet(2, attributes.getQName(i), attributes.getValue(i));
			}
		}
		
		
		// This method is called for any plain text within an element (CDATA)
		public void characters(char[] text, int start, int length)
		{
			String cdata = new String(text, start, length);
			String cdata_nowhite = cdata.trim();
			numChars += length;
			
			if(cdata_nowhite.length() > 0){
				outlet(3, cdata_nowhite);
			}
		}
		
		
		// This method is invoked when the parser encounters a closing tag for an XML element.
		public void endElement(String uri, String localname, String qname)
		{
			Atom[] out;
			out = new Atom[2];
			
			out[0] = Atom.newAtom(0);
			//out[1] = Atom.parse(qname);
			out[1] = Atom.newAtom(qname);
			//outlet(1, Atom.newAtom(0), Atom.parse(qname));
			outlet(1, out);
		}
			
	}

}
