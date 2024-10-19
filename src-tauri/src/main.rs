// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn test_command() {
  println!("test");
}

// this function can return data
#[tauri::command]
fn return_command() -> String {
  "Hello from Rust!".into()
}

// this function has error handling
#[tauri::command]
fn error_handling_command() -> Result<String, String> {
  // If something fails
  Err("This failed!".into())
  // If it worked
  Ok("This worked!".into())
}

#[tauri::command]
fn greet(name: &str) -> String {
  println!("inside rust code")
  format!("hello {}!", name)
}

fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}