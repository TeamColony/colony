import React, {Component} from 'react';
import styles from '../styles/map.module.css';
import L from 'leaflet'

var Map: any;
var TileLayer: any;
var Marker: any;
var Icon: any;
class LeafletMap extends Component  {

  constructor(props: any) {
    super(props)
    this.state = {
      icon: null
    }
  }

  componentDidMount(){
    Map = require('react-leaflet').Map
    TileLayer = require('react-leaflet').TileLayer
    Marker = require('react-leaflet').Marker
    this.setState({icon : L.icon({
      iconUrl: 'http://localhost:3000/mapEx.svg',
      iconSize: [30, 30]
    })})
    this.forceUpdate()
  }

  render () {
    return (
      (Map)
      ? (
        <Map className={styles.map}
         center={[51.585340,-0.063780]} zoom={14} scrollWheelZoom={false}>
             <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='‌‌ ‌‌ ‌'
            />
            <Marker
              position={[51.585340,-0.063780]}
              icon={this.state.icon}
            >
              <div>child</div>
            </Marker>
        </Map>
      )
      : (null)
      
    )
  }
}

export default LeafletMap;