import React from 'react';
import {observer} from 'mobx-react';
import store from '../store/index.js';

@observer
class Content extends React.Component{
    render(){
        if(store.authenticated){
            return  <div>
                        <h1>Welcome, {store.userArray.first_name}!</h1>
                        <p>Here's your Uber ride history:</p>
                        <div>
                            <RideHistory/>
                            <MapView />
                        </div>
                    </div>;
        } else {
            return  <div>
                        <h1>Please login to see your history.</h1>
                    </div>;
        }
    }
}

export default Content;

@observer
class RideHistory extends React.Component{
    getHistory(){
        if(!store.historyArray.history){
            return <p>Retrieving History... Don't have a riding history? Use the example data button instead!</p>;
        } else {
            var list = store.historyArray.history.map((entry, i) => {
                return <div key={i}>
                    <h3>{entry.start_city.display_name}</h3>
                    <p>{entry.status}</p>
                    <p>{entry.distance} mile(s)</p>
                    <p>Latitude: {entry.start_city.latitude}</p>
                    <p>Longitude: {entry.start_city.longitude}</p>
                </div>;
            });
            return list;
        }
    }

    render(){
        return  <div>
                    <div>
                        <span>Refresh</span>
                        <span>Use Example Data</span>
                    </div>
                    {this.getHistory()}
                </div>
    }
}

class MapView extends React.Component{
    render(){
        return  <div>
                    Map View Here
                </div>
    }
}