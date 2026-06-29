import React, { useState } from 'react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Basic email format validation (can be enhanced)
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    // --- Placeholder for actual authentication logic ---
    console.log('Attempting to sign in with:', { email, password });
    // In a real application, you would make an API call here.
    // On success: redirect user to dashboard (e.g., history.push('/dashboard'))
    // On failure: setError('Invalid credentials. Please try again.')

    // Simulate success for now
    alert('Sign-in attempt successful! (Redirection logic would go here)');
    // Example: history.push('/dashboard');
  };

  return (
    <div className="signin-page container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm">
            <h2 className="card-title text-center mb-4">Sign In</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
