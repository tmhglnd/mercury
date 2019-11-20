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

//there is some weird stuff in OSX javac (i.e. bug?) with regards to innerclasses and classpath
//thus  the seemingly unneccesary  explicit import. -tml
import com.cycling74.max.MXJClassLoader;
import com.cycling74.max.*;
import com.cycling74.mxjedit.*;

import javax.swing.*;
import java.io.*;
import java.util.jar.JarFile;
import java.util.jar.JarEntry;
import java.net.URLDecoder;
import java.util.Enumeration;

public class quickie extends MaxObject
{
    private MXJEditor _editor     = null;
    private String    _filename  = null;
	private String    _template   = null;
	private static final String SEP = System.getProperty("file.separator");

	private Callback saveCallback = new Callback(this, "savebang");
	int mode = 0;
	
	public quickie()
	{
		bail("Must provide a filename as the first argument e.g. [mxj quickie myclass]");
	}

	public quickie(String filename)
	{
		this(filename,"MAXOBJ_PROTO");	
	}
    public quickie(String filename, String template)
    {
    	declareIO(1,1);
		_filename = filename;
		_template  = template;

		if(MaxSystem.locateFile(template) == null)
			post("(quickie) Unable to find template: "+_template+" defaulting to built in template");	
	}
    
    private Class _get_class(String classname)
    {
		MXJClassLoader cl =  MXJClassLoader.getInstance();
        return cl.loadClazz(_filename, true, false);
    }
    
    private int guessMode(String filename)
    {
    	int result = MXJEditor.MODE_JAVA;
   		if (filename.endsWith(".java"))
   			result = MXJEditor.MODE_JAVA;
   		else if (filename.endsWith("jxs"))
   			result = MXJEditor.MODE_GLSL;
   		else if (filename.endsWith("js"))
   			result = MXJEditor.MODE_JAVASCRIPT;
    	return result;
    }
    
