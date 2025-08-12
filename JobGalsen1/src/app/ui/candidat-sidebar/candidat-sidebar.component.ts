import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavigationItem {
  name: string;
  path: string;
  icon: string;
  current: boolean;
}

@Component({
  selector: 'app-candidat-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidat-sidebar.component.html',
  styleUrls: ['./candidat-sidebar.component.css']
})
export class CandidatSidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();

  navigation: NavigationItem[] = [
    { name: "Tableau de bord", path: '/candidat-dashbord', icon: "bi-house", current: false },
    { name: "Rechercher des emplois", path: "/jobs", icon: "bi-search", current: false },
    { name: "Mes candidatures", path: "/applications", icon: "bi-file-text", current: false },
    { name: "Offres sauvegardées", path: "/saved-jobs", icon: "bi-bookmark-check", current: false },
    { name: "Mon profil", path: "/profile", icon: "bi-person", current: false },
    { name: "Statistiques", path: "/stats", icon: "bi-graph-up", current: false },
    { name: "Messages", path: "/messages", icon: "bi-chat-square", current: false },
    { name: "Entretiens", path: "/interviews", icon: "bi-calendar", current: false },
  ];

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.updateActiveStates();
    
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveStates();
      });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeSidebar();
    }
  }

  updateActiveStates(): void {
    const currentPath = this.router.url.split('?')[0];
    this.navigation.forEach(item => {
      item.current = currentPath === item.path || 
                    (item.path !== '/' && currentPath.startsWith(item.path));
    });
  }

  trackByFn(index: number, item: NavigationItem): string {
    return item.path;
  }

  closeSidebar(): void {
    this.onClose.emit();
  }
}