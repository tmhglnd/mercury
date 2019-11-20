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
import java.io.CharArrayWriter;

public class MorseGen extends MaxObject
{
    private static final char DOT  = '.';
    private static final char DASH = '-';
    private static final char REST = '#';


    private static final char[] A = new char[]{ DOT, DASH};
    private static final char[] B = new char[]{ DASH, DOT, DOT, DOT};
    private static final char[] C = new char[]{ DASH, DOT, DASH, DOT};
    private static final char[] D = new char[]{ DASH, DOT, DOT};
    private static final char[] E = new char[]{ DOT };
    private static final char[] F = new char[]{ DOT, DOT, DASH, DOT};
    private static final char[] G = new char[]{ DASH, DASH, DOT};
    private static final char[] H = new char[]{ DOT, DOT, DOT, DOT};
    private static final char[] I = new char[]{ DOT, DOT };
    private static final char[] J = new char[]{ DOT, DASH, DASH, DASH, DASH};
    private static final char[] K = new char[]{ DASH, DOT, DASH};
    private static final char[] L = new char[]{ DOT, DASH, DOT, DOT};
    private static final char[] M = new char[]{ DASH, DASH};
    private static final char[] N = new char[]{ DASH, DOT};
    private static final char[] O = new char[]{ DASH, DASH, DASH};
    private static final char[] P = new char[]{ DOT, DASH, DASH, DOT};
    private static final char[] Q = new char[]{ DASH, DASH, DOT, DASH};
    private static final char[] R = new char[]{ DOT, DASH, DOT};
    private static final char[] S = new char[]{ DOT, DOT, DOT};
    private static final char[] T = new char[]{ DASH};
    private static final char[] U = new char[]{ DOT, DOT, DASH};
    private static final char[] V = new char[]{ DOT, DOT, DOT, DASH};
    private static final char[] W = new char[]{ DOT, DASH, DASH};
    private static final char[] X = new char[]{ DASH, DOT, DOT, DASH};
    private static final char[] Y = new char[]{ DASH,DOT, DASH, DASH};
    private static final char[] Z = new char[]{ DASH, DASH};
   

    private static final char[] ZERO  = new char[]{ DASH, DASH, DASH, DASH, DASH};
    private static final char[] ONE   = new char[]{ DOT, DASH, DASH, DASH};
    private static final char[] TWO   = new char[]{ DOT, DOT, DASH, DASH, DASH};
    private static final char[] THREE = new char[]{ DOT, DOT, DOT, DASH, DASH};
    private static final char[] FOUR  = new char[]{ DOT, DOT, DOT, DOT, DASH };
    private static final char[] FIVE  = new char[]{ DOT, DOT, DOT, DOT, DOT};
    private static final char[] SIX   = new char[]{ DASH, DOT, DOT, DOT, DOT};
    private static final char[] SEVEN = new char[]{ DASH, DASH, DOT, DOT, DOT};
    private static final char[] EIGHT = new char[]{ DASH, DASH, DASH, DOT, DOT };
    private static final char[] NINE  = new char[]{ DASH, DASH,DASH, DOT };

    private static final char[][] LETTERS  = new char[][]{A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};
    private static final char[][] NUMBERS  = new char[][]{ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE};
    private static final char[]   PERIOD   = new char[]{DOT,DASH,DOT,DASH,DOT,DASH};
    private static final char[]   COMMA    = new char[]{DASH,DASH,DOT,DOT,DASH,DASH};
    private static final char[]   COLON    = new char[]{DASH,DASH,DASH,DOT,DOT,DOT};
    private static final char[]   QUESTION_MARK    = new char[]{DOT,DOT,DASH,DASH,DOT,DOT};
    private static final char[]   APOSTROPHE    = new char[]{DOT,DASH,DASH,DASH,DASH,DOT};
    private static final char[]   HYPHEN    = new char[]{DASH,DOT,DOT,DOT,DOT,DASH};
    private static final char[]   FRACTION_BAR    = new char[]{DASH,DOT,DOT,DASH,DOT};
    private static final char[]   PARENTHESIS    = new char[]{DASH,DOT,DASH,DASH,DOT, DASH};
    private static final char[]   QUOTE    = new char[]{DOT,DASH,DOT,DOT,DASH, DOT};
    private static final char[]   AT_SIGN    = new char[]{DOT,DASH,DASH,DOT,DASH, DOT};
    private static final char[]   EQUALS    = new char[]{DASH,DOT,DOT,DOT,DASH};
    

    private static final char   LETTER_BREAK    = ' ';
    private static final char   WORD_BREAK      = '/';


    //Attributes
    double unit_ms = 20;
    char[] text             = null;
    boolean loop            = false;

    /////
    private char[] _morse_stream    = null;
    private char[] _morse_chars    = null;
    private int _cur_idx    = 0;
    private MaxClock _up    = null;
    private MaxClock _timer = null;


