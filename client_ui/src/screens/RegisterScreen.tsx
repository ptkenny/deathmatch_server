import React, { useEffect, useState } from 'react';

const RegisterScreen: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError('Passwords do not match');
		}
		mp.trigger('registerAttempt', email, password);
	};

	return (
		<div className='min-h-screen bg-gray-800 flex items-center justify-center'>
			<div className='w-full max-w-md'>
				<form onSubmit={handleSubmit} className='bg-gray-700 shadow-lg rounded px-12 pt-6 pb-8 mb-4'>
					<div className='text-white text-2xl mb-6 text-center font-semibold'>Register</div>
					<div className='mb-4'>
						<label className='block text-gray-200 text-sm font-semibold mb-2' htmlFor='email'>
							Email
						</label>
						<input className='w-full px-3 py-2 text-gray-700 bg-gray-200 rounded' id='email' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div className='mb-4'>
						<label className='block text-gray-200 text-sm font-semibold mb-2' htmlFor='password'>
							Password
						</label>
						<input className='w-full px-3 py-2 text-gray-700 bg-gray-200 rounded' id='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<div className='mb-6'>
						<label className='block text-gray-200 text-sm font-semibold mb-2' htmlFor='confirm-password'>
							Confirm Password
						</label>
						<input
							className='w-full px-3 py-2 text-gray-700 bg-gray-200 rounded'
							id='confirm-password'
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<div className='flex items-center justify-between'>
						<button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded' type='submit'>
							Register
						</button>
					</div>
				</form>
				{error && <div className='text-red-500 text-center border-white'>{error}</div>}
			</div>
		</div>
	);
};

export default RegisterScreen;
