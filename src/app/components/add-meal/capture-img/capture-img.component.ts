import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-capture-img',
  templateUrl: './capture-img.component.html',
  styleUrls: ['./capture-img.component.scss']
})
export class CaptureImgComponent implements OnInit {
  @Output() imgEmitter = new EventEmitter<any>();
  @Input() showWebcam = true;
  
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  // public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  // };
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor( ) {}

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.imgEmitter.emit(webcamImage)
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
