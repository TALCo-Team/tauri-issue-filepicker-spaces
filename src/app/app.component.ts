import { ChangeDetectorRef, Component } from "@angular/core";
import { TauriService } from "src/services/tauri.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  programOutput = "";
  correctOutput = "";
  errorPath = "./../test folder/program"
  correctPath = "./../test_folder/program"
  tauriService = new TauriService();

  constructor(private ref: ChangeDetectorRef){}

  runProgramError(event: SubmitEvent): void {
    event.preventDefault();

    this.programOutput = "";

    console.log("Starting program...");

    this.tauriService?.execProgram(this.errorPath, (output)=>{
      this.programOutput += output;
      this.ref.detectChanges();
    }, (error)=>{
      this.programOutput += error;
      this.ref.detectChanges();
    }, (error)=>{
      this.programOutput += error;
      this.ref.detectChanges();
    })
  }

  runProgramCorrect(event: SubmitEvent): void {
    event.preventDefault();

    this.correctOutput = "";

    console.log("Starting program...");

    this.tauriService?.execProgram(this.correctPath, (output)=>{
      this.correctOutput += output;
      this.ref.detectChanges();
    }, (error)=>{
      this.correctOutput += error;
      this.ref.detectChanges();
    }, (error)=>{
      this.correctOutput += error;
      this.ref.detectChanges();
    })
  }
}
