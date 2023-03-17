import React, { useState } from 'react';
import io from 'socket.io-client';

function InputForm() {
	const socket = io.connect(import.meta.env.VITE_APP_ENDPOINT);
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit('message', { message });
		setMessage('');
	};

	const handleStatus = (e) => {
		const selectedStatus = e.target.value;
		socket.emit('change_status', selectedStatus);
	};

	return (
		<form onSubmit={handleSubmit}>
			<select onChange={handleStatus}>
				<option value='Онлайн'>Онлайн</option>
				<option value='Занят'>Занят</option>
			</select>
			<input
				type='text'
				placeholder='Введите сообщение...'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button>Отправить сообщение</button>
		</form>
	);
}

export default InputForm;
