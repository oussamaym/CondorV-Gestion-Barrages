import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarrageService } from '../services/barrage.service';
import { Barrage, LocalisationBarr } from '../models/barrage';

@Component({
  selector: 'app-list-barrage',
  templateUrl: './list-barrage.component.html',
  styleUrls: ['./list-barrage.component.css']
})
export class ListBarrageComponent implements OnInit {
  barrages: Barrage[] = [];

  constructor(private barrageService: BarrageService, private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    const agenceId = +this.route.snapshot.paramMap.get('agenceId')!;
    this.loadBarrages(agenceId);
  }

  loadBarrages(agenceId: number): void {
    this.barrageService.getAllBarrages().subscribe(
      barrages => {
        // Filter barrages based on the agenceId
        this.barrages = barrages.filter(barrage => barrage.agenceId === agenceId);
      },
      error => {
        console.error('Error fetching Barrages:', error);
      }
    );
  }
  
}


  // You can add other methods for handling user interactions or navigation here

