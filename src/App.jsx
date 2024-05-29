import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

const TelegramForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [comment, setComment] = useState('');
    const [age, setAge] = useState('');
    const [media, setMedia] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('chat_id', '<YOUR_CHAT_ID>');
        formData.append('text', `Name: ${name}\nNumber: ${number}\nComment: ${comment}\nAge: ${age}`);
        if (media) {
            formData.append('media', media);
        }

        try {
            await axios.post(`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Open Form</button>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <form onSubmit={handleSubmit} className="form">
                            <label>
                                Name:
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </label>
                            <label>
                                Number:
                                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
                            </label>
                            <label>
                                Comment:
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            </label>
                            <label>
                                Age:
                                <select value={age} onChange={(e) => setAge(e.target.value)} required>
                                    <option value="" disabled>Select Age</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                            </label>
                            <label>
                                Media:
                                <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TelegramForm;