    public void bang()
    {
		_flash_watch = WATCHME;
		_flash_me();
		try{
		if(_editor == null)
	   	 {
			if(_filename != null)
		    {
				mode = guessMode(_filename);
				Class c2=null;
				if (mode == MXJEditor.MODE_JAVA)
					c2 = _get_class(_filename);
				final Class c = c2;
				SwingUtilities.invokeLater
			    (
			    new Runnable()
			    {
			    	public void run()
					{
			    		if (mode==MXJEditor.MODE_JAVA)
					 	{
							try
							{
								if(c != null)
								{					     
									Object[] ret = _get_source(c);
									File f = (File)ret[0];
									String contents = (String)ret[1];
									int stat = ((Integer)ret[2]).intValue();	
									if(stat == 0){
										_flash_watch = null;
										return;
									}
									_editor = new MXJEditor();	
									switch(stat)
									{
						      			case 1:
						      			case 2:
						      				_editor.setBuffer(contents);
						      				_editor.setCurrentFile(f);
						      				_editor.setMode(MXJEditor.MODE_JAVA);
						      				break;
						      			case 3:
						      			case 4:
						      				_editor.setBuffer(contents);
						      				_editor.setCurrentFile(f);
						      				_editor.setEditable(false);
						      				_editor.setMode(MXJEditor.MODE_JAVA);
						      				break;
									}
								}
								else//we couldn't find the class on disk
								{
									//look for uncompiled source in classpath--for JKC from tml
									if(find_source_in_classpath())
									{
										_flash_watch = null;	
										return;
									}
								    String p = determine_package();
								    String cname = _filename;
								    String template = null;
								    String quickie_proto = MaxSystem.locateFile(_template);
							    
								    if(quickie_proto != null)
							 		{
									    try{
										StringBuffer sb = new StringBuffer(1024);
										BufferedReader br = new BufferedReader(new FileReader(quickie_proto));
										String s = null;
										
											if(p != null)
											    {
												cname = cname.substring(cname.lastIndexOf('.')+1);
												sb.append("package "+p+";\n\n");
											    }
								 			while((s = br.readLine()) != null)
											    sb.append(s.replaceAll("_PROTO_",cname)+"\n");
								 			
											template = sb.toString();
									    }catch(FileNotFoundException fnfe){}
									    catch(IOException ioe){}
									}
								    else
									{
									    if(p != null)
										cname = cname.substring(cname.lastIndexOf('.')+1);
									    
									    template = TEMPLATE.replaceAll("_PROTO_",cname);
									    
											if(p != null)
											    template = "package "+p+";\n\n"+template;	
									}
							    
								    _editor = new MXJEditor();
								    _editor.setCurrentFile(new File(get_default_save_location()));		       
								    _editor.setBuffer(template);
								    _editor.setMode(MXJEditor.MODE_JAVA);
							    
							    }
								_editor.setVisible(true);	
								_flash_watch = null;
							} 
							catch(Exception e)
							{
								e.printStackTrace();
								error("(quickie) unable to open source for "+_filename);	
								_flash_watch = null;
							}	
					 	}
			    		else if (mode == MXJEditor.MODE_GLSL)
			    		{
			    			try
							{
								String fileLocation=null;
								String contents = null;
								if (_filename != null)
								{
									fileLocation = MaxSystem.locateFile(_filename);
									if (fileLocation != null)
									{
										try
										{
											StringBuffer sb = new StringBuffer(1024);
											BufferedReader br = new BufferedReader(new FileReader(fileLocation));
											String s = null;
											while((s = br.readLine()) != null)
												sb.append(s+"\n");
											//    sb.append(s.replaceAll("_PROTO_",cname)+"\n");
											//TODO implement automatic replacement of shader name in prototype file
											contents = sb.toString();
									    } catch(FileNotFoundException fnfe) {
									    } catch(IOException ioe) {
									    }
									}
								}
								
								_editor = new MXJEditor(saveCallback);
								if (fileLocation != null)
								{
									_editor.setCurrentFile(new File(fileLocation));
									_editor.setBuffer(contents);
								}
								_editor.setMode(MXJEditor.MODE_GLSL);	
							    
								_editor.setVisible(true);	
								_flash_watch = null;
							} catch(Exception e) {
								e.printStackTrace();
								error("(quickie) unable to open source for "+_filename);	
								_flash_watch = null;
							}
			    		}
				 	}
			     });
		    }	    
	    }
	else
	    {
		if(!_editor.isVisible())
			_editor.setVisible(true);
		_editor.toFront();
		_flash_watch = null;	  
	  }
	}catch(Exception e)
	{
		_flash_watch = null;
	}
   }
    
    private void savebang() 
    {
    	outletBang(0);
    }
    
	private String determine_package()
	{
	
		String cname = _filename;
		int last_dot = cname.lastIndexOf('.');

		if(last_dot != -1)
			return  cname.substring(0,last_dot);
		else
			return null;

	}
	
	private boolean find_source_in_classpath()
	{
		String file_path  = _filename.replaceAll("\\.",SEP);
		String[] classpath = MaxSystem.getClassPath();
		String pot_path = null;
		for(int i = 0; i < classpath.length;i++)
		{
			if(classpath[i].endsWith(".jar"))
				continue;
			pot_path = classpath[i]+file_path+".java";
			File f = new File(pot_path);
			//post("searching "+classpath[i]+" for "+pot_path);
			if(f.exists())
			{
				StringBuffer sb = new StringBuffer(1024);
				try{	
					BufferedReader br = new BufferedReader(new FileReader(pot_path));
					String s = null;
					while((s = br.readLine()) != null)
						sb.append(s+"\n");
					}catch(FileNotFoundException fnfe){fnfe.printStackTrace();}
					catch(IOException ioe){ioe.printStackTrace();}
						
				_editor = new MXJEditor();
				_editor.setBuffer(sb.toString());
				_editor.setCurrentFile(f);		       
				_editor.setMode(MXJEditor.MODE_JAVA);
				_editor.setVisible(true);	
				return true;
			}			


		}
		return false;

	}

