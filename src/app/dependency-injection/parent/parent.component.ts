import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ServiceService} from '../../modules/services/service.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  constructor(public ServiceService: ServiceService,private detect:ChangeDetectorRef) { }

  ngOnInit() {
    this.detect.detectChanges()
   console.log("login ",this.ServiceService.login())
  }
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;

  announce() {
    const mission = this.missions[this.nextMission++];
    this.ServiceService.announceMission(mission);
    this.history.push(`Mission ${mission} announced`);
    if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }


}
