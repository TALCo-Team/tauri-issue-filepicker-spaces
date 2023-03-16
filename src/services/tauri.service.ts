import { Injectable, OnInit } from "@angular/core";
import { Child, Command, open as ShellOpen } from '@tauri-apps/api/shell';
import { type } from '@tauri-apps/api/os';
import { open as DialogOpen } from '@tauri-apps/api/dialog';

@Injectable({providedIn: 'root'})
export class TauriService {
    public child: Child | undefined;
  
    constructor(){}
  
    async execProgram(programPath:string, 
      onProcessStdOut: (output:string)=>void,
      onProcessStdErr: (error:string)=>void,
      onProcessError: (error:string)=>void){
        
      let command = new Command("sh", ["-c", programPath]);

      command.stderr.on("data", (line:any) => {
        console.log("Program stderr: " + line);

        onProcessStdErr(line);
      });
  
      command.stdout.on("data", (line: any) => {
        console.log("Program output: " + line);

        onProcessStdOut(line);
      });
  
      command.on("close", ()=>{
        console.log("Program has terminated");
      })
  
      command.on("error", (error:any)=>{
        console.log("Error occurred during execution: " + error);

        onProcessError(error);
      })
  
      this.child = await command.spawn();
    }
}