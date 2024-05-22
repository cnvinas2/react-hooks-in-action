import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import '../App.css'
import * as React from 'react';

import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa'

import BookablesPage from './Bookables/BookablesPage'
import BookingsPage from './Bookings/BookingsPage'
import UsersPage from './Users/UsersPage'
import UserPicker from './Users/UserPicker'

import { UserProvider } from './Users/UserContext'

export default function App() {
  function showalert() {
    alert('agregado linter y prettier')
  }
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li>
                  <Link onClick={showalert} className="btn btn-header">
                    <FaCalendarAlt />
                    <span>show alert</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookings" className="btn btn-header">
                    <FaCalendarAlt />
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/bookables" className="btn btn-header">
                    <FaDoorOpen />
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="btn btn-header">
                    <FaUsers />
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <UserPicker />
          </header>

          <Routes>
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookables" element={<BookablesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}