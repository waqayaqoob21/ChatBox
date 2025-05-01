import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Chat from './pages/Chat';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    setTimeout(() => {
      toast.success('Logged out successfully!');
      window.location.href = '/';
    }, 1000); // Delay to let the toast show before redirecting
  };

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          {!token && <Link to="/">Login</Link>}
          {!token && <Link to="/signup">Signup</Link>}
          {token && <Link to="/home">Home</Link>}
          {token && <Link to="/createpost">Create New Post</Link>}
          {token && <Link to="/chat">Chat</Link>}
          {token && <Link onClick={handleLogout}>Logout</Link>}
        </div>

        <Routes>
          <Route path='/' exact Component={ Login } />
          <Route path='/signup' exact Component={ SignUp } />
          <Route path='/home'  element={token ? <Home /> : <Navigate to="/" />} />
          <Route path='/createpost'  element={token ? <CreatePost /> : <Navigate to="/" />} />
          <Route path='/post/:id'  element={token ? <Post /> : <Navigate to="/" />} />
          <Route path='/chat'  element={token ? <Chat /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
          // Protect routes using separate component ProtectedRoute
          
          //<Route path='/home' element={<ProtectedRoute element={<Home />} />} />
          // <Route path='/createpost' element={<ProtectedRoute element={<CreatePost />} />} />
          // <Route path='/post/:id' element={<ProtectedRoute element={<Post />} />} />
export default App;
