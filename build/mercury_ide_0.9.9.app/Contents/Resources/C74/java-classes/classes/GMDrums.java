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

import javax.sound.midi.*;
import com.cycling74.max.*;

public class GMDrums extends MaxObject
{

    private static Synthesizer    _synth  = null;    
    private MidiChannel   _channel = null;
    private int _vce[] = null;
    private int _vel[] = null;
    private int _dur = 300;

    private static int _refcount = 0;

    public GMDrums(Atom[] args)
    {	
	int i;
	_refcount++;

  
	//_synth = (Synthesizer)MaxObject.getContext().get("__gm_drums__");
	if(_synth == null) 
	    {

		try {
			_synth = MidiSystem.getSynthesizer();
			_synth.open();
			_channel = _synth.getChannels()[9];//GM DRUM CHANNEL--MIDI CH. 10
			//MaxObject.getContext().put("__gm_drums__",_synth);
		    }
		catch (MidiUnavailableException e)
		    {
			_synth = null;
			error("Unable to open synth");
			e.printStackTrace();
		    }
	   
	    }
	else
	    {
		_channel =  _synth.getChannels()[9];//GM DRUM CHANNEL--MIDI CH. 10		
	    }
	if(args.length == 0)
	    {
		//default
		_vce    = new int[1];
		_vce[0] = 39; //handclap
		_vel    = new int[1];
		_vel[0] = 127; 
		declareInlets(new int[]{DataTypes.ALL});
	    }
	else
	    {
		int pg = 0;
		int[] inlets = new int[args.length];
		_vce  = new int[args.length];
		_vel  = new int[args.length];

		for(i = 0; i < args.length;i++)
		    {
			if(args[i].isInt() || args[i].isFloat())
			    _vce[i] = args[i].toInt();
			else
			    {
				if((pg = get_pg_from_name(args[i].getString())) != -1)
				    _vce[i] = pg;
				else{
				    post("(GMDrums) No voice named "+args[i].getString()+".Defaulting to clap for voice "+i);
				    _vce[i] = 39;
				}
			    }
		    
			inlets[i] = DataTypes.ALL;
			_vel[i] = 127;
		    }
		
		declareInlets(inlets); 
	    }

	declareOutlets(NO_OUTLETS);
	
	

    }
    
    //set velocity for this voice
    public void inlet(int vel)
    {
	_vel[getInlet()] = vel;
    }


    public void bang() {
    int mapidx = getInlet();
	//duration doesn't seem to have an effect on the drum bank. i think they are one shots.
	_channel.noteOn(_vce[mapidx],_vel[mapidx]);
	MaxSystem.scheduleDelay(new Callback(this, "noteoff", _vce[mapidx]),_dur);
    }
    
    public void gc()
    {
	System.gc();
    }
    
    public void dur(int dur)
    {
	_dur = dur;
    }

    private void noteoff(int note)
    {
	_channel.noteOff(note,0);
    }

    //change sound of this voice
    public void voice(int new_voice)
    {
	_vce[getInlet()] = new_voice;
    }

    public void voice(String voice)
    {
	int pg;
	if((pg = get_pg_from_name(voice)) != -1)
	    _vce[getInlet()] = pg;
	else
	    error("(GMDrums) no voice named "+voice);
    }

    public void loadbang()
    {
	dumpvoicenames();
    }
    public void dumpvoicenames()
    {
	String[] menuappend = new String[2];
	outlet(getInfoIdx(),"clear");
	for(int i = NAMES_BEGIN; i <= NAMES_END;i++)
	    {
		menuappend[0] = "append";
		menuappend[1] = _names[i];
		outlet(getInfoIdx(),menuappend);
	    }
   
    }
    
    // look at notify deleted!!
    // the fact that it is asychronous makes it a bad place to do stuff like this
    // since it is in a different thread it could potentially decrement the refcount
    // b4 a new obj is created by the max thread.
    protected void finalize()
    {
	
	_refcount--;
	if(_refcount == 0)
	    {
		_synth.close();
		_synth = null;
		//MaxObject.getContext().remove("__gm_drums__");
	    }
	
    }
    
    private static final int NAMES_BEGIN = 35;
    private static final int NAMES_END = 81;
    private static String[] _names = new String[128]; 
    private String get_name_from_pg(int pg)
    {
	if(pg < 0)
	    pg = 0;
	else if(pg > 127)
	    pg = 127;
	return _names[pg];
    }

    private int get_pg_from_name(String name)
    {
	name = name.toUpperCase();
	for(int i = NAMES_BEGIN; i <= NAMES_END;i++)
	    {
		if( _names[i].equals(name))
		    return i;
	    }
	return -1;
    }

