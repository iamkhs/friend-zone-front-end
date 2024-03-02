import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  
  searchQuery: string = '';
    searchType: string = 'posts'; // Default to 'posts'

    constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router) { }

    search(): void {

        // Navigate to the search route with the search query and search type as query parameters
        this.router.navigate(['/search'], { queryParams: { query: this.searchQuery, type: this.searchType }});
    }
}