import React from 'react';
import {observer} from 'mobx-react';
import store from '../store/index.js';

@observer
class Header extends React.Component{
    componentDidMount() {
        //global scope variable defined in index.php. Adding to store.
        if(code){
            store.code = code;
            store.getUberAccess();
        }
    }

    render(){
        var logtext;
        var uberLink = "https://login.uber.com/oauth/v2/authorize?client_id=5WDLyRTEdGGpWtCSMRCioc7nawWC6YbO&response_type=code&redirect_uri=http://localhost/uberhist/";

        if(!store.authenticated){
            if(store.loading){
                logtext = <span>Loading...</span>
            } else {
                logtext = <a href={uberLink}>Login</a>;
            }
        } else {
            logtext = <span className="logout" onClick={() => store.authenticated = false}>Logout</span>;
        }

        return <div className="header">
                    <div className="logo">
                        Uber History
                    </div>
                    
                    <div className="user">
                        {logtext}
                    </div>
               </div>;
    }
}

export default Header;