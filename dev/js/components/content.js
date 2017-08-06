import React from 'react';
import {observer} from 'mobx-react';
import store from '../store/index.js';
import ReactDOM from 'react-dom';

@observer
class Content extends React.Component{
    render(){
        if(store.authenticated){
            return  <div className="content">
                        <h1>Welcome, {store.userArray.first_name}!</h1>
                        <p className="borderbottom">Here's your Uber ride history (Up to 50):</p>
                        <div className="flex50">
                            <RideHistory/>
                            <MapView />
                        </div>
                    </div>;
        } else {
            if(store.loading){
                return  <div className="content">
                            <h1>Please wait...</h1>
                        </div>;  
            } else {
                return  <div className="content">
                            <h1>Please login to see your history.</h1>
                        </div>;
            }
        }
    }
}

export default Content;

@observer
class RideHistory extends React.Component{
    getHistory(){
        if(!store.historyArray.length){
            return <p>Don't have a riding history? Use the example data button to get a mock riding history!</p>;
        } else {
            var list = store.historyArray.map((entry, i) => {
                return <div className="entry" key={i}>
                    <h3>{entry.display_name}</h3>
                    <p>{entry.distance} mile(s)</p>
                    <p>Latitude: {entry.latitude}</p>
                    <p>Longitude: {entry.longitude}</p>
                </div>;
            });
            return list;
        }
    }

    refreshButton(){
        store.useDefault = false;
        store.getHistory();
    }

    exampleButton(){
        store.useDefault = true;
        store.getHistory();
    }

    render(){
        return  <div>
                    <div className="buttons">
                        <span onClick={() => this.refreshButton()}>Refresh</span>
                        <span onClick={() => this.exampleButton()}>Use Example Data</span>
                    </div>
                    {this.getHistory()}
                </div>
    }
}

@observer
class MapView extends React.Component{
    getMap(){
        var USA = {lat: 41.3787523, lng: -96.1985117};
        var map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map), {
            zoom: 3,
            center: USA
        });

        store.historyArray.map((entry) => {
            new google.maps.Marker({
                position: {
                    lat: parseFloat(entry.latitude), 
                    lng: parseFloat(entry.longitude)
                },
                map: map
            });
        });
    }

    componentDidUpdate(){
        this.getMap();
    }

    render(){
        if(!store.historyArray.length){
            return <p>Loading...</p>;
        } else {
            return <div id="map" ref="map">
                        Map Here.
                   </div>;
        }
    }
}