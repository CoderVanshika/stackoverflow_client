import React, { Component } from "react";
//import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

//Kommunicate.init("2d98aeb2ff51946247fad96102b3c3c22")

class Chat extends Component {
    constructor(props){
        super(props);
    } 
  
    componentDidMount() {
        (function(d, m){
            var kommunicateSettings = 
                {"appId":"2d98aeb2ff51946247fad96102b3c3c22","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    
    
        }
    render() {
        return(
            <div>
              <h6></h6>
            </div>
        )
    }
}
    
export default Chat





