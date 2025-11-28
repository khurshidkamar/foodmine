import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  mapRef = viewChild.required<ElementRef>('map');
  map!: Map;
  currentMarker!: Marker;
  order = input.required<Order>();
  constructor(private locationService: LocationService) { }
  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapRef().nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    })
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order().addressLatLng = latlng;
    // console.log(this.order().addressLatLng);
  }
}
