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

package net.mail;
import com.cycling74.max.*;
import java.util.Properties;
import java.io.*;
import javax.mail.*;
import javax.mail.internet.*;

public class recv extends MaxObject {

    private static final String POP3_PROTOCOL = "pop3";

    private String username = null;
    private String password = null;
    private String folder = "inbox";
    private String protocol = POP3_PROTOCOL;
    private String mailserver = "localhost";

    private static final int NORMAL_OUTLET = 0;
    private static final int EXCEPTION_OUTLET = 1;

    public recv(Atom args[]) {
    		declareIO(1,2);
    		declareAttribute("username");
    		declareAttribute("password");
    		declareAttribute("folder");
    		declareAttribute("protocol");
    		declareAttribute("mailserver");
    }

     // Get a stream to the file to which we will write.
    private OutputStream getFileSaveStream(String name) throws IOException {
    		return new BufferedOutputStream(new FileOutputStream(name));
    }

    //save a message number to a text file.  
    //messages are numbered starting at 1.
    public void saveMessage(int msgNum, String filename) {
		Properties props = new Properties();
		props.put("mail.host", mailserver);
		try {
		    Session session = Session.getInstance(props, null);
		    Store store = session.getStore(protocol);
		    store.connect(mailserver, username, password);
		    Folder fold = store.getFolder(folder);
		    fold.open(Folder.READ_ONLY);
		    int messageCount = fold.getMessageCount();
		    if (msgNum <= messageCount)
		    {
		    	MimeMessage msg = (MimeMessage)fold.getMessage(msgNum);
		    	OutputStream out = getFileSaveStream(filename);
		    	msg.writeTo(out);
	
		    	outlet(NORMAL_OUTLET, 1);
		    	out.close();
		    }
		    store.close();
		} catch (IOException ie) {
		    showException(null, ie);
		    outlet(EXCEPTION_OUTLET, ie.toString());
		} catch (MessagingException me) {
		    showException(null, me);
		    outlet(EXCEPTION_OUTLET, me.toString());
		} catch (Exception e) {
			showException(null, e);
			outlet(EXCEPTION_OUTLET, e.toString());
		}
    }
    
    public void messageCount() {
    	Properties props = new Properties();
		props.put("mail.host", mailserver);
		try {
		    Session session = Session.getInstance(props, null);
		    Store store = session.getStore(protocol);
		    store.connect(mailserver, username, password);
		    Folder fold = store.getFolder(folder);
		    fold.open(Folder.READ_ONLY);
		    int messageCount = fold.getMessageCount();
		    outlet(NORMAL_OUTLET, messageCount);
		    store.close();
		} catch (MessagingException me) {
		    showException(null, me);
		    outlet(EXCEPTION_OUTLET, me.toString());
		} catch (Exception e) {
			showException(null, e);
			outlet(EXCEPTION_OUTLET, e.toString());
		}
    }


    //save an attachment.  
    //msgNum is numbered starting at 1,
    //attachmentNum is numbered starting at 0.
    public void saveAttachment(int msgNum, int attachmentNum, String filename) {
    	post("new");
		Properties props = new Properties();
		props.put("mail.host", mailserver);
		try {
		    Session session = Session.getInstance(props, null);
		    Store store = session.getStore(protocol);
		    store.connect(mailserver, username, password);
		    Folder fold = store.getFolder(folder);
		    fold.open(Folder.READ_ONLY);
		    MimeMessage msg = (MimeMessage)fold.getMessage(msgNum);
		    String messageType = msg.getContentType();
		    
		    if (msg.isMimeType("multipart/mixed")) {
				MimeMultipart mp = (MimeMultipart)msg.getContent();
				BodyPart att = mp.getBodyPart(attachmentNum-1);
				if (att.isMimeType("image/jpeg"))
				{
					saveJpeg(att,filename);
				}
				else 
				{
					OutputStream out = getFileSaveStream(filename);
					att.writeTo(out);
					out.close();
					outlet(0, 1);
				}
		    }
		    else {
		    	outlet(0, 0);
		    }	
		    store.close();
		} catch (IOException ie) {
		    showException(null, ie);
		    outlet(EXCEPTION_OUTLET, ie.toString());
		} catch (MessagingException me) {
		    showException(null, me);
		    outlet(EXCEPTION_OUTLET, me.toString());
		}
    }
    
    private void saveJpeg(BodyPart bp, String filename)
    {
    	try 
		{
	        Object o = bp.getContent(); 
	        InputStream x = (InputStream)o;
	        // Construct the required byte array
	        int i = 0;
	        byte[] bArray = new byte[x.available()];
	             
	        while ((i = (int)((InputStream)x).available()) > 0)
	        {
	            int result = (int)(((InputStream)x).read(bArray));
	            if (result == -1) break;
	        }
	        FileOutputStream f2 = new FileOutputStream(filename);
	        f2.write(bArray);
	        f2.close();
		}
    	catch (IOException ie) {
		    showException(null, ie);
		    outlet(EXCEPTION_OUTLET, ie.toString());
		} catch (MessagingException me) {
		    showException(null, me);
		    outlet(EXCEPTION_OUTLET, me.toString());
		}

    }
    
 /*   private void savePic(InputStream in, String s) throws IOException {
        File pic = new File(s);
        //NOTE: its better to use a buffer around the inputstream
        try {
            BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(pic));
            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            in.close();
            out.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }*/
}
