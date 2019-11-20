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

package buf;
import com.cycling74.max.*;
import com.cycling74.msp.*;

/**
 * a collection of buffer utilities
 * 
 * created on Apr 12, 2004 
 * @author bbn
 * 
 * TODO support joint operations on more than one channel.  
 * ie, DC offset
 *
 */
public class Op extends MaxObject {
	
	String bufname = null;
	
	Op(Atom[] a) {
		declareInlets(new int[]{DataTypes.ALL});
		declareOutlets(new int[]{DataTypes.ALL});
		createInfoOutlet(false);
		if (a.length>0) 
			set(a[0].toString());
	}
	
	public void set(String s) {
		bufname = s;
	}
	
	public void merge(final Atom[] a) {
		MaxSystem.deferLow(new Executable() {
			public void execute() {
				long maxFrames = 0;
				int channelSum = 0;
				int[] channels = new int[a.length];
				long[] frames = new long[a.length];
				String[] name = new String[a.length];
				for (int i=0;i<a.length;i++) {
					name[i] = a[i].toString();
					channels[i] = MSPBuffer.getChannels(name[i]);
					channelSum+=channels[i];
					frames[i] = MSPBuffer.getFrames(name[i]);
					if (frames[i] > maxFrames)
						maxFrames = frames[i]; 
				}
				MSPBuffer.setFrames(bufname, channelSum, maxFrames);
				int count = 1;
				for (int i=0;i<a.length;i++) {
					for (int j=0;j<channels[i];j++) {
						float[] data = MSPBuffer.peek(name[i], j+1);
						MSPBuffer.poke(bufname, count++, data);
					}
				}
			}
		}
		);
	}
	
	public void split(final Atom[] a) {
		MaxSystem.deferLow(new Executable() {
			public void execute() {
				int channels = MSPBuffer.getChannels(bufname);
				if (a.length != channels) {
					error("buf.Op: need " +channels+ " buffer name arguments "
							+" to split "+bufname);
					return;
				}
				long chanSize = MSPBuffer.getSize(bufname)/channels;
				for (int i=0;i<channels;i++) {
					String name = a[i].toString();
					MSPBuffer.setSize(name, 1, chanSize);
					MSPBuffer.poke(name, MSPBuffer.peek(bufname, i+1));
				}
			}
		}
		);
	}
	
	public void equals(String thatbuf) {
		boolean equal = true;
		long size = MSPBuffer.getSize(bufname);
		if (size != MSPBuffer.getSize(thatbuf))
			equal = false;
		else if (MSPBuffer.getChannels(bufname) 
					!= MSPBuffer.getChannels(thatbuf))
			equal = false;
		else {
			float[] thisData = MSPBuffer.peek(bufname);
			float[] thatData = MSPBuffer.peek(thatbuf);
			int index = 0;
			while ((equal)&&(index < size)) {
				if (thisData[index] != thatData[index])
					equal = false;
				index++;
			}
			outlet(0, equal);
		}
	}
	
	public void copyFrom(final String frombuf) {
		MaxSystem.deferLow(new Executable() { 
			public void execute() { 
				long size = MSPBuffer.getSize(frombuf);
				int channels = MSPBuffer.getChannels(frombuf);
				MSPBuffer.setSize(bufname, channels, size);
				MSPBuffer.poke(bufname, MSPBuffer.peek(frombuf));
			}
		}
		);
	}
	
	public void copyInto(final String destbuf) {
		MaxSystem.deferLow(new Executable() {
			public void execute() {
				long size = MSPBuffer.getSize(bufname);
				int channels = MSPBuffer.getChannels(bufname);
				MSPBuffer.setSize(destbuf, channels, size);
				MSPBuffer.poke(destbuf, MSPBuffer.peek(bufname));
			}
		}
		);
	}
	
	public void dataFrom(String frombuf) {
		dataMove(frombuf, bufname);
	}
	public void dataInto(String tobuf) {
		dataMove(bufname, tobuf);
	}
	
	private void dataMove(String frombuf, String tobuf)
	{
		long size = Math.min(MSPBuffer.getSize(frombuf), MSPBuffer.getSize(tobuf));
		int channels = Math.min(MSPBuffer.getChannels(frombuf), MSPBuffer.getChannels(tobuf));
		for (int c=1;c<=channels;c++)
		{
			MSPBuffer.poke(tobuf, c, 0, MSPBuffer.peek(frombuf, c, 0, size));
		}
	}
	