    static
    {
	_names[0]  = "undef";
	_names[1]  = "undef";
	_names[2]  = "undef";
	_names[3]  = "undef";
	_names[4]  = "undef";
	_names[5]  = "undef";
	_names[6]  = "undef";
	_names[7]  = "undef";
	_names[8]  = "undef";
	_names[9]  = "undef";
	_names[10]  = "undef";
	_names[11]  = "undef";
	_names[12]  = "undef";
	_names[13]  = "undef";
	_names[14]  = "undef";
	_names[15]  = "undef";
	_names[16]  = "undef";
	_names[17]  = "undef";
	_names[18]  = "undef";
	_names[19]  = "undef";
	_names[20]  = "undef";
	_names[21]  = "undef";
	_names[22]  = "undef";
	_names[23]  = "undef";
	_names[24]  = "undef";
	_names[25]  = "undef";
	_names[26]  = "undef";
	_names[27]  = "undef";
	_names[28]  = "undef";
	_names[29]  = "undef";
	_names[30]  = "undef";
	_names[31]  = "undef";
	_names[32]  = "undef";
	_names[33]  = "undef";
	_names[34]  = "undef";
	_names[35] = "ACOUSTIC_BASS_DRUM"; 
	_names[36] = "BASS_DRUM";              
	_names[37] = "SIDE_STICK";            
	_names[38] = "ACOUSTIC_SNARE";
	_names[39] = "HAND_CLAP";
	_names[40] = "ELECTRIC_SNARE";
	_names[41] = "LOW_FLOOR_TOM";
	_names[42] = "CLOSED_HI_HAT";
	_names[43] = "HIGH_FLOOR_TOM";
	_names[44] = "PEDAL_HI_HAT";  
	_names[45] = "LOW_TOM";       
        _names[46] = "OPEN_HI_HAT";   
	_names[47] = "LOW_MID_TOM";   
	_names[48] = "HI_MID_TOM";    
	_names[49] = "CRASH_CYMBAL_1";
	_names[50] = "HIGH_TOM";      
	_names[51] = "RIDE_CYMBAL_1"; 
	_names[52] = "CHINESE_CYMBAL";
	_names[53] = "RIDE_BELL";     
	_names[54] = "TAMBOURINE";    
	_names[55] = "SPLASH_CYMBAL"; 
	_names[56] = "COWBELL";       
	_names[57] = "CRASH_CYMBAL_2";
	_names[58] = "VIBRASLAP";     
	_names[59] = "RIDE_CYMBAL_2"; 
	_names[60] = "HI_BONGO";      
	_names[61] = "LOW_BONGO";     
	_names[62] = "MUTE_HI_CONGA"; 
	_names[63] = "OPEN_HI_CONGA";  
	_names[64] = "LOW_CONGA";      
	_names[65] = "HIGH_TIMBALE";    
	_names[66] = "LOW_TIMBALE";     
	_names[67] = "HIGH_AGOGO";      
	_names[68] = "LOW_AGOGO";       
	_names[69] = "CABASA";          
	_names[70] = "MARACAS";         
	_names[71] = "SHORT_WHISTLE";   
	_names[72] = "LONG_WHISTLE";    
	_names[73] = "SHORT_GUIRO";     
	_names[74] = "LONG_GUIRO";      
	_names[75] = "CLAVES";          
	_names[76] = "HI_WOOD_BLOCK";   
	_names[77] = "LOW_WOOD_BLOCK";  
	_names[78] = "MUTE_CUICA";      
	_names[79] = "OPEN_CUICA";      
	_names[80] = "MUTE_TRIANGLE";   
	_names[81] = "OPEN_TRIANGLE";   
	_names[82]  = "undef";
	_names[83]  = "undef";
	_names[84]  = "undef";
	_names[85]  = "undef";
	_names[86]  = "undef";
	_names[87]  = "undef";
	_names[88]  = "undef";
	_names[89]  = "undef";
	_names[90]  = "undef";
	_names[91]  = "undef";
	_names[92]  = "undef";
	_names[93]  = "undef";
	_names[94]  = "undef";
	_names[95]  = "undef";
	_names[96]  = "undef";
	_names[97]  = "undef";
	_names[98]  = "undef";
	_names[99]  = "undef";
	_names[100]  = "undef";
	_names[101]  = "undef";
	_names[102]  = "undef";
	_names[103]  = "undef";
	_names[104]  = "undef";
	_names[105]  = "undef";
	_names[106]  = "undef";
	_names[107]  = "undef";
	_names[108]  = "undef";
	_names[109]  = "undef";
	_names[110]  = "undef";
	_names[111]  = "undef";
	_names[112]  = "undef";
	_names[113]  = "undef";
	_names[114]  = "undef";
	_names[115]  = "undef";
	_names[116]  = "undef";
	_names[117]  = "undef";
	_names[118]  = "undef";
	_names[119]  = "undef";
	_names[120]  = "undef";
	_names[121]  = "undef";
	_names[122]  = "undef";
	_names[123]  = "undef";
	_names[124]  = "undef";
	_names[125]  = "undef";
	_names[126]  = "undef";
	_names[127]  = "undef";

    }

}