	public void dblclick()
    {
		bang();
    }

	public void listtemplates()
	{
		String s = MaxSystem.locateFile("MAXOBJ_PROTO");
		if(s == null)
			return;
		else
			s = s.substring(0,s.lastIndexOf(SEP) + 1);
		
		File f = new File(s);
		if(!f.exists() || !f.isDirectory())
			return;
		File[] templates = f.listFiles();
		for(int i = 0; i < templates.length;i++)
		{
			if(templates[i].isDirectory())
				continue;
			else{
				post(templates[i].getName());	
				outlet(getInfoIdx(),templates[i].getName());
			}
		}
		 
	}

	private Object _flash_watch = null;
	private final Object WATCHME = new Object();
	private synchronized void _flash_me()
	{
		/* no longer desirable in Max 5 -jkc
		final MaxBox b = this.getMaxBox();
		Thread t = new Thread(new Runnable(){
			public void run()
			{
				final int cci = b.getColorIndex();
				while(_flash_watch != null)
				{
					MaxSystem.deferLow(new Executable(){
						public void execute()
						{ 
							b.setColorIndex(b.getColorIndex() + 10);
						}
					});	
					try{
						Thread.sleep(75);
					}catch(Exception e){}
				}

					MaxSystem.deferLow(new Executable(){
						public void execute()
						{
							b.setColorIndex(cci);
						}
					});	

			}		
		});
		t.start();
		*/
	}	

    private String get_default_save_location()
	{

	    //we are using default build root in mxj preferences now
	    /*	    String jarpath = MaxSystem.locateFile("max.jar");
	    int    idx     = jarpath.indexOf("max.jar");
	    int    idx2    = jarpath.lastIndexOf(SEP,idx - 2);*/

		//this is to turn a package declaration in to a path. so
		//one could do [mxj quickie foo.test] and test would be in package foo.
	    String cname = _filename.replaceAll("\\.",SEP);
	    //  String save_loc = jarpath.substring(0,idx2)+SEP+"classes"+SEP+cname+".java";
	    String save_loc = MXJPreferences.getMXJCompilerBuildRoot()+SEP+SEP+cname+".java";


	    return save_loc;
	}

	protected void notifyDeleted()
	{
		SwingUtilities.invokeLater(new Runnable()
			{
	
				public void run()
				{

					if(_editor != null)
					{
						_editor.setVisible(false);
						_editor.dispose();
					}
				}
			});
	}
    //returns File reftofile(may or may not exist), String contents, Integer status 
    //status (0 = failure, 1= from src on disk, 2= decompiled from class on disk, 3 = from src inside jar, 4 = decompiled from class inside jar) 
    private Object[] _get_source(Class clz)
    {
        String name = clz.getName();
	String slashname = null;
	//package . to /
	slashname = name.replace('.','/');
	//this finds a file on the filesystem from a class object..not need here
	java.net.URL url = clz.getProtectionDomain().getCodeSource().getLocation();     
	
       	if(url.toString().endsWith(".jar"))
	    {
		try{
		    return _get_source_jar(slashname,URLDecoder.decode(url.getFile(),"UTF-8"));
		}catch(UnsupportedEncodingException esee)
		    {
			System.err.println("(mxj quickie) problem decoding jar URL. Unable to decompile.");
			return new Object[]{null,null, new Integer(0)};
		    }

	    }

		String abspath = url.getFile()+slashname+".java";	
		File f = new File(abspath);
		if(!f.exists())
	    {
			System.out.println("(mxj quickie) Decompiling "+name+" with JODE");
			try{
			    StringWriter sw = new StringWriter(2048); 
			    post("(mxj quickie) Be patient...decompiling "+slashname);
			    MXJDecompiler.getInstance().decompile(name,MaxSystem.getClassPath(),sw);
			    sw.flush();
			    return new Object[]{ f, sw.toString(),new Integer(2)};
			}catch(Exception e)
		    {
				System.err.println("(mxj quickie) Unable to decompile "+name);
				return new Object[]{null,null, new Integer(0)};
		    }
	    }
		else
	    {
			StringBuffer buf = new StringBuffer(2048);
			String s = null;
			try{
		    
			    BufferedReader br = new BufferedReader(new FileReader(f));
			    while((s = br.readLine()) != null)
				    buf.append(s+"\n");
			    return new Object[]{f,buf.toString(), new Integer(1)};
	
			} catch(FileNotFoundException fne)
		    {
				System.err.println("(mxj quickie) File "+f.getName()+" not found!");
				return new Object[]{null,null, new Integer(0)};
		    }
			catch(IOException ioe){
		   		System.err.println("(mxj quickie) Problem reading "+f.getName());
		   		ioe.printStackTrace();
		   		return new Object[]{null,null, new Integer(0)};
			} 

	    }
    }