	public void max(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		float max = Float.MIN_VALUE;
		int index = 0;
		for (int i=0;i<samps.length;i++) 
			if (samps[i] > max) {
				max = samps[i];
				index = i;
			}
		outlet(0, new Atom[] {Atom.newAtom(index), Atom.newAtom(max)});
	}

	public void min(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		float min = Float.MAX_VALUE;
		int index = 0;
		for (int i=0;i<samps.length;i++) 
			if (samps[i] < min) {
				min = samps[i];
				index = i;
			}
		outlet(0, new Atom[] {Atom.newAtom(index), Atom.newAtom(min)});
	}

	public void removeDC(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		double total = 0;
		for (int i=0;i<samps.length;i++) {
			total += samps[i];
		}
		float shift = (float)(total/(double)samps.length);
		for (int i=0;i<samps.length;i++) 
			samps[i] -= shift;
		MSPBuffer.poke(bufname, channel, samps);
	}
	
	public void normalize(int channel, float f) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		double max = Double.MIN_VALUE;
		for (int i=0;i<samps.length;i++) 
			if (Math.abs(samps[i]) > max)
				max = Math.abs(samps[i]);
		double scale = ((double)Math.abs(f))/max;
		for (int i=0;i<samps.length;i++) 
			samps[i] *= scale;
		MSPBuffer.poke(bufname, channel, samps);
	}
	
	public void multiply(int channel, float f) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		for (int i=0;i<samps.length;i++) 
			samps[i] *= f;
		MSPBuffer.poke(bufname, channel, samps);
	}
	
	public void gain(float f) {
		float factor = (float)Math.pow(10.0, f/20.);
		int chans = MSPBuffer.getChannels(bufname);
		for (int i=1;i<=chans;i++) {
			multiply(i, factor);
		}
	}
	
	public void add(int channel, float f) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		for (int i=0;i<samps.length;i++) 
			samps[i] += f;
		MSPBuffer.poke(bufname, channel, samps);
	}
	
	public void reverse(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		float[] temp = new float[samps.length];
		for (int i=0;i<samps.length;i++) 
			temp[i] = samps[samps.length-i-1];
		MSPBuffer.poke(bufname, channel, temp);
	}
	
	public void peek(int chan, long index) {
		outlet(0, MSPBuffer.peek(bufname, chan, index));
	}
	
	public void poke(int chan, long index, float f) {
		MSPBuffer.poke(bufname, chan, index, f);
	}
	
	public void pokeAll(int chan, float f) {
		float[] data = new float[(int)MSPBuffer.getSize(bufname)];
		for (int i=0;i<data.length;i++) {
			data[i] = f;
		}
		MSPBuffer.poke(bufname, chan, data);
	}
	
	public void sum(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		double total = 0;
		for (int i=0;i<samps.length;i++) {
			total += samps[i];
		}
		outlet(0, total);
	}
	
	public void stddev(int channel) {
		outlet(0, Math.sqrt(doVariance(channel)));
	}  
	
	public void variance(int channel) {
		outlet(0, doVariance(channel));
	}
	
	private double doVariance(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		double total = 0;
		for (int i=0;i<samps.length;i++) {
			total += samps[i];
		}
		double mean = total / (double)samps.length;
		total = 0;
		for (int i=0;i<samps.length;i++) {
			total += Math.pow(samps[i]-mean,2.);
		}
		return total/(double)(samps.length - 1);
	}
	
	public void average(int channel) {
		float[] samps = MSPBuffer.peek(bufname, channel);
		double total = 0;
		for (int i=0;i<samps.length;i++) {
			total += samps[i];
		}
		outlet(0, total/(double)samps.length);
	}
	
	public void mean(int channel) {
		average(channel);
	}
	
	public void getLength() {
		outlet(0, MSPBuffer.getLength(bufname));
	}
		
	public void setLength(int i, double d) {
		MSPBuffer.setLength(bufname, i, d);
	}
	
	public void getSize() {
		outlet(0, MSPBuffer.getSize(bufname));
	}
	
	public void setSize(int channels, long size) {
		MSPBuffer.setSize(bufname, channels, size);
	}
	
	public void getChannels() {
		outlet(0, MSPBuffer.getChannels(bufname));
	}

}
