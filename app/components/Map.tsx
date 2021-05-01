import React, {Component} from 'react';
import styles from '../styles/map.module.css';

var Map: any;
var TileLayer: any;

class LeafletMap extends Component  {

  componentDidMount(){
    Map = require('react-leaflet').Map
    TileLayer = require('react-leaflet').TileLayer

    this.forceUpdate()
  }

  render () {
    return (
      (Map)
      ? (
        <Map className={styles.map}
         center={[51.598, -0.080]} zoom={14} scrollWheelZoom={false}>
             <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='‌‌ ‌‌ ‌'
            />
        </Map>
      )
      : (null)
      
    )
  }
}

export default LeafletMap;