    public MorseGen(Atom[] args)
    {
	declareInlets(new int[]{DataTypes.ALL});
	declareOutlets(new int[]{DataTypes.ALL,DataTypes.ALL, DataTypes.ALL, DataTypes.ALL});
	declareAttribute("unit_ms");
	declareAttribute("text","getText","setText");
	declareAttribute("loop");

	_up     = new MaxClock(new Executable()
	    {
		public void execute()
		{
		    _open_gate();
		}
	    });
	_timer   = new MaxClock(new Executable()
	    {
		public void execute()
		{
		    _tick();
		}
		
	    });
    }
    
    private void _tick()
    {

	if(_cur_idx >= _morse_stream.length)//end of stream
	    {
		outletBang(3);
		_cur_idx = 0;
		if(loop){
		    _timer.delay(0);
		    return;
		}
		else{
		    _timer.unset();
		    return;
		}
	    }

	char c = _morse_stream[_cur_idx];
	String cd =String.valueOf( _morse_chars[_cur_idx]);
	switch(c)
	    {
	    case(DOT):
		outletBang(0);
		outlet(2,cd);
		_up.delay( unit_ms * 1);
		_timer.delay(unit_ms * 2);
		break;
	    case(DASH):
		outletBang(0);
		outlet(2,cd);
		_up.delay( unit_ms * 3);
		_timer.delay(unit_ms * 4);
		break;
	    case(LETTER_BREAK):
		_timer.delay( unit_ms * 2);
		break;
	    case(WORD_BREAK):
		outlet(2,cd);
		_timer.delay(unit_ms * 6);
		break;
	    }
	_cur_idx++;

    }


    public void stop()
    {
	_cur_idx = 0;
	_timer.unset();
    }
    public void bang()
    {
	if(_morse_stream == null)
	    error("No text has been set to translate. Use text message to set.");
	else
	    _timer.delay(0);
    }

    private void _open_gate()
    {
	outletBang(1);
    }


    public void setText(Atom[] args)
    {
	

	StringBuffer sb = new StringBuffer();
	for(int i = 0; i < args.length;i++)
	    {
		if(args[i].isString())
		    sb.append(args[i].getString());
		else if(args[i].isInt())
		    sb.append(args[i].getInt());
		else if(args[i].isFloat())
		    sb.append(args[i].getFloat());
		    
		sb.append(" ");//word break
	    }
	
	text = new char[sb.length()];
	sb.getChars(0,sb.length(),text,0); 
	//now fill in morse_stream
	CharArrayWriter caw = new CharArrayWriter(256);
	CharArrayWriter caw2 = new CharArrayWriter(256);
	char c;
	char[] morse = null;
	for(int i = 0; i < text.length;i++)
	    {
		c = Character.toUpperCase(text[i]);
		if(Character.isLetter(c))
		    morse = LETTERS[(byte)c - 65];
		else if(Character.isDigit(c))
		    morse = NUMBERS[(byte)c - 48];
		else if(c == '.')
		    morse = PERIOD;
		else if(c == ',')
		    morse = COMMA;
		else if(c == ':')
		    morse = COLON;
		else if(c == '?')
		    morse = QUESTION_MARK;
		else if(c == '\'')
		    morse = APOSTROPHE;
		else if(c == '-')
		    morse = HYPHEN;
		else if(c == '/')
		    morse = FRACTION_BAR;
		else if(c == '(' || c == ')')
		    morse = PARENTHESIS;
		else if (c == '"')
		    morse = QUOTE;
		else if(c == '@')
		    morse = AT_SIGN;
		else if(c == '=')
		    morse = EQUALS;
		else if(Character.isSpaceChar(c))
		    {
			if(i == text.length - 1)
			    {
				continue;
			    }
			try{
			    caw.write(WORD_BREAK);
			    caw2.write(' ');
			}catch(Exception e)
			    {
				e.printStackTrace();
			    }
			continue;
		    }
	
		else{
		    System.out.println("char "+String.valueOf(c)+" is currently unsupported.");
		    continue;
		}
		for(int q = 0; q < morse.length;q++)
		    {
			try{
			    caw.write(morse[q]);
			    caw2.write(c);
			}catch(Exception e)
			    {
				e.printStackTrace();
			    }
		    }
		
		try{
		    caw.write(LETTER_BREAK);
		    caw2.write(c);

		}catch(Exception e)
		    {
			e.printStackTrace();
		    }
		}
	_morse_stream = caw.toCharArray();
	_morse_chars  = caw2.toCharArray();
	_cur_idx = 0;
    }

    public Atom[] getText()
    {
        String s = new String(text);
	return new Atom[]{Atom.newAtom(s)};
    }
    

    public void dumpMorseStream()
    {
	outlet(getInfoIdx(),new String(_morse_stream));
    }


    public void list(Atom[] list)
    {
	;
   }
    
    protected void notifyDeleted() {
    	_up.release();
    	_timer.release();
    }
}
