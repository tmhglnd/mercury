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
import javax.mail.*;
import javax.mail.internet.*;

public class send extends MaxObject {

    private String to = null;
    private String cc = null;
    private String bcc = null;
    private String from = null;
    private String subject = null;
    private String text = null;
    private String mailserver = "localhost";

    private static final int NORMAL_OUTLET = 0;
    private static final int EXCEPTION_OUTLET = 1;

    public send(Atom args[]) {
    	declareIO(1,2);
    	declareAttribute("mailserver");
    	declareAttribute("subject");
    	declareAttribute("to");
    	declareAttribute("from");
    	declareAttribute("cc");
    	declareAttribute("bcc");
    	declareAttribute("text");
    }

    public void clear(String message, Atom args[]) {
    	mailserver = "localhost";
    	to = cc = bcc = from = text = null;
    }

    public void deliver() {
		Properties props = new Properties();
		props.put("mail.host", mailserver);
	
		try {
		    Session session = Session.getInstance(props, null);
		    MimeMessage msg = new MimeMessage(session);
		    
		    if (from != null) {
			msg.setFrom(new InternetAddress(from));
		    } else {
			msg.setFrom();
		    }
		    if (to != null) {
			msg.addRecipients(Message.RecipientType.TO,
					  InternetAddress.parse(to));
		    }
		    if (cc != null) {
			msg.addRecipients(Message.RecipientType.CC,
					  InternetAddress.parse(cc));
		    }
		    if (bcc != null) {
			msg.addRecipients(Message.RecipientType.BCC,
					  InternetAddress.parse(bcc));
		    }
		    if (subject != null) {
			msg.setSubject(subject);
		    }
		    if (text != null) {
			msg.setText(text);
		    }
		    
		    msg.setHeader("X-Mailer", "net.mail.send under mxj - Java in Max, "+
				  "from Cycling '74");
	
		    Transport.send(msg);

		    outlet(NORMAL_OUTLET, "sent");
	
		} catch (AddressException ae) {
		    showException(null, ae);
		    outlet(EXCEPTION_OUTLET, "AddressException");
		} catch (MessagingException me) {
		    showException(null, me);
		    outlet(EXCEPTION_OUTLET, "MessagingException");
		}
    }		   
}
