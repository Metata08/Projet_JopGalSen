import { Component, Input } from '@angular/core';

export interface StatsCard {
  title: string;
  value: string;
  icon: string; // Nom de l'icône Bootstrap
  trend: string;
  trendUp: boolean;
}

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @Input() stats!: StatsCard;

  getTrendClass(): string {
    return this.stats.trendUp ? 'text-success' : 'text-danger';
  }

  getTrendIcon(): string {
    return this.stats.trendUp ? 'bi-arrow-up-right' : 'bi-arrow-down-right';
  }
}