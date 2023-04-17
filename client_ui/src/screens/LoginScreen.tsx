import React, { useState } from 'react';

const LoginScreen: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mp.trigger('loginAttempt', email, password);
	};

	return (
		<div className='min-h-screen bg-gray-800 flex items-center justify-center'>
			<div className='w-full max-w-md'>
				<form onSubmit={handleSubmit} className='bg-gray-700 shadow-lg rounded px-12 pt-6 pb-8 mb-4'>
					<div className='text-white text-2xl mb-6 text-center font-semibold'>Login</div>
					<div className='mb-4'>
						<label className='block text-gray-200 text-sm font-semibold mb-2' htmlFor='email'>
							Email
						</label>
						<input className='w-full px-3 py-2 text-gray-700 bg-gray-200 rounded' id='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div className='mb-6'>
						<label className='block text-gray-200 text-sm font-semibold mb-2' htmlFor='password'>
							Password
						</label>
						<input className='w-full px-3 py-2 text-gray-700 bg-gray-200 rounded' id='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<div className='flex items-center justify-between'>
						<button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded' type='submit'>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginScreen;
