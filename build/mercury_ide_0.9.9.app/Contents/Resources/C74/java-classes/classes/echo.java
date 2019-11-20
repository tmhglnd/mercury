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
import java.util.*;
import java.lang.Math;
/**
 * 
 * echo - super midi echo deluxe
 * 
 * created Mar-2004
 * @author bbn
 */
public class echo extends MaxObject {

	Random r = new Random();

	private class note {
	
		private int taps=0, pitch, channel;
		private float velocity;
		private MaxClock clockNote;
		private MaxClock clockOff;
		private List times = Collections.synchronizedList(new ArrayList());
		
		public note(int p, int v, int c) {
			outlet(3, ++active);
			pitch = p;
			velocity = v;
			channel = c;
			clockNote = new MaxClock(new Executable() { 
				public void execute() { noteTick(); }});
			decideNote();
		}	
		
		public void decideNote() {
			double thisPeriod = period * Math.pow(periodfactor, taps)
									+ perioddelta * taps 
									+ r.nextGaussian() * stddev;
			if ((thisPeriod > 0.0)&&
				(taps < maxtaps) && 
				(r.nextFloat() <= probability)) 
			{
				synchronized (times) {
					times.add(new Double(thisPeriod));
				}
				clockNote.delay(thisPeriod);
				taps++;
			} else {
				clockNote.release();
			}
		}
		
		public void noteTick() {
			velocity *= feedback;
			if (objectStillExists && (velocity > 1.)) {
				if (velocity > 127.0f)
					velocity = 127.0f;
				outlet(2, channel);
				outlet(1, (int)velocity);
				outlet(0, pitch);
				decideNote();
			} else {
				clockNote.release();
			}
		}
		
		public void decideOff() {
			if ((!times.isEmpty())&&(objectStillExists)) {
				clockOff.delay(((Double)times.get(0)).doubleValue());
				synchronized(times) {
					times.remove(0);
				}
			} else {
				if (objectStillExists)
					outlet(3, --active);
				clockOff.release();
			}
		}
		
		public void offTick() {
			if (objectStillExists) {
				outlet(2, channel);
				outlet(1, 0);
				outlet(0, pitch);
				decideOff();
			} else {
				clockOff.release();
			}
		}
		
		public int getPitch() {
			return pitch;
		}
		
		public void setOff() {
			clockOff = new MaxClock(new Executable() { 
				public void execute() { offTick(); }});
			decideOff();
		}
		
	}

	private int active = 0;
	private int velocity = 0;
	private int channel = 1;
	private int maxtaps = Integer.MAX_VALUE;
	private double period = 500.0;
	private double periodfactor = 1.0;
	private double perioddelta = 0.0;
	private double stddev = 0.0;
	private float feedback = 0.5f;
	private float probability = 1.0f;
	private List notes = Collections.synchronizedList(new ArrayList());
	private boolean objectStillExists = true;

	public echo() {
		declareInlets(new int[]{DataTypes.ALL, DataTypes.ALL, DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.INT, DataTypes.INT, 
									DataTypes.INT, DataTypes.INT});
		declareAttribute("maxtaps");
		declareAttribute("period",null,"setPeriod");
		declareAttribute("periodfactor");
		declareAttribute("perioddelta");
		declareAttribute("feedback");
		declareAttribute("probability");
		declareAttribute("stddev");
	}
	
	public void setPeriod(float f) {
		period = Math.abs(f);
	}
	
	public void inlet(int i) {
		if (getInlet() == 1) {
			velocity = i;
		} else if (getInlet() == 0) {
			if (velocity>0) 
				newNote(i);
			else
				newOff(i);
		} else if (getInlet() == 2) {
			channel = i;
		}
	}
	
	private void newNote(int i) {
		synchronized (notes) {
			note n = new note(i, velocity, channel);
			notes.add(n);
		}
	}
	
	private void newOff(int i) {
		boolean found = false;
		note n=null;
		synchronized (notes) {
			ListIterator li = notes.listIterator(0);
			while ((li.hasNext())&&(!found)) {
				n = (note)li.next();
				if (n.getPitch() == i)
					found = true;
			}
			if (found) {
				n.setOff();
				li.remove();
			}
		}
	}
	
	protected void notifyDeleted() {
		objectStillExists = false;
	}
}