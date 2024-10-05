import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { invoke } from '@tauri-apps/api/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  greetInputFirstNameEl: HTMLInputElement | null = null;
  greetInputLastNameEl: HTMLInputElement | null = null;
  greetMsgEl: HTMLParagraphElement | null = null;
  title = 'ng-btauri';

  ngOnInit(): void {
    this.greetInputFirstNameEl = document.querySelector("#greet-input-first-name");
    this.greetInputLastNameEl = document.querySelector("#greet-input-last-name");
    this.greetMsgEl = document.querySelector("#greet-msg");

    let greetFormEl = document.querySelector("#greet-form")
    if (greetFormEl) {
      greetFormEl.addEventListener("submit", (e) => {
        e.preventDefault();
        this.greet();
      });
    } else {
      console.log('greetFormEl == null');
    }
  }

  async greet(): Promise<void> {
    if (this.greetMsgEl) {
      if (this.greetInputFirstNameEl && this.greetInputLastNameEl) {
        this.greetMsgEl.textContent = await invoke('greet', { firstname: this.greetInputFirstNameEl.value, lastname: this.greetInputLastNameEl.value });
      } else {
        console.log('greetInputEl == null');
      }
    } else {
      console.log('greetMsgEl == null');
    }
  }
}
