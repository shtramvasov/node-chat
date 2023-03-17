import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InputForm from './components/InputForm';
import Message from './components/Message';

function App() {
	const socket = io.connect(import.meta.env.VITE_APP_ENDPOINT);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('receive', (data) => {
			setMessages((prevMessages) => [...prevMessages, data.message]);
		});
	}, []);

	return (
		<main className='wrapper'>
			<section className='chat'>
				{messages.map((item, index) => (
					<Message key={index} data={item} />
				))}
			</section>
			<InputForm />
		</main>
	);
}

export default App;
