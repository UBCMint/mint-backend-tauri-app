'use client'

import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { User } from './types'; // Adjust the path as necessary

export default function Form() {
    const [response, setResponse] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    //Example 
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const response = await fetch('/users');  //MOCK ENDPOINT - pretend this is our backend

            if (response.ok){
                console.log("REQ success");
                const data = await response.json();
                setResponse(data.message);
                console.log('Fetched users:', data);
            } else {
                throw new Error('Network Response Error');
            }

        } catch (error) {
            console.log(error);
        } finally {
            // finish off
        }

    };

    return (
        <div className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-gray-800">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
                Get Users
            </button>
          </form>
    
          { (
            <ul className="w-full text-white mt-4 space-y-2">
              {users.map(user => (
                <li key={user.id} className="border-b border-gray-600 pb-2 text-gray-200">
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}
