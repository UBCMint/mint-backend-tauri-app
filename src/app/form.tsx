'use client'

import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function Form() {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (name) {
            invoke<String>("greet", { name })
                .then(result => console.log(result))
                .catch(console.error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-gray-800">
            <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-700"
                    />
                </div>
                <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
