import { ElementRef } from '@angular/core';

export interface Steps {
    step: number;
    title: string;
    text: string;
    position: string;
    elements: ElementRef[];
}
