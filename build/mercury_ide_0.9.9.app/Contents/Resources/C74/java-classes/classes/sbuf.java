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

public class sbuf extends MaxObject {

	private StringBuffer sb;
	private boolean autoOutput = true;
	
	public sbuf(Atom[] args) {
		declareAttribute("autoOutput");
		declareOutlets(new int[]{DataTypes.MESSAGE, DataTypes.ALL});
		createInfoOutlet(false);
		if (args.length == 0) {
			sb = new StringBuffer();
		} else if (args.length > 0) {
			set(args);
		}
	}
	
	public void set(Atom[] args) {
		sb = new StringBuffer(Atom.toOneString(args));
		if (autoOutput) bang();
	}
	
	public void bang() {
		outlet(0, sb.toString());
	}
	
	public void append(Atom[] args) {
		sb.append(Atom.toOneString(args));
		if (autoOutput) bang();
	}
	
	public void charAt(int index) {
		try {
			outlet(1, new String(new char[] {sb.charAt(index)}));
		} catch (StringIndexOutOfBoundsException se) {
			error("sbuf: index outside sbuf range");
		}
	}
	
	public void delete(int start, int end) {
		try {
			sb.delete(start, end);
			if (autoOutput) bang();
		} catch (StringIndexOutOfBoundsException se) {
			error("sbuf: index outside sbuf range");
		}

	}
	
	public void deleteCharAt(int index) {
		try {
			sb.deleteCharAt(index);
			if (autoOutput) bang();
		} catch (StringIndexOutOfBoundsException se) {
			error("sbuf: index outside sbuf range");
		}
	}
	
	public void indexOf(Atom[] args) {
		outlet(1, sb.indexOf(Atom.toOneString(args)));
	}
	
	public void indexOfAfter(Atom[] args) {
		if (args[0].isInt()) {
			outlet(1, sb.indexOf(Atom.toOneString(Atom.removeFirst(args)), args[0].getInt())); 
		} else {
			error("sbuf: first argument for the indexOfAfter message must be an integer.");
		}
	}
	
	public void insert(Atom[] args) {
		if (args[0].isInt()) {
			try {
				sb.insert(args[0].getInt(), Atom.toOneString(Atom.removeFirst(args)));
				if (autoOutput) bang();
			} catch (StringIndexOutOfBoundsException se) {
				error("sbuf: index outside sbuf range");
			}
		} else {
			error("sbuf: first argument for the insert message must be an integer.");
		}
	}
	
	public void lastIndexOf(Atom[] args) {
		outlet(1, sb.lastIndexOf(Atom.toOneString(args)));
	}
	
	public void length() {
		outlet(1, sb.length());
	}
	
	public void replace(Atom[] args) {
		if (args.length < 2) {
			error("sbuf: the replace message requires at least 3 arguments.");
		} else if ((!args[0].isInt())||(!args[1].isInt())) {
			error("sbuf: the first two arguments for the replace message must be integers.");
		} else {
			try {
				sb.replace(args[0].getInt(), args[1].getInt(), Atom.toOneString(Atom.removeFirst(args,2)));
				if (autoOutput) bang();
			} catch (StringIndexOutOfBoundsException se) {
				error("sbuf: index outside sbuf range");
			}

		}
	}
	
	public void reverse() {
		sb.reverse();
		if (autoOutput) bang();
	}
	
	public void setCharAt(Atom args[]) {
		if (args.length < 2) {
			error("sbuf: the setCharAt message requires at least 2 arguments.");
		} else if (!args[0].isInt()) {
			error("sbuf: the first argument for the setCharAt message must be an integer.");
		} else if (args[1].toString().length() > 1) {
			error("sbuf: the second argument for the setCharAt message must be a single character.");
		} else {
			try {
				sb.setCharAt(args[0].getInt(), args[1].toString().charAt(0));
				if (autoOutput) bang();
			} catch (StringIndexOutOfBoundsException se) {
				error("sbuf: index outside sbuf range");
			}
		}
	}
	
	public void substring(int start, int end) {
		try {
			outlet(1, sb.substring(start,end));
		} catch (StringIndexOutOfBoundsException se) {
			error("sbuf: index outside sbuf range");
		}
	}
	
	public void clear() {
		sb = new StringBuffer();
		if (autoOutput) bang();
	}
	
	public void startsWith(Atom[] args) {
		outlet(1, sb.toString().startsWith(Atom.toOneString(args)));
	}
	public void endsWith(Atom[] args) {
		outlet(1, sb.toString().endsWith(Atom.toOneString(args)));
	}
	
	public void equals(Atom[] args) {
		outlet(1, sb.toString().equals(Atom.toOneString(args)));
	}
	
	public void equalsIgnoreCase(Atom[] args) {
		outlet(1, sb.toString().equalsIgnoreCase(Atom.toOneString(args)));
	}
	
	public void matches(Atom[] args) {
		outlet(1, sb.toString().matches(Atom.toOneString(args)));
	}
	
	public void split(Atom[] args) {
		String[] outs = sb.toString().split(Atom.toOneString(args));
		for (int i=0;i<outs.length;i++) {
			outlet(1, outs[i]);
		}
	}
	
	public void toLowerCase() {
		sb = new StringBuffer(sb.toString().toLowerCase());
		if (autoOutput) bang();
	}
	
	public void toUpperCase() {
		sb = new StringBuffer(sb.toString().toUpperCase());
		if (autoOutput) bang();
	}
	
	public void trim() {
		sb = new StringBuffer(sb.toString().trim());
		if (autoOutput) bang();
	}
}