import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterModule } from "@angular/router";

@Component({
  selector: 'app-error',
  imports: [RouterModule],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {}
