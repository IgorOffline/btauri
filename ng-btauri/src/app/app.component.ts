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
  greetInputEl: HTMLInputElement | null = null;
  greetMsgEl: HTMLParagraphElement | null = null;
  title = 'ng-btauri';

  ngOnInit(): void {
    this.greetInputEl = document.querySelector("#greet-input");
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
      if (this.greetInputEl) {
        this.greetMsgEl.textContent = await invoke('greet', { name: this.greetInputEl.value });
      } else {
        console.log('greetInputEl == null');
      }
    } else {
      console.log('greetMsgEl == null');
    }
  }
}
