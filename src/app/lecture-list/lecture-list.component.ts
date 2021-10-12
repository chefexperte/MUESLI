import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface LearningGroup {
  zeit: string
  raum: string
  auslastung: number
  tutor: string
  kommentar: string
}

export interface Lecture {
  id: number
  semester: string
  name: string
  dozent: string
  assistent: string
}

@Component({
  selector: 'app-lecture-list',
  templateUrl: './lecture-list.component.html',
  styleUrls: ['./lecture-list.component.sass']
})
export class LectureListComponent implements OnInit {

  learningGroups: LearningGroup[][] = [];
  panelOpenState: boolean[] = [];

  lectures: Lecture[] = [
    { id: 0, semester: "2021 WS", name: "Vorlesung 1", dozent: "Aaron Henning", assistent: "Niemand" },
    { id: 1, semester: "2021 WS", name: "Vorlesung 2", dozent: "Aaron Hering", assistent: "Niemand" }
  ];

  sortedData: LearningGroup[][];

  constructor() {
    this.learningGroups[0] = [
      { zeit: 'Mo. 9:00', raum: "INF 205 / HS A", auslastung: 6, kommentar: "Bitte kommen Sie pünktlich", tutor: "Aaron Henning"},
      { zeit: 'Mo. 11:00', raum: "INF 205 / HS B", auslastung: 3, kommentar: "", tutor: "Karl Ruprecht" }
    ];
    this.learningGroups[1] = [
      { zeit: 'Mi. 18:00', raum: "INF 205 / HS C", auslastung: 7, kommentar: "Bitte kommen Sie wirklich pünktlich", tutor: "Aaron Henning"}
    ];
    this.sortedData = this.learningGroups.slice();
  }

  hasTutorials(id: number) {
    if (this.learningGroups[id] == null){
      return false;
    }
    if (this.learningGroups[id].length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  sortData(sort: Sort, id: number) {
    const data = this.learningGroups[id].slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData[id] = data;
      return;
    }

    this.sortedData[id] = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'zeit': return compare(a.zeit, b.zeit, isAsc);
        case 'raum': return compare(a.raum, b.raum, isAsc);
        case 'auslastung': return compare(a.auslastung, b.auslastung, isAsc);
        case 'kommentar': return compare(a.kommentar, b.kommentar, isAsc);
        case 'tutor': return compare(a.tutor, b.tutor, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit(): void {
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}