    private Object[] _get_source_jar(String slashname,String jarfile)
    {
	try
	    {
		JarFile jar = new JarFile(new File(jarfile));
		for (Enumeration entries = jar.entries(); entries.hasMoreElements(); )
		    {
			JarEntry entry = (JarEntry) entries.nextElement();

			if(entry.getName().equals(slashname+".java"))//we found source file in the jar
			    { 
				StringBuffer sb = new StringBuffer(1024);
				byte[] buffer = new byte[1024];
				int    bytesRead;
				InputStream entryStream = jar.getInputStream(entry);
				while ((bytesRead = entryStream.read(buffer)) != -1) 
				    sb.append(new String(buffer,0,bytesRead));
			        String dummyfilename = new String("!READONLY!:"+jar.getName()+"!/"+entry.getName());
				File f = new File(dummyfilename);	
				return new Object[]{f,sb.toString(), new Integer(3)};
			    }
		    }
		
		//didn't find source in jar if we got to here...decompile
		
		StringWriter sw = new StringWriter(2048);
		try{
		    post("(mxj quickie) Be patient...decompiling "+slashname+" from "+jar.getName());
		    MXJDecompiler.getInstance().decompile(slashname.replaceAll("/","."),MaxSystem.getClassPath(),sw);
		    sw.flush();
		    String s = sw.toString();
		    String dummyfilename = new String("!READONLY!:"+jar.getName()+"!/"+slashname+".java");
		    return new Object[]{new File(dummyfilename),s, new Integer(4)};
		}catch(Exception e)
		    {
		    System.err.println("(mxj quickie) Cannot decompile  "+slashname);
			return new Object[]{null,null, new Integer(0)};
		    }
	    }catch(Exception e)
		{
		    System.err.println("(mxj quickie) Error getting source from jarfile "+jarfile);
	    	return new Object[]{null,null, new Integer(0)};
		}
	
    }

    public static final String TEMPLATE = 
	"import com.cycling74.max.*;\n"+
	"\n"+
	"\n"+
	"public class _PROTO_ extends MaxObject\n"+
	"{\n"+
	"\tpublic _PROTO_(Atom[] args)\n"+
	"\t{\n"+
	"\t\tdeclareInlets(new int[]{DataTypes.ALL});\n"+
	"\t\tdeclareOutlets(new int[]{DataTypes.ALL});\n"+
	"\t}\n"+
	"\n"+
	"\tpublic void bang()\n"+
	"\t{\n"+
	"\t}\n"+
	"\n"+
	"\tpublic void inlet(int i)\n"+
	"\t{\n"+
	"\t}\n"+
	"\n"+
	"\tpublic void inlet(float f)\n"+
	"\t{\n"+
	"\t}\n"+
	"\n"+    
	"\tpublic void list(Atom[] list)\n"+
	"\t{\n"+
	"\t}\n"+
	"\n"+
	"}\n";
}





















